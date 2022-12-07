import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import firebaseApp from '../firebase/Firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { AuthContext } from '../contexts/AuthContext';
const auth = getAuth(firebaseApp);


export default function Login() {
    const {getAuthentication, userData, setUserData} = useContext(AuthContext);
    let navigate = useNavigate();
    const firestore = getFirestore(firebaseApp);

    async function submitHandler(e) {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        console.log("submit", email, password);

        const data = await signInWithEmailAndPassword(auth, email, password);
        console.log(data.user.uid);
        const userInfo= await getAuthentication(data.user.uid);
        setUserData(userInfo);
        console.log(userData);
        if(userData.rol === "Administrador"){
            navigate("/admin-users")
        }
        if(userData.rol === "Ventas"){
            navigate("/dashboard")
        }
        if(userData.rol === "Producción"){
            navigate("/dashboard-products")
        }
    }


    return (
        <>

            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("./fondo.jpg")' }}>
                <div className="d-flex flex-col flex-wrap justify-content-center align-items-center align-content-center bg-white bg-opacity-75 rounded" >
                    <div className="text-center" style={{ height: 'min-content' }}>
                        <h1>Panaderia Mi Flor</h1>
                        <h3>Bienvenidos a la plataforma virtual</h3>
                    </div>

                    <div className="w-100 d-flex justify-content-center mt-4" style={{ height: 'min-content' }}>
                        <form onSubmit={submitHandler} style={{ width: "22rem" }}>

                            <div className="form-outline mb-4">
                                <input type="email" id="email" className="form-control" />
                                <label className="form-label" htmlFor="form2Example1">Correo Electronico</label>
                            </div>


                            <div className="form-outline mb-4">
                                <input type="password" id="password" className="form-control" />
                                <label className="form-label" htmlFor="form2Example2">Contraseña</label>
                            </div>


                            <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Iniciar Sesion</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
} 