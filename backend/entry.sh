#!/bin/bash

set -e

./wait-for-it.sh postgres:5432

pipenv run python3 manage.py migrate --noinput
pipenv run python3 manage.py collectstatic --noinput

if [ "$DEV" == "true" ]
then
    echo "Development mode"
    pipenv run gunicorn sk6ab.asgi --reload --reload-engine=poll --chdir $PWD -k uvicorn.workers.UvicornWorker -b 0.0.0.0:80
else
    pipenv run gunicorn sk6ab.asgi --chdir $PWD -w 4 --threads 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:80
fi
