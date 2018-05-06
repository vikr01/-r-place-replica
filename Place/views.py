from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from colour import Color
import pyrebase
import random
import datetime, dateutil.parser
import json

CONFIG  = {
	'apiKey': 'AIzaSyA70V9nqwo5U_mVo4mr8YKprrMyeMaTvuw',
	'authDomain': 'r-place-project.firebaseapp.com',
	'databaseURL': 'https://r-place-project.firebaseio.com',
	'projectId': 'r-place-project',
	'storageBucket': 'r-place-project.appspot.com',
	'messagingSenderId': '115418004367'
}

DATABASE_SIZE = 100

FIREBASE = pyrebase.initialize_app(CONFIG).database()

ALLOWED_CHANGES_PER_30_SEC = 5

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
    #clears FIREBASE 
    # FIREBASE.child('grid').remove() 
    for row in range(0, DATABASE_SIZE):
    	for col in range(0, DATABASE_SIZE):
    		FIREBASE.child('grid').child(row).child(col).set(random.choice(tuple(COLORS)))
    pass

def createBaseInputPage(request):
    return render(request, 'add_stuff.html')


@csrf_exempt
def home(request):
    request.session['changed'] = 0
    request.session['wait_till'] = (datetime.datetime.now() + datetime.timedelta(0, -1)).isoformat()
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

    print('REQUEST: ', str(request))

    if request.session['changed'] == 5:
        if datetime.datetime.now() < dateutil.parser.parse(request.session['waittill']):
            return JsonResponse({
                    False,
                    None
            })
        else:
            request.session['changed'] = 0

    try:
        x = int(request.POST.get('x'))
        y = int(request.POST.get('y'))
        color = request.POST.get('color')
    except (ValueError, KeyError) as e:
        print(str(e))
        return JsonResponse(createResponse(
                True,
                'Invalid value selected.'
        ))

    response = None
    if x < DATABASE_SIZE and x >= 0 \
            and y < DATABASE_SIZE and y >= 0 \
                            and checkColor(color):
        
        FIREBASE.child('grid').child(x).child(y).set(color)
        request.session['changed'] += 1
        response = createResponse(
            False,
            {'wait': True} if request.session['changed'] == 5
             else {}
        )

        if request.session['changed'] == 5:
            request.session['waittill'] = (datetime.datetime.now() + datetime.timedelta(0, 30)).isoformat()
    else:
        response = createResponse(True, 'Invalid value selected.')

    return JsonResponse(response)
