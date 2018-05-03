import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import _ from 'lodash'
import "../css/style.css"

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
		// this.allboxes = new Array(size*(size+1));
		
		// for(let i = 0, k = 0; i < size; i++) {
		// 	this.boxes[i] = new Array(size);
		// 	for(let j = 0; j < size; j++, k++) {
		// 		let key = i.toString()+j.toString();
		// 		this.allboxes[k] = this.boxes[i][j] = getDiv(key);
		// 	}
		// 	this.boxes[i][size-1]=<br key={"linebreak"+i} className={"box"}/>;
		// }


		this.selectedColor="green";

		this.state = {}
		
		database.ref(TABLE).onUpdate(
			function(snapshot) {
				console.log(snapshot.val());
			}
		);
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

	// componentWillMount() {
	// 	firebase.database().ref(TABLE).once('value').then(
	// 		function(snapshot) {
	// 			const table = snapshot.val();
	// 			_.each(table, function(row, i) {
	// 				_.each(row, function(col, j) {
	// 					this.b[getKey(i, j)].style.backgroundColor=col;
	// 				}.bind(this));
	// 			}.bind(this));
	// 		}.bind(this)
	// 	);
	// }

	// componentWillUnmount() {}

	// shouldComponentUpdate(nextProps, nextState) {}
	// componentDidUpdate(prevProps, prevState, snapshot) {}

	// static getDerivedStateFromProps(nextProps, prevState) {}

	// componentDidCatch(error, info) {}

	// getSnapshotBeforeUpdate(prevProps, prevState) {}

	render() {
		_.each(_.range(size), function(i) {
			this.boxes[i] = new Array(size+1);
			_.each(_.range(size), function(j) {
				let key = this.getKey(i, j);
				this.boxes[i][j]=this.getDiv(key);
			}.bind(this));
			this.boxes[i][size]=<br 
				key={"linebreak"+i} 
				className={"box"}
			/>;
		}.bind(this));

		database.ref(TABLE).once('value').then(
			function(snapshot) {
				_.each(snapshot.val(), function(row, i) {
					_.each(row, function(col, j) {
						this.refs[this.getKey(i, j)].style.backgroundColor=col;
					}.bind(this));
				}.bind(this));
			}.bind(this)
		);
		
		return (
			<div className="boxes_container">
			{/* <div
			className={"box"}
			ref={(r)=>this.r = r}
			onClick={()=>this.r.style.backgroundColor="red"}
			/> */}
				{this.boxes}
			</div>
		);
	}
}

ReactDOM.render(
		<Place/>,
		document.getElementById('react')
);

function render() {
	ReactDOM.render(
		<Place/>,
		document.getElementById('react')
	);
}
