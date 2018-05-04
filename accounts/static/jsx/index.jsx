import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import _ from 'lodash';
import $ from 'jquery';
import "../css/style.css";

/* https://firebase.google.com/docs/database/admin/retrieve-data#section-event-types */

const FIREBASE_CONFIG = {
    'apiKey': "AIzaSyA70V9nqwo5U_mVo4mr8YKprrMyeMaTvuw",
	'authDomain': "r-place-project.firebaseapp.com",
	'databaseURL': "https://r-place-project.firebaseio.com",
	'storageBucket': "r-place-project.appspot.com",
};

const TABLE = "grid/";

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

export default class Place extends React.Component {
	constructor(props) {
		super(props);

		this.boxes = new Array(size);
		this.selectedColor="green";
		this.state = {}
	}

	getKey(row, col) {
		return row.toString()+col.toString();
	}

	getDiv(key) {
		return <div 
			key={key} 
			className={"box"} 
			style={{
				backgroundColor: "black"
			}}
			ref={key}
			onClick={this.handleBoxClick.bind(this, key)}
		/>;
	}

	handleBoxClick(key) {
		this.refs[key].style.backgroundColor=this.selectedColor;
	}

	createPanel() {
		_.range(size).forEach(function(i) {
			this.boxes[i] = new Array(size+1);
			_.range(size).forEach(function(j) {
				let key = this.getKey(i, j);
				this.boxes[i][j]=this.getDiv(key);
			}.bind(this));

			this.boxes[i][size]=<br 
				key={"linebreak"+i} 
				className={"box"}
			/>;
		}.bind(this));
	}

	initializeFromDB() {
		database.ref(TABLE).once('value').then(
			function(snapshot) {
				_.each(snapshot.val(), function(row, i) {
					_.each(row, function(col, j) {
						this.refs[this.getKey(i, j)].style.backgroundColor=col;
					}.bind(this));
				}.bind(this));
			}.bind(this)
		);
	}

	setListeners() {
		_.range(size).forEach(
			function(i) {
				database.ref(TABLE).child(i).on('child_changed',
					function(snapshot) {
						this.refs[
							this.getKey(
								i,
								snapshot.key
							)
						].style.backgroundColor = snapshot.val();
					}.bind(this)
				)
			}.bind(this)
		);
	}


	render() {
		this.createPanel();
		this.initializeFromDB();
		this.setListeners();
		
		return (
			<div className="boxes_container">
				{this.boxes}
			</div>
		);
	}
}

ReactDOM.render(
		<Place/>,
		document.getElementById('react')
);
