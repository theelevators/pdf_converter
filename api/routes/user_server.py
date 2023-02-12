import os
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form, Body, Depends, Cookie, HTTPException, status, Response, Request
from typing import List, Union, Optional
from fastapi.responses import JSONResponse
from fastapi_jwt_auth.exceptions import AuthJWTException
# from fastapi.responses import FileResponse, Response
from util.api_utilities import *
from util.user_model import UserSchema, UserLoginSchema, FormSchema
from fastapi_jwt_auth import AuthJWT
import datetime




# Set up env
load_dotenv(find_dotenv())
main_path = os.path.dirname(
    os.environ.get("MAIN_PATH"))
asset_path = os.path.dirname(
    os.environ["ASSET_PATH"])
client = MongoClient(os.environ["DB_CONNECTION"])

# Set up api client
app = FastAPI()
origins = [os.environ.get("ORIGINS")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )



@app.get('/home')
async def root():
    return {"Message": "Hello World!"}


        
@app.get('/users')
async def get_all_users():
    users = get_users(client)
    return {"users": users}

@app.get('/form/', tags=["forms"])
async def get_page(id: str): 
    return get_page_path(client, id)


@app.post("/form/", tags=["forms"])
async def upload(name: str, entries: str,

                 files: Optional[List[UploadFile]] = File(...)):

    form_id = upload_generic_form(client, entries)

    new_dir = f"{name}/{form_id}/"
    path = os.path.join(asset_path, new_dir)
    message = create_file_location(main_path, path, files)

    return message


@app.get('/components/', tags=["forms"])
async def get_page(id: str): 
    
    form = get_saved_form(client, id)
    
    return form



@app.post("/simpleform/", tags=["forms"])
async def upload(name: str, entries: str):

    form_id = upload_generic_form(client, entries)

    if 'error' in form_id:
        return form_id
    
    raise HTTPException(status_code=status.HTTP_200_OK, detail="Form Submitted")




# User auth
@app.post("/saveform",  tags=["user"])
async def save_form(form: FormSchema = Body(default=None),  Authorize: AuthJWT=Depends()):
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")
    return upload_new_form(client, form)

@app.post("/updatecode", tags=["user"])
async def update_form_code(form: FormSchema = Body(default=None),  Authorize: AuthJWT=Depends()):
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    return update_form_auth_code(client, form)


@app.post("/updateform",  tags=["user"])
async def update_form_component(form: FormSchema = Body(default=None),  Authorize: AuthJWT=Depends()):
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    return update_saved_form(client, form)


@app.get("/loadform/", tags=["user"])
async def load_form(name: str,  Authorize: AuthJWT=Depends()):
    try:
        Authorize.jwt_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")
    
    return (get_saved_form(client, name))


@app.post('/signup', tags=["user"])
async def user_signup(user: UserSchema = Body(default=None)):
    user_does_not_exist = verify_new_user(client, user.username, user.email)
    if user_does_not_exist:
       response = create_new_user(client, user.username, user.email, user.password)
       
       if "error" in response:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Account already exist")
       else:      
        raise HTTPException(status_code=status.HTTP_200_OK, detail="Account Created")
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Account already exist")



@app.post("/login", tags=["user"])
async def user_login(user: UserLoginSchema = Body(default=None), Authorize: AuthJWT=Depends()):
    if not verify_login(client,user.username, user.password):
       raise HTTPException(status_code=401,detail="Incorrect email or password")
   
   
    expires = datetime.timedelta(minutes=15)
    access_token = Authorize.create_access_token(subject=user.username, expires_time=expires)
    expires = datetime.timedelta(hours=12)
    refresh_token = Authorize.create_refresh_token(subject=user.username, expires_time=expires)
    Authorize.set_refresh_cookies(refresh_token)

    return {"token": access_token}



@app.get('/refresh')
def refresh(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_refresh_token_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")
    
    user = Authorize.get_jwt_subject()
    
        
    expires = datetime.timedelta(minutes=15)
    access_token = Authorize.create_access_token(subject=user, expires_time=expires)

    return  {
        "user": user,
        "token": access_token
        }




@app.post('/sharecode', tags=["user"])
async def set_share_code(form: FormSchema =
                             Body(default=None), Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_refresh_token_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")
    
    exist = check_share_code(client, form)
    if exist:
        return {"error": "Code already in use."}
    response = insert_share_code(client,form)
    if response == "OK":
    
        return {"message": "Form Code Sucessfully Created"}
    
    
    return {"error": "Unable To Create Form"}


@app.delete('/logout')
def logout(Authorize: AuthJWT = Depends()):

    try:
        Authorize.jwt_refresh_token_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")
    Authorize.unset_jwt_cookies()
    return {"msg":"Successfully logout"}