import NavBarc from "../../components/Navbar";

export default function Dashboardprod(){
    return(
        <>
        <NavBarc />
        <div className="px-3">
                <h3>Que tenga un buen día Usuario</h3>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary">
                        Registrar producto
                    </button>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre Producto</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Stock en U</th>
                            <th scope="col">Proveedores</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Leche</td>
                            <td>Leche deslactosada marca Gloria </td>
                            <td>20</td>
                            <td>Gloria</td>
                            <td>Abarrotes</td>
                            <td>S/ 4.50</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Leche</td>
                            <td>Leche deslactosada marca Gloria </td>
                            <td>20</td>
                            <td>Gloria</td>
                            <td>Abarrotes</td>
                            <td>S/ 4.50</td>
                        </tr><tr>
                            <th scope="row">1</th>
                            <td>Leche</td>
                            <td>Leche deslactosada marca Gloria </td>
                            <td>20</td>
                            <td>Gloria</td>
                            <td>Abarrotes</td>
                            <td>S/ 4.50</td>
                        </tr><tr>
                            <th scope="row">1</th>
                            <td>Leche</td>
                            <td>Leche deslactosada marca Gloria </td>
                            <td>20</td>
                            <td>Gloria</td>
                            <td>Abarrotes</td>
                            <td>S/ 4.50</td>
                        </tr><tr>
                            <th scope="row">1</th>
                            <td>Leche</td>
                            <td>Leche deslactosada marca Gloria </td>
                            <td>20</td>
                            <td>Gloria</td>
                            <td>Abarrotes</td>
                            <td>S/ 4.50</td>
                        </tr><tr>
                            <th scope="row">1</th>
                            <td>Leche</td>
                            <td>Leche deslactosada marca Gloria </td>
                            <td>20</td>
                            <td>Gloria</td>
                            <td>Abarrotes</td>
                            <td>S/ 4.50</td>
                        </tr><tr>
                            <th scope="row">1</th>
                            <td>Leche</td>
                            <td>Leche deslactosada marca Gloria </td>
                            <td>20</td>
                            <td>Gloria</td>
                            <td>Abarrotes</td>
                            <td>S/ 4.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}