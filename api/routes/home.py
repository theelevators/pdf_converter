from typing import List
from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import shutil
import os

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
def upload(address: str, name: str, agent_name: str,
           email: str,
           agent_comments: str,
           additional_comments: str,
           files: List[UploadFile] = File(...)):
    address_dir = address.replace(" ", "_")
    new_dir = f"{agent_name}\{address_dir}\\"

    path = os.path.join(asset_path, new_dir)
    if os.path.exists(path) == False:
        os.makedirs(path)

    print(path)

    for file in files:
        try:
            with open(file.filename, 'wb') as f:
                shutil.copyfileobj(file.file, f)
            file_path = os.path.join(main_path, file.filename)
            shutil.move(file_path, path)
        except Exception:
            return {"message": "There was an error uploading the file(s)"}
        finally:
            file.file.close()

    return {"message": f"Successfuly uploaded {name} {agent_name}  {agent_comments}   {additional_comments} "}
