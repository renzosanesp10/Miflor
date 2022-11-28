import NavBarc from "../../components/Navbar";


export default function NewProd() {
    return (
        <>
            <NavBarc />
            <h1 style={{ width: "500px", margin: "auto", marginBottom: "20px" }}>Agregar Nuevo Producto</h1>
            <form style={{ width: "500px", margin: "auto" }}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Nombre del Producto</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Mantequilla" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Descripcion</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Marca, modelo y detalles" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Stock en unidades</label>
                    <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="14 unidades" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Proveedor</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Alicorp" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Categoria</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Abarrotes" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Precio del producto en S/.</label>
                    <input type="number" className="form-control" id="formGroupExampleInput2" placeholder="5" />
                </div>
                <div>
                    <button style={{display: "flex", justifyContent:"center"}} type="button" className="btn btn-primary mt-3">
                        Registrar producto
                    </button>
                </div>
            </form>
        </>
    )
}