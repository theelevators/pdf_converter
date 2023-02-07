import os
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form, Body, Depends
from typing import List
# from fastapi.responses import FileResponse, Response
from util.api_utilities import *
from util.model import UserSchema, UserLoginSchema, FormCodeSchema, AuthCodeSchema, SaveComponentSchema
from util.jwt_handler import sign_JWT, auth_submitter
from util.jwt_bearer import jwtBearer, jwtFormBearer


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



@app.get('/home')
async def root():
    return {"Message": "Hello World!"}

# Form auth

@app.post("/form/", tags=["forms"], dependencies=[Depends(jwtFormBearer())])
async def upload(name: str, entries: str,

                 files: List[UploadFile] = File(...)):

    form_id = upload_generic_form(client, entries)

    new_dir = f"{name}/{form_id}/"
    path = os.path.join(asset_path, new_dir)
    message = create_file_location(main_path, path, files)


# def check_auth_code(formCode: AuthCodeSchema):
#     for code in formCodes:
#         if formCode.authCode is None:
#             return False
#         if code.authCode == formCode.authCode:
#             return True
#         return False
        

@app.get('/form/', tags=["forms"], dependencies=[Depends(jwtFormBearer())])
async def get_page(id: str): 
    
    return get_page_path(client, id)




@app.post('/form/verifyauthcode', tags=["forms"])
async def verify_auth_code(authCode: AuthCodeSchema = Body(default=None)):
    if check_auth_code(client,authCode):
        return auth_submitter(authCode.authCode)
    else:
        return {
            "error": "Invalid login info"
        }
    







# User auth
@app.post("/user/saveform", dependencies=[Depends(jwtBearer())], tags=["user"])
async def save_form(form: SaveComponentSchema = Body(default=None)):
    return upload_new_form(client, form)

@app.post("/user/updatecode", dependencies=[Depends(jwtBearer())], tags=["user"])
async def update_form_code(form: SaveComponentSchema = Body(default=None)):

    return update_form_auth_code(client, form)

@app.post("/user/updatetoken", dependencies=[Depends(jwtBearer())], tags=["user"])
async def update_form_token(form: SaveComponentSchema = Body(default=None)):

    return update_form_auth_token(client,form)




@app.post("/user/updateform", dependencies=[Depends(jwtBearer())], tags=["user"])
async def update_form_component(form: SaveComponentSchema = Body(default=None)):

    return update_saved_form(client, form)


@app.get("/user/loadform/", dependencies=[Depends(jwtBearer())], tags=["user"])
async def load_form(name: str):
    return (get_saved_form(client, name))



@app.post('/user/signup', tags=["user"])
async def user_signup(user: UserSchema = Body(default=None)):
    user_does_not_exist = await verify_new_user(client, user.username)
    if user_does_not_exist:
       return create_new_user(client, user.fullname, user.email, user.password)
    return {"error": "Account already exists"}


def check_user(data: UserLoginSchema):
    for user in users:
        if user.username == data.username and user.password == data.password:
            return True
        return False


@app.post("/user/login", tags=["user"])
async def user_login(user: UserLoginSchema = Body(default=None)):
    if verify_login(client,user.username, user.password):
        return sign_JWT(user.username)
    else:
        return {
            "error": "Invalid login info"
        }

@app.get("/user/validatetoken", tags=["user"], dependencies=[Depends(jwtBearer())])
async def validate_user_token():
    return {"message": "isLoggedIn"}





@app.post('/user/form/newformauth', tags=["user"], dependencies=[Depends(jwtBearer())])
async def auth_code_creation(formCode: FormCodeSchema =
                             Body(default=None)):
    exist = check_auth_code(client, formCode)
    if exist:
        return {"error": "Code already in use."}
    response = insert_new_form_code(client,formCode)
    if response == "OK":
    
        return {"message": "Form Code Sucessfully Created"}
    return {"error": "Unable To Create Form"}