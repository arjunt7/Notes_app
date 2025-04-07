from django.db import models
from django.contrib.auth.models import User

# django use ORM so we can write the model definiton in python and django will take care of the rest, we just need to run the makemigrations and migrate commands to create the database tables and columns
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField() #no max len for this 
    created_at = models.DateTimeField(auto_now_add=True) #auto_now_add=True this me we dont want to pass it instead we want it to automatically populate when a new instance of the note is created 
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") # one user can have many notes, so we use foreign key to reference the user adn on delete of the user delete all the notes of that user 

    def __str__(self):
        return self.title
    
# we need to make a serializer fo this too since we want to conver it to json, so back to serializers.py