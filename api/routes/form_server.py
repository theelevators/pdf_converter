import os
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

# from fastapi.responses import FileResponse, Response
from util.api_utilities import *




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


