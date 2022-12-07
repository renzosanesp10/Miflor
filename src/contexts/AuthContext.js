import { createContext, useState } from "react"
import firebaseApp from '../firebase/Firebase';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [userData, setUserData] = useState({})
    //let navigate = useNavigate();
    const firestore = getFirestore(firebaseApp);

    async function getAuthentication(uid) {
        const docRef = doc(firestore, "usuarios",uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
        return docSnap.data()
        } else {
            console.log("No such document!");
        }
    }

    return (
        <AuthContext.Provider value={{getAuthentication, userData, setUserData}}>
            {children }
        </AuthContext.Provider>
    )
} 