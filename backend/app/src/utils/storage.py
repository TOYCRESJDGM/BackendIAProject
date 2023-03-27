import boto3
import os
from src.utils.settings import (
    AWS_ACCESS_KEY_ID,
    AWS_REGION_NAME,
    AWS_S3_BUCKET_NAME,
    AWS_SECRET_ACCESS_KEY
)


def public_image(image_data):
    with open(image_data, "rb") as f:
        image = f.read()
    try:

        s3_client =  boto3.resource(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=AWS_REGION_NAME
        )

        s3_client.Bucket(AWS_S3_BUCKET_NAME).put_object(
            key="testput_image.png", Body = image, ACL='public-read'
        )

    except Exception as e:
        print(e)
        print("Error to s3")

