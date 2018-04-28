from django.shortcuts import render
import pyrebase

config  = {
	'apiKey': "AIzaSyA70V9nqwo5U_mVo4mr8YKprrMyeMaTvuw",
	'authDomain': "r-place-project.firebaseapp.com",
	'databaseURL': "https://r-place-project.firebaseio.com",
	'projectId': "r-place-project",
	'storageBucket': "r-place-project.appspot.com",
	'messagingSenderId': "115418004367"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

def createTextBox(request):
    return render(request, "add_stuff.html")

def generateResult(request):
	word = request.POST.get('word')
	db.set({"item": word})
	item = db.child("item").get().val()
	print(item)
	return render(request, "response.html", {"data": item})