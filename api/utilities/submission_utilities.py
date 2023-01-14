from dotenv import load_dotenv, find_dotenv
import os
import pprint
from pymongo import MongoClient

load_dotenv(find_dotenv())

password = os.environ.get("MONGODB_PWD")

connection_string = f"""mongodb+srv://elevators13:{password}@elevate.fzxyhvj.mongodb.net/?retryWrites=true&w=majority"""

client = MongoClient(connection_string)

dbs = client.list_database_names()


def insert_test_doc():
    collection = client.fwt_submissions.submissions
    test_document = {
        "Hello": "World!",
        "My Name Is": 1,
        "jk it is": 'tom'
    }

    inserted_id = collection.insert_one(test_document).inserted_id

    print(inserted_id)


insert_test_doc()
