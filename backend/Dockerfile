FROM python:3.10-bullseye

RUN pip install pipenv

RUN mkdir /app
WORKDIR /app

COPY Pipfile Pipfile.lock ./
RUN pipenv sync
COPY . ./

ENTRYPOINT ["./entry.sh"]
