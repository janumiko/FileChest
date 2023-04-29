# FileChest

A simple files repository.

## Instalation

### Backend

You need to have python 3.10+ installed.

move into backend directory
```
cd backend
```

Install modules from requirements.txt
```
pip install -r requirements.txt
```

start the postgresql server if it isn't yet started
```
sudo service postgresql start
```

create the database, by default the app uses postgresql (you need to have PostgreSQL installed)

log into an postgres session
```
sudo -u postgres psql
```

create the database with user, and set the configuration
```
CREATE DATABASE filechest;
CREATE USER myprojectuser WITH PASSWORD 'password';
ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myprojectuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE filechest TO myprojectuser;
```

Create the .env file with needed env variables, including the credentials of db user created before
```
DEBUG=
SECRET_KEY=
DJANGO_ALLOWED_HOSTS=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
```

Make migrations
```
python manage.py migrate
pythom manage.py makemigrations
```

Run the application
```
python manage.py runserver
```

You should see output similar to one below:
```
Django version 4.1.7, using settings 'filechest.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
Enter the provided address to see the webpage.