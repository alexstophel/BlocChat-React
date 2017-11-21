import React from 'react';
import Room from '../Room/index.js';

export default function(props) {
  return (
    <section>
      <h1>Active Rooms</h1>
      <ul>
        {props.rooms.map((room, index) => {
          return (
            <Room 
              key={index}
              room={room}
              firebaseService={props.firebaseService}
              handleRoomChange={props.handleChangeRoom} />
          );
        })}
      </ul>
    </section>
  );
}
