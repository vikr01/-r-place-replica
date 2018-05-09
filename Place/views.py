from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from colour import Color
import pyrebase
import random
import datetime
import dateutil.parser
import json
import os, os.path

FILE_DIR = os.path.dirname(os.path.realpath(__file__))

CONFIG = json.loads(os.environ['COLORS_FIREBASE'])

DATABASE_SIZE = 100

FIREBASE = pyrebase.initialize_app(CONFIG).database()
TIME_WAIT = 1

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
    return JsonResponse({
        'error': error,
        'msg': message,
    })

def createBaseInputPage(request):
    return render(request, 'add_stuff.html')


@csrf_exempt
def home(request):
    request.session['wait'] = False
    request.session['waittill'] = datetime.datetime.now().isoformat()
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

    print('REQUEST: ', str(request.POST))

    if request.session['wait'] or datetime.datetime.now() < dateutil.parser.parse(request.session['waittill']):
        return createResponse(
            True,
            "WAIT"
        )

    # if request.session['reject'] is True:
    #     return createResponse(
    #         True,
    #         None
    #     )
    
    request.session['wait'] = True

    try:
        x = int(request.POST.get('x'))
        y = int(request.POST.get('y'))
        color = request.POST.get('color')
    except (ValueError, KeyError) as e:
        print(str(e))
        request.session['wait'] = False
        return createResponse(
            True,
            'Invalid value selected.'
        )

    response = None
    if x < DATABASE_SIZE and x >= 0 \
            and y < DATABASE_SIZE and y >= 0 \
                            and checkColor(color):
        
        FIREBASE.child('grid').child(x).child(y).set(color)
        request.session['waittill'] = (datetime.datetime.now() + datetime.timedelta(0, TIME_WAIT)).isoformat()
        response = createResponse(
            False,
            "WAIT"
        )
    
    else:
        response = createResponse(True, 'Invalid value selected.')

    request.session['wait'] = False
    return response
