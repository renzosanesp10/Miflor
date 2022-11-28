import NavBarc from "../../components/Navbar";

export default function Dashboard() {
    return (
        <>
            <NavBarc />
            <div className="px-3">
                <h3>Que tenga un buen día Usuario</h3>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary">
                        Registrar pedido
                    </button>
                </div>
                <table className="table" style={{ width: "900px", margin: "auto" }}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">DNI Cliente</th>
                            <th scope="col">Productos Seleccionados</th>
                            <th scope="col">Cant Prod</th>
                            <th scope="col">Fecha de la Venta</th>
                            <th scope="col">Monto Total en S/.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Gladys Melchor</td>
                            <td>98989898</td>
                            <td>Huevos, Yogurt, Leche</td>
                            <td>7 8 10</td>
                            <td>12/12/22</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Gladys Melchor</td>
                            <td>98989898</td>
                            <td>Huevos, Yogurt, Leche</td>
                            <td>7 8 10</td>
                            <td>12/12/22</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Gladys Melchor</td>
                            <td>98989898</td>
                            <td>Huevos, Yogurt, Leche</td>
                            <td>7 8 10</td>
                            <td>12/12/22</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Gladys Melchor</td>
                            <td>98989898</td>
                            <td>Huevos, Yogurt, Leche</td>
                            <td>7 8 10</td>
                            <td>12/12/22</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Gladys Melchor</td>
                            <td>98989898</td>
                            <td>Huevos, Yogurt, Leche</td>
                            <td>7 8 10</td>
                            <td>12/12/22</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Gladys Melchor</td>
                            <td>98989898</td>
                            <td>Huevos, Yogurt, Leche</td>
                            <td>7 8 10</td>
                            <td>12/12/22</td>
                            <td>S/40.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
//<></>
