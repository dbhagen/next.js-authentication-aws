import { useState, useEffect } from 'react';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify'

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("User: ", user)
        setUser(user)
      })
      .catch(() => setUser(null))
  }, []);

  const doSignOut = () => {
    Auth.signOut()
      .then(data => console.log('Then Data:',data))
      .catch(err => console.log('Catch Error:', err));
  }
  return (
    <div>
      <button onClick={doSignOut}>Sign Out</button>
      { user && <h1>Welcome, {user.username}</h1> }
      <AmplifySignOut />
    </div>
  )
}

export default withAuthenticator(Profile);
