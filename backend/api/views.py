from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, NoteSerializer
from .models import Note

# view for creating the note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] #not call this route unless you pass a valid JWT toker
    # now we are overwriting some methods acc to our needs
    
    # give notes by a specific user 
    def get_queryset(self):
        user = self.request.user #give the user object 
        return Note.objects.filter(author=user)
        # Note.objects.all() gives all the notes, here we are filtering based on user so that we can get only the notes created by the user who is logged in,
        # we can also fiter by title etc 
    
    def perform_create(self, serializer):
        #here we manually check the serializer object
        if serializer.is_valid(): # and check if its valid or not
            serializer.save(author=self.request.user) # so is the data was valid we save the serializer and we can pass things that will be displayed on the same note
            #here we are passing the author cause remeber in models.py author was readonly so from here we are passing the author name  
        else:
            print(serializer.errors)

# for detel
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
# we have the serializer but we still need a view of path to make this user 
class CreateUserView(generics.CreateAPIView): #generics is a module that provides a set of generic views that can be used to create, update, delete and list objects (here users) in the database
    # this will create a new user and return the user object
    queryset = User.objects.all() #give the complete list first so as to prevent making duplicate users
    serializer_class = UserSerializer # tell what kind of data we need to accept to make the user in this case username abd pass
    permission_classes = [AllowAny]  # this tell who all are allowed to call this, in this case everyone
