from pydantic import BaseModel, Field, EmailStr


class UserSchema(BaseModel):
    username: str = Field(default=None)
    email: EmailStr = Field(default=None)
    password: str = Field(default=None)

    class Config:
        the_schema = {
            "user_demo": "Tom",
            "email": "elevatorstest@outlook.com",
            "password": "123"
        }


class UserLoginSchema(BaseModel):
    username: str = Field(default=None)
    password: str = Field(default=None)

    class Config:
        the_schema = {
            "username": "theelevators",
            "password": "123"
        }


class AuthCodeSchema(BaseModel):
    authCode: str = Field(default=None)

    class Config:
        the_schema = {
            "authCode": "POGGERS",
        }

class FormCodeSchema(BaseModel):
    username: str = Field(default=None)
    formName: str = Field(default=None)
    authCode: str = Field(default=None)

    class Config:
        the_schema = {
            "authCode": "POGGERS",
        }
        
        
class SaveComponentSchema(BaseModel):
    username: str = Field(default=None)
    formName: str = Field(default=None)
    authCode: str = Field(default=None)
    components: str = Field(default=None)

    class Config:
        the_schema = {
            "authCode": "POGGERS",
        }



    