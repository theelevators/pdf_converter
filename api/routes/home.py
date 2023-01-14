import os
import shutil
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from typing import List


load_dotenv(find_dotenv())

password = os.environ.get("MONGODB_PWD")

connection_string = f"""mongodb+srv://elevators13:{password}@elevate.fzxyhvj.mongodb.net/?retryWrites=true&w=majority"""

client = MongoClient(connection_string)

dbs = client.list_database_names()


def insert_submission_form(document):

    collection = client.fwt_project.submissions
    inserted_id = collection.insert_one(document).inserted_id


app = FastAPI()


main_path = os.path.dirname(
    'D:\\download here\\Projects\\pdf_converter\\api\\routes\\')
asset_path = os.path.dirname(
    'D:\\download here\\Projects\\pdf_converter\\assets\\')

origins = [
    "http://localhost:3000"
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

    if os.path.exists(path) == False:
        os.makedirs(path)
    for file in files:
        try:
            with open(file.filename, 'wb') as f:
                shutil.copyfileobj(file.file, f)
            file_path = os.path.join(main_path, file.filename)

            shutil.move(file_path, os.path.join(path, file.filename))

        except Exception as err:
            return {"message": "There was an error uploading the file(s)"}
        finally:
            file.file.close()

    form = {
        "address": address,
        "name": name,
        "email": email,
        "agent": agent_name,
        "agent_comments": agent_comments,
        "additional_comments": additional_comments,
        "files_location": path

    }
    insert_submission_form(form)

    return {"message": f"Successfuly uploaded {name} {agent_name}  {agent_comments}   {additional_comments} "}
