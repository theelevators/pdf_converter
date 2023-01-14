from dotenv import load_dotenv, find_dotenv
import os
import pprint
from pymongo import MongoClient


load_dotenv(find_dotenv())

password = os.environ.get("MONGODB_PWD")

connection_string = f"""mongodb+srv://elevators13:{password}@elevate.fzxyhvj.mongodb.net/?retryWrites=true&w=majority"""

client = MongoClient(connection_string)

dbs = client.list_database_names()


def insert_submission_form(document):
    collection = client.fwt_submissions.submissions
    inserted_id = collection.insert_one(document).inserted_id

    print(inserted_id)


form = {
    "address": "address",
    "name": "address",
    "email": "address",
    "agent": "address",
    "agent_comments": "address",
    "additional_comments": "address",
    "files_location": "address"

}
insert_submission_form(form)
