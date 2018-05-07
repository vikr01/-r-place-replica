import pyrebase
import random

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



CONFIG  = {
	'apiKey': 'AIzaSyA70V9nqwo5U_mVo4mr8YKprrMyeMaTvuw',
	'authDomain': 'r-place-project.firebaseapp.com',
	'databaseURL': 'https://r-place-project.firebaseio.com',
	'projectId': 'r-place-project',
	'storageBucket': 'r-place-project.appspot.com',
	'messagingSenderId': '115418004367'
}
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

