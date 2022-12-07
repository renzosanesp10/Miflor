import NavBarc from "../../components/Navbar";


export default function NewSale() {
    return (
        <>
            <NavBarc />
            <h1 style={{ width: "500px", margin: "auto", marginBottom: "20px" }}>Nueva Venta</h1>
            <form style={{ width: "500px", margin: "auto" }}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Nombre del Cliente</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Renzo Sanchez" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Dni</label>
                    <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="71986383" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Fecha de la venta</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="28/11/2022" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Productos seleccionados</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>Huevos</option>
                        <option>leche</option>
                        <option>yogurt</option>
                        <option>Etc...</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Cantidad</label>
                    <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="7 8 10" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Fecha de la Venta</label>
                    <input type="date" className="form-control" id="formGroupExampleInput2" placeholder="11/11/2021" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Monto total en S/.</label>
                    <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="100" />
                </div>
                <div>
                    <button style={{ margin: "auto" }} type="button" className="btn btn-primary mt-3">
                        Registrar venta
                    </button>
                </div>
            </form>
        </>
    )
}