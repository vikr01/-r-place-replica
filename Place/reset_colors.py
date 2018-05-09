import pyrebase
import random
import json
import os, os.path
import sys
from PIL import Image
import numpy

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
DATABASE_SIZE = 100


FILE_DIR = os.path.dirname(os.path.realpath(__file__))

CONFIG = json.loads(os.environ['COLORS_FIREBASE'])

FIREBASE = pyrebase.initialize_app(CONFIG).database()


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

def getPixels(filename, startRow=0, startColumn=0):
    image = Image.open(os.path.join(FILE_DIR, 'static/images/'+filename))
    arr = numpy.array(image)
    
    i=startRow
    for row in arr:
        if i >= DATABASE_SIZE:
            break
        j=startColumn
        for pixel in row:
            if j >= DATABASE_SIZE:
                break
            send = 'rgb'+str(tuple(pixel))
            FIREBASE.child('grid').child(i).child(j).set(send)
            j += 1
        i += 1



    pass

if __name__ == '__main__':
    if sys.argv[1] == 'random' or len(sys.argv) < 2:
        initializeDB()
    else:
        getPixels(sys.argv[1])