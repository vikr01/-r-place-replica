import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import "../css/style.css"

const config = {
    apiKey: "AIzaSyAB0AwVJ9usviOqguYqtzwQ5tt_WVhp4ps",
    authDomain: "r-place-replica.firebaseapp.com",
    databaseURL: "https://r-place-replica.firebaseio.com",
    projectId: "r-place-replica",
    storageBucket: "r-place-replica.appspot.com",
    messagingSenderId: "280715970077"
};

firebase.initializeApp(config);

const size = 5;

class Place extends React.Component {
	constructor(props) {
		super(props);

		this.boxes = [];
		for(var i = 0; i < size; i++) {
			boxes.push([]);
			for(var j = 0; j < size; j++) {
				boxes[i] = <div></div>;
			}
		}

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
			<h1>Hello World</h1>
		);
	}


}


ReactDOM.render(
		<Place/>,
		document.getElementById('react')
);
