from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from colour import Color
import pyrebase
import random

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

COLORS = {
    'black',
    'navy',
    'blue',
    'lightskyblue',
    'teal',
    'steelblue',
    'green',
    'yellowgreen',
    'maroon',
    'red',
    'tomato',
    'whitesmoke',
    'white',
    'yellow',
    'orange',
    'gray',
    'purple',
    'slateblue',
    'pink',
    'darksalmon',
    'tan',
    'brown'
}

def createResponse(error, message):
    return {
        'error': error,
        'msg': message
    }

def initializeDB():
    """
    Run when resetting database values.
    """
    #clears DB 
    # DB.child('grid').remove() 
    for row in range(0, DATABASE_SIZE):
    	for col in range(0, DATABASE_SIZE):
    		DB.child('grid').child(row).child(col).set(random.choice(tuple(COLORS)))
    pass

def createBaseInputPage(request):
    return render(request, 'add_stuff.html')


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
    """
    request: (request object)
            {
                'x' : int <SIZE & >=0, 
                'y' : int <SIZE & >=0, 
                'color' : string containing a CSS color style
            }
    """

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
