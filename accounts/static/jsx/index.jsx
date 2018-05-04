import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import _ from 'lodash';
import $ from 'jquery';
import DjangoCSRFToken from 'django-react-csrftoken';
import '../css/style.css';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyA70V9nqwo5U_mVo4mr8YKprrMyeMaTvuw',
  authDomain: 'r-place-project.firebaseapp.com',
  databaseURL: 'https://r-place-project.firebaseio.com',
  storageBucket: 'r-place-project.appspot.com'
};

//const POST_URL = 'inputColor/postColorToServer/';
const POST_URL = 'inputColor/'; 

const TABLE = 'grid/';

const COLOR_CHOICES = [
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
];

firebase.initializeApp(FIREBASE_CONFIG);
const database = firebase.database();

// var rootRef = firebase.database()
// .ref('grid/').once('value').then(function(snapshot) {
// snapshot.forEach(function(snapshot) {
// 	console.log(snapshot.val());
// })
// });

// firebase.database().ref('/').once('value').then(
// 	function(snapshot) {
// 		// snapshot.forEach(function(snapshot) {
// 		// 	console.log(snapshot.val());
// 		// });
// 		// console.log(snapshot.val());
// 	}
// );

const size = 10;

database.ref(TABLE).once('value').then((snapshot) => {
  render(snapshot.val());
});

export default class Place extends React.Component {
  constructor(props) {
    super(props);

    this.setColors = props.boxes;
    this.boxes = new Array(size);
    this.selectedColor = 'green';
    this.state = {};
  }

  getKey(row, col) {
    return row.toString() + col.toString();
  }

  getDiv(row, column, color = 'black') {
    const key = this.getKey(row, column);
    return <div
			key={key}
			className={'box'}
			style={{
				backgroundColor: color
			}}
			ref={key}
			onClick={this.handleBoxClick.bind(this, row, column, key)}
		/>;
  }

  handleBoxClick(row, column, key) {
    const selectedColor = this.selectedColor;
    this.refs[key].style.backgroundColor = selectedColor;

    $.post(
      POST_URL,
      {
        x: row,
        y: column,
        color: selectedColor
      },

      (data) => {
        console.log(data);
      }
    );
  }

  createPanel() {
    for (let i = 0; i < size; i++) {
      const row = this.setColors[i];
      this.boxes[i] = new Array(size + 1);
      for (let j = 0; j < size; j++) {
        const color = this.setColors[i][j];
        this.boxes[i][j] = this.getDiv(i, j, color);
      }
      this.boxes[i][size] = <br
				key={`linebreak${i}`}
				className={'box'}
			/>;
    }
    this.boxes[size - 1][size] = null;
  }

  initializeFromDB() {
    database.ref(TABLE).once('value').then((snapshot) => {
      _.each(snapshot.val(), (row, i) => {
        _.each(row, (col, j) => {
          this.refs[this.getKey(i, j)].style.backgroundColor = col;
        });
      });
    });
  }

  setListeners() {
    _.range(size).forEach((i) => {
      database.ref(TABLE).child(i).on(
        'child_changed',
        (snapshot) => {
          this.refs[
            this.getKey(
              i,
              snapshot.key
            )
          ].style.backgroundColor = snapshot.val();
        }
      );
    });
  }

  createColorPalette() {
    this.colorPalette = [];
    COLOR_CHOICES.forEach((color) => {
      this.colorPalette.push(<div
						className={'paletteBox'}
						style={{ backgroundColor: color }}
						onClick={
							() => {
								this.selectedColor = color;
							}
						}
						key={`${color}palette`}
					/>);
      this.colorPalette.push(<br
					key={`${color}break`}
					/>);
    });
  }

  render() {
    this.createPanel();
    this.initializeFromDB();
    this.setListeners();
    this.createColorPalette();

    return (
			<div>

				<div className="boxes_container">
					{this.boxes}
				</div>


				<div className="palette">
					<p className="choose">Colors</p><br/>
					{this.colorPalette}
				</div>

			</div>
    );
  }
}

function render(boxes) {
  ReactDOM.render(
			<Place boxes={boxes}/>,
			document.getElementById('react')
  );
}
