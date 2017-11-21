import React from 'react';

export default function(props) {
  let handleSignIn = () => {
    props.firebaseService.signIn(props.handleSignIn);
  }

  return (
    <button onClick={handleSignIn}>Sign in with Google</button>
  );
}
