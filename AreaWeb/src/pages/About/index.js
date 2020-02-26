import React from 'react';
import JSONPretty from 'react-json-pretty'

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        fetch(
            process.env.REACT_APP_SERVER_URI + '/about.json', {
            method: 'GET'
            }
        ).then(res => {
            if (res.status >= 200 && res.status <= 204) {
                res.json().then(data => {
                    this.setState({data: data})
                })
            }
        })
    }

    render() {
        return <JSONPretty id="json-pretty" data={this.state.data}></JSONPretty>
    }
}