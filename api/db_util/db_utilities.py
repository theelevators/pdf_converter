import os
from dotenv import load_dotenv, find_dotenv
import requests
from PIL import Image

load_dotenv(find_dotenv())

api_ip = os.environ.get("API_IP")

def create_pdf_file(address: str, location: str, id: str):

    img_path = os.path.dirname(location)
    pdf_name = f"{address}.pdf"
    pdf_dir = os.path.join(img_path, "pdf_file\\")

    if os.path.exists(pdf_dir) == False:
        os.makedirs(pdf_dir)

    pdf_path = os.path.dirname(pdf_dir)
    size = 600, 600
    images = []
    for f in os.listdir(img_path):

        if '.jpg' in f:
            img = Image.open(os.path.join(img_path, f))
            img.thumbnail(size, Image.Resampling.LANCZOS)
            images.append(img)

    final_path = os.path.join(pdf_path, pdf_name)

    images[0].save(
        final_path, "PDF", resolution=100.0, save_all=True, append_images=images[1:]
    )
    return final_path

def send_id(id,pdf_path):
    response = requests.patch(f"{api_ip}formsubmission/?id={id}&pdf_path={pdf_path}" )
    return response.json()

def submit_email(id):
    response = requests.put(f"{api_ip}email/?id={id}")
    message = response.json()
    return message
