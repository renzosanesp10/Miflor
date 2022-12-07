import React, {useState, useEffect} from "react";

import firebaseApp from "../../firebase/Firebase";
import { getFirestore, collection, getDocs, deleteDoc} from "firebase/firestore";
import NavBarc from "../../components/Navbar";


export default function Dashboardprod(){
    const firestore = getFirestore(firebaseApp);

    const [productos, setProductos] = useState( [] )

    const productsCollection = collection(firestore, "productos")

    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        setProductos(
            data.docs.map( (doc) => ( {...doc.data(), id: doc.uid}))
        )
        console.log(productos)
    }
    
    useEffect( () =>{
        getProducts()
    }, [])
    

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
                <table className="table" style={{ width: "1000px", margin: "auto" }}>
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
                        { productos.map((product =>{
                            <tr key={product.uid} >
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>{product.supplier}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                            </tr>
                        })) }
                    </tbody>
                </table>
            </div>
        </>
    )
}