from logging import debug
from typing import List
from fastapi import Depends, HTTPException

from app.models.user import User


class RoleChecker:
    def __init__(self, allowed_roles: List):
        self.allowed_roles = allowed_roles

    # def __call__(self, user: User = Depends(get_current_active_user)):
    #     for role in user.roles:
    #         if role.name not in self.allowed_roles:
    #             debug(f"User with role {role} not in {self.allowed_roles}")
    #             raise HTTPException(status_code=403, detail="Operation not permitted")

    def has_permission(self, authenticate_value: str, user: User) -> User:
        if not user:
            raise HTTPException(status_code=404, detail="Usern not found")
        if self.allowed_roles and not user.roles:
            debug(f"User has not assigned roles")
            raise HTTPException(
                status_code=401,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
        else:
            has_permission = False
            for role in user.roles:
                if role.name in self.allowed_roles:
                    has_permission = True
            if not has_permission:
                debug(f"User with roles {user.roles} not in {self.allowed_roles}")
                raise HTTPException(
                    status_code=401,
                    detail="Not enough permissions",
                    headers={"WWW-Authenticate": authenticate_value},
                )

        return user

    GUEST = {
        "name": "GUEST",
        "description": "A Guest Account",
    }
    ACCOUNT_ADMIN = {
        "name": "ACCOUNT_ADMIN",
        "description": "Primary Administrator/Superuser For an Account",
    }

    ACCOUNT_MANAGER = {
        "name": "ACCOUNT_MANAGER",
        "description": "Day to Day Administrator of Events For an Account",
    }
    ADMIN = {
        "name": "ADMIN",
        "description": "Admin of Application Ecosystem",
    }
    SUPER_ADMIN = {
        "name": "SUPER_ADMIN",
        "description": "Super Administrator of Application Ecosystem",
    }
