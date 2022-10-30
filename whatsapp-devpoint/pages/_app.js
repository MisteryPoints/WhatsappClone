import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'
import { auth, db } from '../firebase'
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

  if (loading) return <Loading/> 
  if (!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp


