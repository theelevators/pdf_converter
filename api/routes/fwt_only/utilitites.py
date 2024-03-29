
import os
from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
import smtplib
from email.message import EmailMessage
import json

api_ip = os.environ.get("API_IP")


def send_email(client, id):
    collection = client.fwt_project.submissions
    
    record = collection.find_one({'_id': ObjectId(id)})
    recipient = record['email']
    # Open the plain text file whose name is in textfile for reading.
    s = smtplib.SMTP(host=os.environ.get("EMAIL_HOST"), port=os.environ.get("EMAIL_PORT"))
    s.starttls()
    s.login(os.environ.get("EMAIL_ADDR"),os.environ.get("EMAIL_PWD") )
    html = f"""<a href="{api_ip}pdf/?id={id}"><p>Here is your submission</p></a>"""
    msg = EmailMessage()
    msg.set_content(html, subtype='html')
    msg['Subject'] = "Test" 
    msg['From'] = os.environ.get("EMAIL_ADDR")
    msg['To'] = recipient 

    # Send the message via our own SMTP server.
    try:
        s.send_message(msg)
        s.quit()
    except Exception as err:
        return {"error message":err}
    return {"message": "email sent!"}
    
def get_pdf(client, id):
    collection = client.fwt_project.submissions
    record = collection.find_one({'_id': ObjectId(id)})
    pdf_file = record['pdf_path']
    return pdf_file
    


def update_pdf_path(client, id, pdf_path):
    collection = client.fwt_project.submissions
    try:
        collection.update_one({'_id': ObjectId(id)},  {'$set': {"pdf_path": pdf_path}}) 
        
    except Exception as err:
        return {"error message":err}
    return {"pdf_path": pdf_path}


def get_all_submissions(client):
    collection = client.fwt_project.submissions
    headers = ['id','Address', 'Agent Name','Contact Email', 'Team Member','Agent Comments', 'Additional Comments', 'Photo Location', 'PDF Location']
    query = {"pdf_path": {"$exists": "true"}}
    try: 
        docs = []
        for doc in collection.find(query):
           docs.append( [ str(doc['_id']),
            doc['address'],
            doc['name'],
            doc['email'],
            doc['agent'],
            doc['agent_comments'],
            doc['additional_comments'],
            doc['files_location'],
            doc['pdf_path']])
        
        docs.insert(headers)
        data = json.dumps(docs)
        response = json.loads(data)
        return {"success": response}
    except Exception as err:
        return {"error": err}
    