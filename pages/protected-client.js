import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

function ProtectedClient() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      router.push('/')
      // if there is no authenticated user, redirect to profile page
      .catch(() => router.push('/profile'))
  }, []);
  const doSignOut = () => {
    Auth.signOut()
      .then(data => {
        setUser(null)
        console.log('Then Data:', data)
      })
      .catch(err => console.log('Catch Error:', err));
  }

  if (!user) return null
  return (
    <div>
      <h1>Hello {user.username} from client route!</h1>
      <button onClick={doSignOut}>Sign Out</button>
    </div>
  )
}

export default ProtectedClient