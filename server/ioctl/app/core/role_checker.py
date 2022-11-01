from logging import debug
from typing import List
from fastapi import Depends, HTTPException
from app.api.deps import get_current_active_user

from app.models.user import User


class RoleChecker:
    def __init__(self, allowed_roles: List):
        self.allowed_roles = allowed_roles

    def __call__(self, user: User = Depends(get_current_active_user)):
        for role in user.roles:
            if role.name not in self.allowed_roles:
                debug(f"User with role {role} not in {self.allowed_roles}")
                raise HTTPException(status_code=403, detail="Operation not permitted")
