import { useState, useEffect } from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router';


function Test() {
  const [user, setUser] = useState(null);
  const router = useRouter();
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
      .then(data => {
        setUser(null)
        router.push('/')
        console.log('Then Data:', data)
      })
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

export default Test;
