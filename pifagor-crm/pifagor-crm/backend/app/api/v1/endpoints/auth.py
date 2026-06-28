from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.db.session import get_db
from backend.app.models.models import User, RoleEnum, TutorProfile, ChildProfile, ParentProfile, InviteCode
from backend.app.schemas.schemas import Token, LoginRequest, UserCreate, UserOut, TokenRefresh, InviteCodeValidateOut
from backend.app.core.security import (
    verify_password, get_password_hash,
    create_access_token, create_refresh_token, decode_token
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account disabled")

    access = create_access_token({"sub": str(user.id), "role": user.role})
    refresh = create_refresh_token({"sub": str(user.id)})
    return Token(access_token=access, refresh_token=refresh)


@router.post("/refresh", response_model=Token)
async def refresh(data: TokenRefresh, db: AsyncSession = Depends(get_db)):
    payload = decode_token(data.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    result = await db.execute(select(User).where(User.id == int(payload["sub"])))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    access = create_access_token({"sub": str(user.id), "role": user.role})
    refresh_new = create_refresh_token({"sub": str(user.id)})
    return Token(access_token=access, refresh_token=refresh_new)


@router.get("/invite-codes/validate", response_model=InviteCodeValidateOut)
async def validate_invite_code(code: str, db: AsyncSession = Depends(get_db)):
    """Public check: resolve role for a registration invite code."""
    normalized = code.strip()
    if not normalized:
        raise HTTPException(status_code=400, detail="Укажите код доступа")

    result = await db.execute(
        select(InviteCode).where(InviteCode.code == normalized)
    )
    invite = result.scalar_one_or_none()
    if not invite:
        raise HTTPException(status_code=404, detail="Код доступа не найден")
    return invite


@router.post("/register", response_model=UserOut)
async def register(
        data: UserCreate,
        db: AsyncSession = Depends(get_db)
):
    # Проверяем, свободен ли email
    user_query = select(User).where(User.email == data.email)
    user_result = await db.execute(user_query)
    if user_result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже зарегистрирован")

    invite_code = data.invite_code.strip()
    invite_res = await db.execute(
        select(InviteCode).where(InviteCode.code == invite_code)
    )
    invite = invite_res.scalar_one_or_none()
    if not invite:
        raise HTTPException(status_code=400, detail="Неверный код доступа")
    if invite.is_used:
        raise HTTPException(status_code=400, detail="Код доступа уже использован")

    role = invite.role

    # Хешируем пароль
    hashed_password = get_password_hash(data.password)

    new_user = User(
        email=data.email,
        hashed_password=hashed_password,
        first_name=data.first_name,
        last_name=data.last_name,
        middle_name=data.middle_name or "",
        phone=data.phone or "+375000000000",
        role=role,
    )

    db.add(new_user)
    await db.flush()  # get new_user.id without full commit

    # Create role-specific profile
    if role == RoleEnum.tutor:
        db.add(TutorProfile(user_id=new_user.id))
    elif role == RoleEnum.child:
        db.add(ChildProfile(user_id=new_user.id))
    elif role == RoleEnum.parent:
        db.add(ParentProfile(user_id=new_user.id))

    invite.is_used = True

    await db.commit()
    await db.refresh(new_user)
    return new_user