import os
import pymongo
from dotenv import load_dotenv, find_dotenv
from bson.objectid import ObjectId
from image_utilities import create_pdf_file

load_dotenv(find_dotenv())
client = pymongo.MongoClient(os.environ['CHANGE_STREAM_DB'])

change_stream = client.fwt_project.submissions.watch([{
    '$match': {
        'operationType': {'$in': ['insert']}
    }
}])

for change in change_stream:
    id = ObjectId(change["fullDocument"]["_id"])
    name = change["fullDocument"]["name"]
    address = change["fullDocument"]["address"]
    email = change["fullDocument"]["email"]
    agent = change["fullDocument"]["agent"]
    agent_comments = change["fullDocument"]["agent_comments"]
    additional_comments = change["fullDocument"]["additional_comments"]
    files_location = change["fullDocument"]["files_location"]

    create_pdf_file(address=address, location=files_location, id=id)
