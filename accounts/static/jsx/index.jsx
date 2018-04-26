import React from 'react'
import ReactDOM from 'react-dom'

class Place extends React.Component {
	constructor(props) {
		super(props);
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
