FROM python:3.10
RUN apt-get update \
    && apt-get -y install libpq-dev gcc uvicorn \
    && pip install psycopg2

WORKDIR /code
COPY ./requirements.txt  /code/

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app.py /code/app.py
RUN python /code/app.py
EXPOSE 8000