import { withSSRContext, Auth } from 'aws-amplify'

function SignOutReturn({ authenticated, username }) {
  if (!authenticated) {
    return <h1>Not authenticated</h1>
  }
  return (
    <div>
      <h1>Hello {username} from SSR route!</h1>
    </div>)
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    console.log('user: ', user)
    return {
      props: {
        authenticated: true,
        username: user.username
      }
    }
  } catch (err) {
    console.log('error, user not authenticated')

    // SSR redirect
    // res.writeHead(302, { Location: '/profile' });
    // res.end();
    // non-SSR-redirect
    return {
      props: {
        authenticated: false
      }
    }
  }
}

export default SignOutReturn