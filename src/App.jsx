// React
import React from 'react';
import ReactDOM from 'react-dom';

// Services
import FirebaseService from './FirebaseService';

// Components
import AddRoom from './AddRoom/index.js';
import RoomList from './RoomList/index.js';
import MessageList from './MessageList/index.js';
import SignInButton from './SignInButton/index.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      currentRoom: {},
      messages: [],
      user: null
    }

    this.handleAddRoom = this.handleAddRoom.bind(this);
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
    this.handleAddMessage = this.handleAddMessage.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    this.props.firebaseService.onRoomAdded((addedRoom) => {
      this.setState({ rooms: this.state.rooms.concat(addedRoom) });
    });

    this.props.firebaseService.onMessageAdded((addedMessage) => {
      if (this.state.currentRoom && this.state.currentRoom.key === addedMessage.roomKey) {
        this.setState({ messages: this.state.messages.concat(addedMessage) });
      }
    });

    this.props.firebaseService.onRoomDeleted((deletedRoom) => {
      this.setState({
        rooms: this.state.rooms.filter((room) => {
          return room.key !== deletedRoom.key
        })
      });
    });
  }

  handleAddRoom(roomName) {
    this.props.firebaseService.addRoom(roomName);
  }

  handleAddMessage(messageBody) {
    let createdBy = this.state.user.name;
    let roomKey = this.state.currentRoom.key;

    this.props.firebaseService.addMessage(messageBody, createdBy, roomKey);
  }

  handleChangeRoom(room) {
    this.setState({ currentRoom: room });

    this.props.firebaseService.getAllMessagesByRoomKey(room.key, (snapshot) => {
      this.state.messages = this.state.messages.concat(snapshot);
    });
  }

  handleSignIn(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div>
        {(() => {
          if (!this.state.user) {
            return (
              <header>
                <h1>Please sign in to continue!</h1>
                <SignInButton
                  handleSignIn={this.handleSignIn}
                  firebaseService={this.props.firebaseService} />
              </header>
            )
          } else {
            return (
              <header>
                <h1>Welcome, {this.state.user.name}</h1>
              </header>
            );
          }
        })()} 

        {(() => {
          if (this.state.user) {
            return (
              <section>
                <section>
                  <AddRoom handleAddRoom={this.handleAddRoom} />
                  <RoomList 
                    rooms={this.state.rooms}
                    handleChangeRoom={this.handleChangeRoom}
                    firebaseService={this.props.firebaseService} />
                </section>
                <section>
                  {(() => {
                    if (this.state.currentRoom.key) {
                      return (
                        <MessageList
                          messages={this.state.messages}
                          currentRoom={this.state.currentRoom}
                          handleAddMessage={this.handleAddMessage} />
                      )
                    } else {
                      return (<h2>Please select a room!</h2>);
                    }
                  })()}
                </section>
              </section>
            );
          }
        })()}
      </div>
    );
  }
}

ReactDOM.render(
  <App firebaseService={new FirebaseService} />,
  document.getElementById('root')
)
