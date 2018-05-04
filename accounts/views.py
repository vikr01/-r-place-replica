from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from colour import Color
import pyrebase

config  = {
	'apiKey': "AIzaSyA70V9nqwo5U_mVo4mr8YKprrMyeMaTvuw",
	'authDomain': "r-place-project.firebaseapp.com",
	'databaseURL': "https://r-place-project.firebaseio.com",
	'projectId': "r-place-project",
	'storageBucket': "r-place-project.appspot.com",
	'messagingSenderId': "115418004367"
}

def createResponse(error, message):
    return {
        "error": error,
        "msg": message
    }


#constant
SIZE = 10

def initializeDB(size):
    #clears DB 
    db.child("grid").remove()
    for row in range(0, size):
    	for col in range(0, size):
    		db.child("grid").child(row).child(col).set("black")
    
    return size

def createBaseInputPage(request):
    return render(request, "add_stuff.html")

# Create your views here.
def home(request):
    # return HttpResponse("<br/>".join([
    # '<script src=\"../DropboxPrototype/static/bundles/index.js\"></script>',
    # 'Home page! Welcome.'
    # ]))
    return render(request, 'r-place.html')

def checkColor(color):
    try:
        color = color.replace(" ", "")
        Color(color)

        return True

    except ValueError: 
        return False

def updatePixelColor(request):
    print(request)
    x = int(request.POST.get("x"))
    y = int(request.POST.get("y"))
    color = request.POST.get("color")

    response = None
    if x < SIZE and x > -1:
        if y < SIZE and y > -1:
            if checkColor(color):
                db.child("grid").child(x).child(y).set(color)
                response = createResponse(
                    False,
                    "DB has been set with new color at location: " 
                    + str(x) + ", " + str(y)
                )
    else:
        response = createResponse(True, "There was an error with the request")

    return JsonResponse(response)

firebase = pyrebase.initialize_app(config)

db = firebase.database()

# size = initializeDB(10)

#requestObject = post(views.updatePixelColor, {"x" : 0, "y" : 0, "color" : "red"}, {"x" : 0, "y" : 0, "color" : "red"})
