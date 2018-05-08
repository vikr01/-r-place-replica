import pyrebase
import random
import json

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

with open('./_sensitive/colors_firebase.json', 'r') as config:
    global CONFIG
    CONFIG = json.loads(config.read())

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

if __name__ == '__main__':
    initializeDB()