import NavBarc from "../../components/Navbar";
import React, {useState} from "react";

import firebaseApp from "../../firebase/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore , doc, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);


export default function NewUser() {

    const firestore = getFirestore(firebaseApp);

    async function registrarUsuario(email, password, name, rol) {
        const infoUsuario = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
            ).then((usuarioFirebase) => {
                return usuarioFirebase
            });

            console.log(infoUsuario.user.uid);
            const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
            setDoc(docuRef, {name: name, email: email, rol: rol});    
    }

    function submitHandler(e) {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const rol = e.target.elements.rol.value;
        const password = e.target.elements.password.value;

        console.log("submit", name, email, rol, password);

        registrarUsuario(email, password, name, rol);
    }

    return (
        <>
            <NavBarc />
            <h1 style={{ width: "500px", margin: "auto", marginBottom: "20px" }}>Nuevo Usuario</h1>
            <form onSubmit={submitHandler} style={{ width: "500px", margin: "auto" }}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Nombre del Empleaddo</label>
                    <input type="text" className="form-control" id="name" placeholder="Renzo Sanchez" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Correo Electronico</label>
                    <input type="email" className="form-control" id="email" placeholder="renzosanesp@gmail.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Rol</label>
                    <select className="form-control" id="rol">
                        <option>Administrador</option>
                        <option>Ventas</option>
                        <option>Produccion</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Contraseña</label>
                    <input type="password" className="form-control" id="password" placeholder="********" />
                </div>
                <div>
                    <button style={{ margin: "auto" }} type="submit" className="btn btn-primary mt-3">
                        Registrar Nuevo Usuario
                    </button>
                </div>
            </form>
        </>
    )

}