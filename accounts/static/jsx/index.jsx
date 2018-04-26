import React from 'react'
import ReactDOM from 'react-dom'

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
