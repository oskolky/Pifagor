from typing import Any, List, Optional

from fastapi import HTTPException
from sqlalchemy import delete, func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from backend.app.models.models import (
    Act,
    Comment,
    Lesson,
    Material,
    Notification,
    Report,
    Review,
    Subject,
    Test,
    TutorContract,
    TutorProfile,
    TutorSubject,
    User,
)


def tutor_profile_load_options():
    return (
        joinedload(TutorProfile.user),
        selectinload(TutorProfile.subjects).joinedload(TutorSubject.subject),
    )


async def get_tutor_profile(db: AsyncSession, tutor_id: int) -> TutorProfile:
    result = await db.execute(
        select(TutorProfile)
        .where(TutorProfile.id == tutor_id)
        .options(*tutor_profile_load_options())
    )
    profile = result.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="Tutor profile not found")
    return profile


def serialize_tutor_profile(profile: TutorProfile) -> dict[str, Any]:
    user = profile.user
    return {
        "id": profile.id,
        "bio": profile.bio,
        "education": profile.education,
        "experience_years": profile.experience_years,
        "rate_per_hour": profile.rate_per_hour,
        "is_published": profile.is_published,
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "avatar_url": user.avatar_url,
        },
        "subjects": [
            {
                "id": ts.subject.id,
                "name": ts.subject.name,
                "slug": ts.subject.slug,
                "description": ts.subject.description,
                "icon": ts.subject.icon,
                "is_active": ts.subject.is_active,
            }
            for ts in profile.subjects
            if ts.subject is not None
        ],
    }


async def set_tutor_subjects(
    db: AsyncSession,
    tutor_id: int,
    subject_ids: List[int],
) -> None:
    if not subject_ids:
        await db.execute(delete(TutorSubject).where(TutorSubject.tutor_id == tutor_id))
        return

    result = await db.execute(select(Subject.id).where(Subject.id.in_(subject_ids)))
    found = {row[0] for row in result.all()}
    missing = set(subject_ids) - found
    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown subject ids: {sorted(missing)}",
        )

    await db.execute(delete(TutorSubject).where(TutorSubject.tutor_id == tutor_id))
    for subject_id in subject_ids:
        db.add(TutorSubject(tutor_id=tutor_id, subject_id=subject_id))


async def apply_tutor_profile_updates(
    db: AsyncSession,
    profile: TutorProfile,
    *,
    bio: Optional[str] = None,
    education: Optional[str] = None,
    experience_years: Optional[int] = None,
    rate_per_hour: Optional[float] = None,
    is_published: Optional[bool] = None,
    subject_ids: Optional[List[int]] = None,
    user_first_name: Optional[str] = None,
    user_last_name: Optional[str] = None,
    user_avatar_url: Optional[str] = None,
) -> TutorProfile:
    if bio is not None:
        profile.bio = bio
    if education is not None:
        profile.education = education
    if experience_years is not None:
        profile.experience_years = experience_years
    if rate_per_hour is not None:
        profile.rate_per_hour = rate_per_hour
    if is_published is not None:
        profile.is_published = is_published

    user = profile.user
    if user_first_name is not None:
        user.first_name = user_first_name
    if user_last_name is not None:
        user.last_name = user_last_name
    if user_avatar_url is not None:
        user.avatar_url = user_avatar_url

    if subject_ids is not None:
        await set_tutor_subjects(db, profile.id, subject_ids)

    await db.commit()
    return await get_tutor_profile(db, profile.id)


async def delete_tutor_profile(db: AsyncSession, tutor_id: int) -> None:
    profile = await get_tutor_profile(db, tutor_id)

    lessons_count = await db.scalar(
        select(func.count()).select_from(Lesson).where(Lesson.tutor_id == tutor_id)
    )
    if lessons_count:
        raise HTTPException(
            status_code=400,
            detail="Нельзя удалить репетитора с историей занятий. Сначала скройте профиль с сайта.",
        )

    await db.execute(delete(TutorSubject).where(TutorSubject.tutor_id == tutor_id))
    await db.execute(delete(Report).where(Report.tutor_id == tutor_id))
    await db.execute(delete(TutorContract).where(TutorContract.tutor_id == tutor_id))
    await db.execute(delete(Act).where(Act.tutor_id == tutor_id))
    await db.execute(delete(Material).where(Material.tutor_id == tutor_id))
    await db.execute(delete(Comment).where(Comment.tutor_id == tutor_id))
    await db.execute(delete(Review).where(Review.tutor_id == tutor_id))
    await db.execute(delete(Test).where(Test.tutor_id == tutor_id))
    await db.execute(delete(Notification).where(Notification.user_id == profile.user_id))

    user_id = profile.user_id
    await db.delete(profile)
    await db.flush()

    user = await db.get(User, user_id)
    if user:
        await db.delete(user)

    await db.commit()
