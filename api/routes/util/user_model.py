from pydantic import BaseModel, Field, EmailStr
from fastapi_jwt_auth import AuthJWT
from decouple import config


JWT_SECRET = config('user_secret_key')

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
        

class TokenRefresh(BaseModel):
    token: str = Field(default=None)
    class Config:
        the_schema = {
            "token": "fasdfasdfasdfqwerwqertsdf124h32v"            
        }
        
        
class UserLoginSchema(BaseModel):
    username: str = Field(default=None)
    password: str = Field(default=None)

    class Config:
        the_schema = {
            "username": "theelevators",
            "password": "123"
        }

       
class FormSchema(BaseModel):
    username: str = Field(default=None)
    formname: str = Field(default=None)
    code: str = Field(default=None)
    components: str = Field(default=None)
    class Config:
        the_schema = {
            "username": "random123",
            "formname": "My New Form",
            "code": "POGGERS",
            "components": '{"asdasdasdasdasdasd":"New Image Input","TestModule":"New Image Input","qqqqq":"New Question Input"}'
        }


class Settings(BaseModel):
    authjwt_secret_key: str = JWT_SECRET
    # Configure application to store and get JWT from cookies
    authjwt_token_location: set = {'headers', "cookies"}
    # Disable CSRF Protection for this example. default is True
    authjwt_cookie_csrf_protect: bool = False

@AuthJWT.load_config
def get_config():
    return Settings()
