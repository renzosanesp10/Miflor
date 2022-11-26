import React from 'react';
import { Link } from 'react-router-dom';


export default function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("./fondo.jpg")' }}>
            <div className="d-flex flex-col flex-wrap justify-content-center align-items-center align-content-center bg-white bg-opacity-75 rounded" >
                <div className="text-center" style={{ height: 'min-content' }}>
                    <h1>Panaderia Mi Flor</h1>
                    <h3>Bienvenidos a la plataforma virtual</h3>
                </div>

                <div className="w-100 d-flex justify-content-center mt-4" style={{ height: 'min-content' }}>
                    <form style={{ width: "22rem" }}>

                        <div className="form-outline mb-4">
                            <input type="email" id="form2Example1" className="form-control" />
                            <label className="form-label" htmlFor="form2Example1">Correo Electronico</label>
                        </div>


                        <div className="form-outline mb-4">
                            <input type="password" id="form2Example2" className="form-control" />
                            <label className="form-label" htmlFor="form2Example2">Contraseña</label>
                        </div>

                        <Link to="/dashboard"><button type="button" className="btn btn-primary btn-block mb-4 w-100">Iniciar Sesion</button></Link>
                    </form>
                </div>
            </div>
        </div>
    )
} 