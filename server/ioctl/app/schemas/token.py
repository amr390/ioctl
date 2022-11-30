from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class TokenPayload(BaseModel):
    sub: Optional[int] = None


class TokenCreate(BaseModel):
    id: int
    user_id: int
    validity: int


class TokenUpdate(TokenCreate):
    pass
