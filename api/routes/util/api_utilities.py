import os
import shutil
from pymongo import MongoClient

def insert_submission_form(client, document):
    collection = client.fwt_project.submissions
    inserted_id = collection.insert_one(document).inserted_id


def create_file_location(main_path, files_path, files):
    if os.path.exists(files_path) == False:
        os.makedirs(files_path)
    for file in files:
        try:
            with open(file.filename, 'wb') as f:
                shutil.copyfileobj(file.file, f)
            file_path = os.path.join(main_path, file.filename)
            shutil.move(file_path, os.path.join(files_path, file.filename))
        except Exception as err:
            return {"message": "There was an error uploading the file(s)"}
        finally:
            file.file.close()
