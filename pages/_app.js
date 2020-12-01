import { useState } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { css } from 'emotion';

import Amplify, { Auth } from 'aws-amplify';
import config from '../src/aws-exports';
// config.oauth.redirectSignIn = 'http://localhost:3000/'
// config.oauth.redirectSignOut = 'http://localhost:3000/'
Amplify.configure({
  ...config,
  ssr: true
});

export default function MyApp ({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const doSignOutNav = () => {
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
      <nav className={navStyle}>
        <Link href="/">
          <span className={linkStyle}>Home</span>
        </Link>
        <Link href="/profile">
          <span className={linkStyle}>Profile</span>
        </Link>
        <Link href="/protected">
          <span className={linkStyle}>Protected SSR route</span>
        </Link>
        <Link href="/protected-client">
          <span className={linkStyle}>Protected Client</span>
        </Link>
        <Link href="/test">
          <span className={linkStyle}>Test Auth Return</span>
        </Link>
        <button onClick={doSignOutNav}>
          Sign Out
        </button>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

const linkStyle = css`
  margin-right: 20px;
  cursor: pointer;
`

const navStyle = css`
  display: flex;
  padding: 30px;
  border-bottom: 1px solid #ddd;
`