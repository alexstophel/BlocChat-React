import React from 'react';

export default function(props) {
  let handleDelete = () => {
    props.firebaseService.deleteRoom(props.room.key);
  }

  let handleChange = () => {
    props.handleRoomChange(props.room);
  }

  return (
    <li>
      <span onClick={handleChange}>{props.room.name}&nbsp;</span>
      <strong>
        <a href="#" onClick={handleDelete}>Delete</a>
      </strong>
    </li>
  );
}
