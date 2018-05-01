import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import _ from 'lodash'
import "../css/style.css"

const firebase_config = {
    apiKey: "AIzaSyAB0AwVJ9usviOqguYqtzwQ5tt_WVhp4ps",
    authDomain: "r-place-replica.firebaseapp.com",
    databaseURL: "https://r-place-replica.firebaseio.com",
    projectId: "r-place-replica",
    storageBucket: "r-place-replica.appspot.com",
    messagingSenderId: "280715970077"
};

firebase.initializeApp(firebase_config);

function getDiv(key) {
	return <div 
	key={key} 
	className={"box"} 
	style={{
		backgroundColor: "black"
	}}
	/>;
}

const size = 10;

export default class Place extends React.Component {
	constructor(props) {
		super(props);

		this.boxes = new Array(size);
		this.allboxes = new Array(size*(size+1));
		for(let i = 0, k = 0; i < size; i++) {
			this.boxes[i] = new Array(size);
			for(let j = 0; j < size; j++, k++) {
				let key = i.toString()+j.toString();
				this.allboxes[k] = this.boxes[i][j] = getDiv(key);
			}
			this.boxes[i][size-1]=<br key={"linebreak"+i} className={"box"}/>;
		}

		// this.boxes = [];
		// for(var i = 0; i < size; i++) {
		// 	this.boxes.push([]);
		// 	for(var j = 0; j < size; j++) {
		// 		this.boxes[i] = <div></div>;
		// 	}
		// }

		/*[
			[],
			[],
			[],
			...
		]*/

		this.state = {

		}
	}

	// componentDidMount() {}
	// componentWillUnmount() {}

	// shouldComponentUpdate(nextProps, nextState) {}
	// componentDidUpdate(prevProps, prevState, snapshot) {}

	// static getDerivedStateFromProps(nextProps, prevState) {}

	// componentDidCatch(error, info) {}

	// getSnapshotBeforeUpdate(prevProps, prevState) {}

	render() {
		return (
			<div className="boxes_container">{this.boxes}</div>
		);
	}


}


ReactDOM.render(
		<Place/>,
		document.getElementById('react')
);
