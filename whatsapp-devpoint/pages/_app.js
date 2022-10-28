import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { serverTimestamp, collection, setDoc, doc } from 'firebase/firestore'
import Login from './login'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth) 

  useEffect(() => {
    if (user) {
      const userInfo = collection(db, 'users')
      setDoc(doc(userInfo, user.uid), 
        {
          name: user.displayName,
          email: user.email,
          lastSeen:  serverTimestamp(),
          photoURL: user.photoURL
        },
        { merge: true }
      ) 
    }
  }, [user])

  if (loading) return <Loading/> 
  if (!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp


