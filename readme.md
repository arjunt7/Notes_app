python -m venv env
source env/Scripts/activate -> for git bash
pip install -r requirements.txt
django-admin startproject backend -> making a new django project
cd backend
python manage.py startapp api -> making the app 
see the settings.py to look for additional changes that we make 
python manage.py makemigrations -> for making it 
python manage.py migrate -> for applying the migrations 
python manage.py runserver -> to run the application, url is also given there 
http://127.0.0.1:8000/api/user/register/ -> to create a new user 
http://127.0.0.1:8000/api/token/ -> on this when you insert the name and pass of the user, you get refresh token and access token 
http://127.0.0.1:8000/api/token/refresh/ -> you can copy the refresh token that you got from api/token/ and then paste it here api/token/refresh/ , you will get a new access token for the user

after making models and serializers for it we need to set some urls, but this time we make a new file urls.py in the api folder 

********************************************

npm create vite@latest frontend -- --template react -> to create the frontend directory with react in it

create vite@latest → Downloads and runs the latest version of the vite project creation tool.

@latest ensures that you're using the newest version of Vite.

--template react tells Vite to set up a React project.

What is Vite?
Vite is a modern frontend build tool that provides: ✅ Super fast development server
✅ Instant Hot Module Replacement (HMR)
✅ Optimized production builds

Why use Vite instead of Create React App (CRA)?

Much faster than CRA

Uses ES modules for speed

Built-in support for TypeScript, JSX, CSS, and more

npm i axios react-router-dom jwt-deco
de

********************
for the database 
go to choreo website open organisation, then in dependencies go to database create one
then have a .env file in the backend folder, where you take all info from the DB
then update the database section of the setting.py file

*********************
.yaml file 
port should match the port of django 
type is REST api
context ->  base path

*******************
procfile -> command to run