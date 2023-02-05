import os
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form, Body, Depends
from typing import List
# from fastapi.responses import FileResponse, Response
from util.api_utilities import *
from util.model import UserSchema, UserLoginSchema, AuthCodeSchema
from util.jwt_handler import sign_JWT, auth_submitter
from util.jwt_bearer import jwtBearer


# Set up env
load_dotenv(find_dotenv())
main_path = os.path.dirname(
    os.environ.get("MAIN_PATH"))
asset_path = os.path.dirname(
    os.environ["ASSET_PATH"])
client = MongoClient(os.environ["DB_CONNECTION"])

# Set up api client
app = FastAPI()
origins = [
    os.environ.get("ORIGINS")
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


users = []

formCodes = []


@app.get('/form/', tags=["forms"], dependencies=[Depends(jwtBearer())])
async def get_page(id: str):
    return get_page_path(client, id)


@app.get('/home')
async def root():
    return {"Message": "Hello World!"}


@app.post("/form/", tags=["forms"], dependencies=[Depends(jwtBearer())])
async def upload(name: str, entries: str,

                 files: List[UploadFile] = File(...)):

    form_id = upload_generic_form(client, entries)

    new_dir = f"{name}/{form_id}/"
    path = os.path.join(asset_path, new_dir)
    message = create_file_location(main_path, path, files)

    return message


@app.post("/user/saveform/", dependencies=[Depends(jwtBearer())], tags=["user"])
async def save_form(name: str, components: str = Form(...)):
    return upload_new_form(client, name, components)


@app.patch("/user/updateform/", dependencies=[Depends(jwtBearer())], tags=["user"])
async def update_form_component(name: str, components: str = Form(...)):

    return update_saved_form(client, name, components)


@app.get("/user/savedform/", dependencies=[Depends(jwtBearer())], tags=["user"])
async def load_form(name: str):
    return (get_saved_form(client, name))

# Form auth


def check_auth_code(data: AuthCodeSchema):
    for code in formCodes:
        if code.authCode == data.authCode:
            return True
        return False


@app.post('/form/verifyauthcode', tags=["forms"], dependencies=[Depends(jwtBearer())])
async def verify_auth_code(authCode: AuthCodeSchema = Body(default=None)):
    if check_auth_code(authCode):
        return auth_submitter(authCode)
    else:
        return {
            "error": "Invalid login info"
        }


# User auth
@app.post('/user/signup', tags=["user"])
async def user_signup(user: UserSchema = Body(default=None)):
    users.append(user)
    return {"message": "Account Sucessfully Created"}


def check_user(data: UserLoginSchema):
    for user in users:
        if user.email == data.email and user.password == data.password:
            return True
        return False


@app.post("/user/login", tags=["user"])
async def user_login(user: UserLoginSchema = Body(default=None)):
    if check_user(user):
        return sign_JWT(user.email)
    else:
        return {
            "error": "Invalid login info"
        }


@app.post('/user/form/newformauth', tags=["user"], dependencies=[Depends(jwtBearer())])
async def auth_code_creation(authCode: AuthCodeSchema =
                             Body(default=None)):
    formCodes.append(authCode)
    return {"message": "Form Code Sucessfully Created"}
