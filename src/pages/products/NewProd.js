import React from 'react';
import NavBarc from "../../components/Navbar";
import firebaseApp from "../../firebase/Firebase";
import {getFirestore , doc, setDoc } from "firebase/firestore";


export default async function NewProd() {
    
    /*/const firestore = getFirestore(firebaseApp);

    async function registrarProducto(name, description, stock, supplier, category , price){

    }
        
    
    function submitHandler(e) {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const description = e.target.elements.description.value;
        const stock = e.target.elements.stock.value;
        const supplier = e.target.elements.supplier.value;
        const category = e.target.elements.category.value;
        const price = e.target.elements.price.value;


        console.log("submit", name, description, stock, supplier, category , price);

        registrarProducto(name, description, stock, supplier, category, price);
    }
    /*/
    
    
    return (
        <>
            <NavBarc />
            <h1 style={{ width: "500px", margin: "auto", marginBottom: "20px" }}>Agregar Nuevo Producto</h1>
            <form  style={{ width: "500px", margin: "auto" }}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Nombre del Producto</label>
                    <input type="text" className="form-control" id="name" placeholder="Mantequilla" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Descripcion</label>
                    <input type="text" className="form-control" id="description" placeholder="Marca, modelo y detalles" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Stock en unidades</label>
                    <input type="number" className="form-control" id="stock" placeholder="14 unidades" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Proveedor</label>
                    <input type="text" className="form-control" id="supplier" placeholder="Alicorp" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Categoria</label>
                    <input type="text" className="form-control" id="category" placeholder="Abarrotes" />
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Precio del producto en S/.</label>
                    <input type="number" className="form-control" id="price" placeholder="5" />
                </div>
                <div>
                    <button style={{display: "flex", justifyContent:"center"}} type="submit" className="btn btn-primary mt-3">
                        Registrar producto
                    </button>
                </div>
            </form>
        </>
    )
}