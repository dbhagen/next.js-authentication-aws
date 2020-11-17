import '../styles/globals.css';
import Link from 'next/link';
import { css } from 'emotion';

import Amplify, { Auth } from 'aws-amplify';
import config from '../src/aws-exports';
Amplify.configure({
  ...config,
  ssr: true
});

export default function MyApp ({ Component, pageProps }) {
  const doSignOutNav = () => {
    Auth.signOut()
      .then(data => console.log('Then Data:',data))
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