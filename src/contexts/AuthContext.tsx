import { createContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import { firebaseApp } from '../config/firebase'

interface ContextProps {
  userAuth: AuthInfo
}

export const AuthContext = createContext<ContextProps>({} as ContextProps)

interface Props {
  children: React.ReactNode
}

interface AuthInfo {
  uid: string
  name: string
  email: string
  rol: string
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)

  const initialState = {
    uid: '',
    name: '',
    email: '',
    rol: ''
  }

  const [userAuth, setUserAuth] = useState<AuthInfo>(initialState)

  const getUserInfo = async (uid: string) => {
    const docRef = doc(db, 'usuarios', uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid
        /* console.log(user) */
        const data = (await getUserInfo(uid)) as AuthInfo
        /* console.log('DATA', data) */
        if (data) {
          setUserAuth({ ...data, uid })
        }
      } else {
        // User is signed out
        // ...
      }
    })
  }, [])

  console.log('UserAuth', userAuth)

  return (
    <AuthContext.Provider value={{ userAuth }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
