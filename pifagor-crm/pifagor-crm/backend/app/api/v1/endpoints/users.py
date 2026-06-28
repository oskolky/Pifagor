from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.db.session import get_db
from backend.app.models.models import User, TutorProfile, RoleEnum
from backend.app.schemas.schemas import (
    UserOut,
    UserUpdate,
    TutorSelfProfileUpdate,
    TutorDetailOut,
    UserMeOut,
)
from backend.app.core.deps import get_current_user, require_admin
from backend.app.services.tutor_profiles import (
    get_tutor_profile,
    serialize_tutor_profile,
    tutor_profile_load_options,
)

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    # Превращаем базовые поля пользователя в словарь
    user_data = {
        "id": current_user.id,
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "role": current_user.role,
        "avatar_url": current_user.avatar_url,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at,
        # Безопасно вытаскиваем только id профилей, чтобы фронтенд не падал
        "tutor_profile": {"id": current_user.tutor_profile.id} if current_user.tutor_profile else None,
        "child_profile": {"id": current_user.child_profile.id} if current_user.child_profile else None,
        "parent_profile": {"id": current_user.parent_profile.id} if current_user.parent_profile else None,
    }

    # Валидируем через вашу схему вручную, чтобы убедиться в корректности типов
    return UserMeOut.model_validate(user_data)


@router.patch("/me", response_model=UserOut)
async def update_me(
    data: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role == RoleEnum.tutor:
        raise HTTPException(
            status_code=403,
            detail="Репетитор не может редактировать личные данные — обратитесь к администратору",
        )
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(current_user, field, value)
    await db.commit()
    await db.refresh(current_user)
    return current_user


@router.get("/", response_model=List[UserOut])
async def list_users(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
):
    result = await db.execute(select(User))
    return result.scalars().all()


# ─── Tutor profiles (public list for website) ─────────────────────────────────

@router.get("/tutors/public", response_model=list[dict])
async def list_published_tutors(db: AsyncSession = Depends(get_db)):
    """Published tutor profiles for the public website."""
    result = await db.execute(
        select(TutorProfile)
        .where(TutorProfile.is_published == True)
        .options(*tutor_profile_load_options())
    )
    profiles = result.scalars().unique().all()
    return [serialize_tutor_profile(profile) for profile in profiles]


@router.get("/tutors/me", response_model=TutorDetailOut)
async def get_my_tutor_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != RoleEnum.tutor:
        raise HTTPException(status_code=403, detail="Only tutors can access tutor profile")
    if not current_user.tutor_profile:
        raise HTTPException(status_code=404, detail="Tutor profile not found")
    profile = await get_tutor_profile(db, current_user.tutor_profile.id)
    return serialize_tutor_profile(profile)


@router.patch("/tutors/me", response_model=TutorDetailOut)
async def update_tutor_profile(
    data: TutorSelfProfileUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    raise HTTPException(
        status_code=403,
        detail="Репетитор не может редактировать профиль — обратитесь к администратору",
    )


@router.get("/students/list", response_model=list[dict])
async def list_students_for_tutor(
        db: AsyncSession = Depends(get_db)
):
    """
    Возвращает список всех учеников школы для Репетиторов и Админов.
    """
    try:
        # 1. Делаем чистый запрос к базе через SQLAlchemy
        query = select(User).where(User.role == "child")
        result = await db.execute(query)
        students = result.scalars().all()

        # 2. Формируем безопасный список для фронтенда
        output = []
        for s in students:
            output.append({
                "id": s.id,
                "first_name": s.first_name,
                "last_name": s.last_name,
                "email": s.email,
                # Если у юзера еще нет child_profile, отдаем его id, чтобы фронт не упал
                "child_profile": {"id": s.id}
            })

        return output
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка базы данных: {str(e)}"
        )


@router.get("/{user_id}", response_model=UserOut)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != RoleEnum.admin and current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user