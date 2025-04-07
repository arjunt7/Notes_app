# how JWT works is tha whenever a user login, there is a req sent from frontend to backend and the backend will check if the user is valid or not, if valid then it will create a JWT token and send it back to the frontend, the frontend will store this token in local storage and send it with every request to the backend
# and in return the backend give one refresh token and one access token, the access token is valid for a short period of time and the refresh token is valid for a long period of time, so when the access token expires, the frontend will send the refresh token to the backend and the backend will check if the refresh token is valid or not, 
# if valid then it will create a new access token and send it back to the frontend, this way we can keep the user logged in for a long time without asking for username and password again and again but when the refresh token expires, the user will have to login again and get a new refresh token and access token,
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
# orm -> OBJECT RELATIONAL MAPPING 
# this converts the python object to the corresponding object that is needed to make a change in the database so we can just write python code and django will take care of the backend operations in the backend
# we use JSON, so the serializer will convert the python object to JSON and vice versa

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User #repesents the user model in the database
        fields = ("id", "username", "password")
        extra_kwargs = {"password": {"write_only": True}}
    # this will make sure that the password is not returned in the response when we accept the password from the user so its write only no one can read it
    # this will make sure that the password is hashed when we save it to the database so we can use the create method to create a new user and hash the password before saving it to the database
 
 #serializer will make sure that the data passed is correct and then pass it to create method
    def create(self, validated_data):
        #creating the user 
        user = User.objects.create_user(**validated_data) # **-> spliting up the keywords and passing them as such from a dictionary
        return user
    
    # for the model 
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} #here we are doing opposite of the user, since we want people to be able to read but not write who the author is, the we will do manually based on who wrote the note so read oly 