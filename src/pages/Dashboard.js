import NavBarc from "../components/Navbar";

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
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">DNI Cliente</th>
                            <th scope="col">Fecha Realizada</th>
                            <th scope="col">Cant Prod</th>
                            <th scope="col">Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>98989898</td>
                            <td>12/12/22</td>
                            <td>7</td>
                            <td>S/40.00</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}
//<></>
