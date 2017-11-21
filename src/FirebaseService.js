import * as firebase from 'firebase';
export default class FirebaseService { constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyB1UskcV422Wi7DQI_NgfALDCE-iKKk9ek",
      authDomain: "blocchat-react.firebaseapp.com",
      databaseURL: "https://blocchat-react.firebaseio.com", projectId: "blocchat-react",
      storageBucket: "",
      messagingSenderId: "377660859028"
    });

    this.roomsRef = firebase.database().ref('rooms');
    this.messagesRef = firebase.database().ref('messages');
  }

  getAllMessagesByRoomKey(roomKey, callback) {
    return this.messagesRef.orderByChild("roomKey").equalTo(roomKey).on("child_added", (snapshot) => {
      var obj = Object.assign({ key: snapshot.key }, snapshot.val());
      callback(obj);
    });
  }

  onRoomAdded(callback) {
    this.roomsRef.on('child_added', (snapshot) => {
      var obj = Object.assign({ key: snapshot.key }, snapshot.val());
      callback(obj);
    });
  }

  onMessageAdded(callback) {
    this.messagesRef.on('child_added', (snapshot) => {
      var obj = Object.assign({ key: snapshot.key }, snapshot.val());
      callback(obj);
    });
  }

  onRoomDeleted(callback) {
    this.roomsRef.on('child_removed', (snapshot) => callback(snapshot));
  }

  addRoom(roomName) {
    this.roomsRef.push({ name: roomName });
  }

  addMessage(messageBody, createdBy, roomKey) {
    this.messagesRef.push({ body: messageBody, createdBy: createdBy, roomKey: roomKey });
  }

  deleteRoom(roomId) {
    this.roomsRef.child(roomId).remove();
  }

  signIn(callback) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) =>{
      let user = {
        name: result.additionalUserInfo.profile.name
      };

      callback(user);
    });
  }
}
