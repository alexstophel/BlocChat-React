import React from 'react';
import AddMessage from '../AddMessage/index.js';

export default function(props) {
  return (
    <section>
      <h1>{props.currentRoom.name}</h1>
      {props.messages.map((message, index) => {
        return (
          <li key={index}>{message.body} by {message.createdBy}</li>
        );
      })}
      <AddMessage handleAddMessage={props.handleAddMessage} />
    </section>
  );
}
