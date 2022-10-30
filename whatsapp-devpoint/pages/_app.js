import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Fragment, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'
import { auth, db } from '../firebase'
import GlobalStyle from '../theme/globalStyles'
import Login from './login'

function MyApp({ Component, pageProps }) {
  const [user, loading, error ] = useAuthState(auth) 

  useEffect(() => {
    if (user) {  
      const userInfo = collection(db, 'users') 

      setDoc(doc(userInfo, user.uid),{
          name: user.displayName,
          email: user.email,
          lastSeen:  serverTimestamp(),
          photoURL: user.photoURL
        },
        { merge: true } //update files if exist
      ) 
    }
  }, [user])

  if (loading) return (
    <Fragment> 
      <GlobalStyle/>
      <Loading/> 
    </Fragment>
  )
  if (!user) return ( 
    <Fragment> 
      <GlobalStyle/>
      <Login/>
    </Fragment>
  )

  return ( 
    <Fragment> 
      <GlobalStyle/>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp


