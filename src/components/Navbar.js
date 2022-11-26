

const NavBarc = () => {
    return (
        <>
            <nav class="navbar navbar-expand justify-content-between px-3" style={{backgroundColor: "#e3f2fd"}}>
                <a class="navbar-brand" href="#">Panaderia MiFlor</a>
                    <div class="navbar-nav flex flex-row">
                        <a class="nav-item nav-link active" href="#">Inicio <span class="sr-only">(current)</span></a>
                        <a class="      nav-item nav-link" href="#">Nuevo Pedido</a>
                        <a class="nav-item nav-link" href="#">Pedidos Personalizado</a>
                    </div>
            </nav>
        </>
    )
}
export default NavBarc