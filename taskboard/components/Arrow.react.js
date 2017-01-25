import React from 'react';
import { Button } from 'react-bootstrap';

export default class Arrow extends React.Component {
    render() {
        if (this.props.direction === 'left') {
            return (<Button bsSize="small" className="list-item-button">&#8594;</Button>);
        } else if (this.props.direction === 'right') {
            return(<Button bsSize="small" className="list-item-button">&#8592;</Button>);
        }
    }
}
