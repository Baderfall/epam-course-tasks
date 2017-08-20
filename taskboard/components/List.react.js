import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Arrow from './Arrow.react';

export default class List extends React.Component {
    render() {
        const listItems = this.props.items;

        return (
            <ListGroup> {
                listItems.map(item => (
                <ListGroupItem key={item}>
                    {item}
                    <Arrow direction="left" />
                    <Arrow direction="right" />
                </ListGroupItem>
            ))
            }
      </ListGroup>
      );
  }
}
