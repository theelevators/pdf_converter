import os
from PIL import Image
# basic layout to conver images to pdf


img_path = os.path.dirname(
    'D:\\download here\\Projects\\pdf_converter\\assets\\submission_assets\\')

pdf_path = os.path.dirname(
    "D:\\download here\\Projects\\pdf_converter\\assets\\converted_pdfs\\")

images = [
    Image.open(os.path.join(img_path, f))
    for f in ["stock_image_1.jpg", "stock_image_2.jpg", "stock_image_3.jpg"]
]

pdf_path = os.path.join(img_path, "new_pdf.pdf")

images[0].save(
    pdf_path, "PDF", resolution=100.0, save_all=True, append_images=images[1:]
)
