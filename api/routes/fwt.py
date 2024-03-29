import os
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from typing import List
from fastapi.responses import FileResponse
from util.api_utilities import *
from fwt_only.utilitites import *


api_ip = os.environ.get("API_IP")

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


@app.post("/formsubmission/")
async def upload(address: str, name: str, agent_name: str,
                 email: str,
                 agent_comments: str,
                 additional_comments: str,
                 files: List[UploadFile] = File(...)):

    address_dir = address.replace(" ", "_")
    new_dir = f"{agent_name}/{address_dir}/"
    # print (new_dir)
    path = os.path.join(asset_path, new_dir)
    # print (path)
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

    return {"message": "Thank you for the submission! Check your email for confirmation."}


@app.get('/pdf/')
async def download_pdf(id: str):
    pdf = get_pdf(client, id)
    return FileResponse(pdf)


@app.get('/submissions')
async def download_pdf():
    attempt = get_all_submissions(client)

    attempt_message = attempt.keys()

    if 'success' in attempt_message:
        values = attempt['success']
        return {"message": [values]}
    if 'error' in attempt_message:
        return {"message": "An error has occurred. We have been notified."}


@app.patch('/formsubmission/')
async def update_form(id: str, pdf_path: str):

    message = update_pdf_path(client, id, pdf_path)
    return message


@app.put('/email/')
async def create_email(id: str):

    send_email(client, id)
