import os
import shutil
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from typing import List
from util.api_utilities import *


# Set up env
load_dotenv(find_dotenv())
password = os.environ["DB_CONNECTION"]
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
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get('/')
async def root():
    return {"Message": "Hello World!"}


@app.post("/formsubmission/")
async def upload(address: str, name: str, agent_name: str,
                 email: str,
                 agent_comments: str,
                 additional_comments: str,
                 files: List[UploadFile] = File(...)):

    address_dir = address.replace(" ", "_")
    new_dir = f"{agent_name}\{address_dir}\\"
    path = os.path.join(asset_path, new_dir)

    form = {
        "address": address,
        "name": name,
        "email": email,
        "agent": agent_name,
        "agent_comments": agent_comments,
        "additional_comments": additional_comments,
        "files_location": path

    }
    create_file_location(main_path, path, files)
    insert_submission_form(client, form)

    return {"message": f"Successfuly uploaded {name} {agent_name}  {agent_comments}   {additional_comments} "}
