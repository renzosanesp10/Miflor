import NavBarc from "../../components/Navbar";

import firebaseApp from '../../firebase/Firebase';
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);


export default function User() {

    return (
        <>
            <NavBarc />
            <h3>Que tenga un buen día Usuario</h3>
            <div className="d-flex justify-content-end">
                <button onClick={() => signOut(auth)} type="button" className="btn btn-primary btn-block mb-4 w-100">Cerrar Sesion</button>
                <button type="button" className="btn btn-primary">
                    Registrar Usuario Nuevo
                </button>
            </div>
            <table className="table" style={{ width: "900px", margin: "auto" }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Empleado</th>
                        <th scope="col">Correo Electronico</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Contraseña</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">01</th>
                        <td>Renzo Sanchez</td>
                        <td>renzosanesp@gmail.com</td>
                        <td>Administrador</td>
                        <td>**********</td>
                    </tr>

                </tbody>

            </table>
        </>
    )
}