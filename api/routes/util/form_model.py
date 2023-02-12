from pydantic import BaseModel, Field, EmailStr
from fastapi_jwt_auth import AuthJWT
from decouple import config


JWT_SECRET = config('share_code_key')


class FormCodeSchema(BaseModel):
    username: str = Field(default=None)
    formName: str = Field(default=None)
    code: str = Field(default=None)

    class Config:
        the_schema = {
            "authCode": "POGGERS",
        }


class Settings(BaseModel):
    authjwt_secret_key: str = JWT_SECRET

@AuthJWT.load_config
def get_config():
    return Settings()
