import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from "@mui/material";
import { FloatingWindow } from "../../components/base/FloatingWindow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { getWholeDocumentByName } from "../../lib/firebaseHelper";
import { AuthContext } from "../../contexts/AuthContext";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

interface Column {
  id: "name" | "email" | "rol" | "options" | "description" | "quantity";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

interface ProductRow {
  name: string;
  description: string;
  quantity: number;
  addToCart?: React.ReactNode;
}
interface Data {
  name: string;
  email: string;
  rol: string;
  options: React.ReactNode;
}
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
}
interface User {
  id: string;
  name: string;
  email: string;
  rol: string;
}
interface Rol {
  id: string;
  rol: string;
}
const userDefault = {
  id: "",
  name: "",
  email: "",
  rol: "",
};

export default function VentasContainer() {
  const [isOpenProductsModal, setIsOpenProductsModal] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User>(userDefault);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [password, setPassword] = useState();
  const [rows, setRows] = useState<Data[]>([]);
  const [productRow, setProductRows] = useState<ProductRow[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { db } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const allProducts = await getWholeDocumentByName(db, "productos");
    setProducts(allProducts);
    const rowsFormatted = allProducts.map((u) => createProductRow(u));
    setProductRows(rowsFormatted);
  };
  const fetchUsers = async () => {
    const allUsers = await getWholeDocumentByName(db, "usuarios");
    const allRoles = await getWholeDocumentByName(db, "roles");
    const usersFormatted: User[] = allUsers.map((u) => {
      const rol = allRoles.find((r) => r.id === u.rol).rol || "not found";
      return { ...u, rol };
    });
    setRoles(allRoles);
    setUsers(usersFormatted);
    const rowsFormatted = usersFormatted.map((u) => createData(u));
    setRows(rowsFormatted);
  };
  const deleteById = async (id: string) => {
    await deleteDoc(doc(db, "usuarios", id));
    const newUsersArray = users.filter((u) => u.id !== id);
    setUsers(newUsersArray);
    const rowsFormatted = newUsersArray.map((u) => createData(u));
    setRows(rowsFormatted);
  };
  const getRolByNameFromAllRoles = (rol: string) =>
    roles.find((r) => r.rol === rol)?.id ?? "";
  const addUser = async () => {
    const newUser = {
      name: userToEdit.name,
      email: userToEdit.email,
      rol: getRolByNameFromAllRoles(userToEdit.rol),
    };
    const docRef = await addDoc(collection(db, "usuarios"), newUser);
    const newUsersArray = [
      ...users,
      { id: docRef.id, ...newUser, rol: userToEdit.rol },
    ];
    setUsers(newUsersArray);
    const rowsFormatted = newUsersArray.map((u) => createData(u));
    setRows(rowsFormatted);
    setOpen(false);
  };
  const updateUser = async () => {
    await setDoc(doc(db, "usuarios", userToEdit.id), {
      name: userToEdit.name,
      email: userToEdit.email,
      rol: getRolByNameFromAllRoles(userToEdit.rol),
    });
    const newUsersArray = users.map((u) =>
      u.id !== userToEdit.id
        ? u
        : {
            ...u,
            name: userToEdit.name,
            email: userToEdit.email,
            rol: userToEdit.rol,
          }
    );
    setUsers(newUsersArray);
    const rowsFormatted = newUsersArray.map((u) => createData(u));
    setRows(rowsFormatted);
    setOpen(false);
  };

  const addProductToVenta = (product: Product) => {
    console.log(product);
  };

  const createProductRow = (product: Product): ProductRow => {
    return {
      name: product.name,
      description: product.description,
      quantity: product.stock,
      addToCart: (
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => addProductToVenta(product)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      ),
    };
  };
  const createData = (user: User): Data => {
    return {
      name: user.name,
      email: user.email,
      rol: user.rol,
      options: (
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              setOpen(true);
              setIsEdit(true);
              setUserToEdit(user);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              deleteById(user.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    };
  };

  const columnsProducts: readonly Column[] = [
    { id: "name", label: "Nombre" },
    { id: "description", label: "Descripción" },
    { id: "quantity", label: "Cantidad" },
  ];

  const columns: readonly Column[] = [
    { id: "name", label: "Nombre" },
    { id: "email", label: "Correo" },
    { id: "rol", label: "Rol" },
    { id: "options", label: "Opciones", align: "center" },
  ];

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpen(true);
    setIsEdit(false);
    setUserToEdit(userDefault);
  };
  const editField = (fieldName: string, newValue: string) =>
    setUserToEdit({ ...userToEdit, [fieldName]: newValue });

  return (
    <>
      <Box
        sx={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={handleOpenModal}>
          Agregar
        </Button>
        <FloatingWindow
          open={isOpenProductsModal}
          setOpen={setIsOpenProductsModal}
        >
          <Typography component="h5" variant="h5" marginBottom={2}>
            {isEdit ? "Editar" : "Agregar"}
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columnsProducts.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {productRow.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      {columnsProducts.map((column) => {
                        const value = columnsProducts[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </FloatingWindow>
        <FloatingWindow open={open} setOpen={setOpen}>
          <Typography component="h5" variant="h5" marginBottom={2}>
            {isEdit ? "Editar" : "Agregar"}
          </Typography>
          <TextField
            sx={{ marginBottom: "8px" }}
            id="name"
            label="Nombre"
            variant="outlined"
            onChange={({ target: { value } }) => editField("name", value)}
            value={userToEdit.name}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            id="email"
            label="Correo"
            variant="outlined"
            disabled={isEdit}
            onChange={({ target: { value } }) => editField("email", value)}
            value={userToEdit.email}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            id="password"
            type="password"
            disabled={isEdit}
            label="Contraseña"
            value={isEdit ? "......." : password}
            variant="outlined"
            fullWidth
          />
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              id="demo-simple-select"
              value={userToEdit.rol}
              label="Rol"
              onChange={({ target: { value } }) => editField("rol", value)}
            >
              {roles.map((r, i) => (
                <MenuItem value={r.rol} key={i}>
                  {r.rol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            onClick={() => (userToEdit.id ? updateUser() : addUser())}
          >
            {isEdit ? "Editar" : "Agregar"}
          </Button>
        </FloatingWindow>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.email}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}