

const NavBarc = () => {

    return (
        <>
            <nav className="navbar navbar-expand justify-content-between px-3" style={{backgroundColor: "#e3f2fd"}}>
                <a className="navbar-brand" href="#">Panaderia MiFlor</a>
                    <div className="navbar-nav flex flex-row">
                        <a className="nav-item nav-link active" href="#">Inicio <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="#">Nuevo Pedido</a>
                        <a className="nav-item nav-link" href="#">Pedidos Personalizado</a>
                    </div>
            </nav>
        </>
    )
}
export default NavBarc