from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from colour import Color
import pyrebase

CONFIG  = {
	'apiKey': 'AIzaSyA70V9nqwo5U_mVo4mr8YKprrMyeMaTvuw',
	'authDomain': 'r-place-project.firebaseapp.com',
	'databaseURL': 'https://r-place-project.firebaseio.com',
	'projectId': 'r-place-project',
	'storageBucket': 'r-place-project.appspot.com',
	'messagingSenderId': '115418004367'
}

DATABASE_SIZE = 100

FIREBASE = pyrebase.initialize_app(CONFIG)

DB = FIREBASE.database()

def createResponse(error, message):
    return {
        'error': error,
        'msg': message
    }

def initializeDB(size):
    #clears DB 
    DB.child('grid').remove()
    for row in range(0, size):
    	for col in range(0, size):
    		DB.child('grid').child(row).child(col).set('black')
    
    return size

def createBaseInputPage(request):
    return render(request, 'add_stuff.html')

# Create your views here.
@csrf_exempt
def home(request):
    return render(request, 'r-place.html')

def checkColor(color):
    try:
        color = color.replace(' ', '')
        Color(color)
        return True

    except ValueError as e:
        print(str(e)) 
        return False

@csrf_exempt
def updatePixelColor(request):
    print('REQUEST: ', request)
    if not request.POST or not request.POST:
        print()

    try:
        x = int(request.POST.get('x'))
        y = int(request.POST.get('y'))
    except ValueError as e:
        print(str(e))
        return JsonResponse(createResponse(
                True,
                'Invalid value selected.'
        ))

    color = request.POST.get('color')

    response = None
    if x < DATABASE_SIZE and x >= 0 \
            and y < DATABASE_SIZE and y >= 0 \
                            and checkColor(color):
        
        DB.child('grid').child(x).child(y).set(color)
        response = createResponse(
            False,
            None
        )
    else:
        response = createResponse(True, 'Invalid value selected.')

    return JsonResponse(response)


# size = initializeDB(10)

#requestObject = post(views.updatePixelColor, {'x' : 0, 'y' : 0, 'color' : 'red'}, {'x' : 0, 'y' : 0, 'color' : 'red'})
