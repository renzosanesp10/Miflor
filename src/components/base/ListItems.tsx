import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";

const MainListItems = ({ rol }: { rol: string }) => (
  <>
    {rol === "Admin" && (
      <Link href="/" style={{ textDecoration: "none", color: "#666F88" }}>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItemButton>
      </Link>
    )}
    {rol === "Admin" && (
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItemButton>
    )}
    {["Production", "Admin"].includes(rol) && (
      <Link
        href="/productos"
        style={{ textDecoration: "none", color: "#666F88" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Productos" />
        </ListItemButton>
      </Link>
    )}
    {["Seller", "Admin"].includes(rol) && (
      <Link href="/ventas" style={{ textDecoration: "none", color: "#666F88" }}>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Ventas" />
        </ListItemButton>
      </Link>
    )}
  </>
);
export default MainListItems;
