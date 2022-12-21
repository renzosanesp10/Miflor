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
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { getWholeDocumentByName } from "../../lib/firebaseHelper";
import { AuthContext } from "../../contexts/AuthContext";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

interface Column {
  id:
    | "name"
    | "description"
    | "quantity"
    | "addToCart"
    | "id"
    | "date"
    | "totalAmount"
    | "quantityOfProducts"
    | "options";
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
type productField = "name" | "description" | "quantity" | "addToCart";
type ventaField =
  | "id"
  | "date"
  | "quantityOfProducts"
  | "totalAmount"
  | "options";
interface VentaRow {
  id: string;
  date: string;
  totalAmount: string;
  quantityOfProducts: string;
  options: React.ReactNode;
}
interface LineaDeVentaFirebase {
  id: string;
  cantidad: string;
  description: string;
  productoID: string;
}
interface LineaDeVenta {
  id: string;
  quantity: string;
  description: string;
  product: Product;
}
interface Venta {
  id: string;
  date: Date;
  totalAmount: number;
  quantityOfProducts: number;
  lineasDeVentas: LineaDeVenta[];
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
const ventaDefault: Venta = {
  id: "",
  date: new Date(),
  lineasDeVentas: [],
  totalAmount: 0,
  quantityOfProducts: 0,
};

export default function VentasContainer() {
  const [isOpenProductsModal, setIsOpenProductsModal] = useState(false);
  const [isOpenVentaModal, setIsOpenVentaModal] = useState(false);
  const [isShowingProducts, setIsShowingProducts] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsToView, setProductsToView] = useState([]);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [ventaToEdit, setVentaToEdit] = useState<Venta>(ventaDefault);
  const [rows, setRows] = useState<VentaRow[]>([]);
  const [productRow, setProductRows] = useState<ProductRow[]>([]);
  const [productToAddInVentaRow, setProductToAddInVentaRows] = useState<
    ProductRow[]
  >([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { db } = useContext(AuthContext);

  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    const products = await fetchProducts();
    fetchVentas(products);
  };
  const fetchProducts = async (): Promise<Product[]> => {
    const allProducts = await getWholeDocumentByName(db, "productos");
    setProducts(allProducts);
    const rowsFormatted = allProducts.map((u) => createProductRow(u));
    setProductRows(rowsFormatted);
    return allProducts;
  };
  const fetchVentas = async (allProducts: Product[]) => {
    const allVentas = await getWholeDocumentByName(db, "ventas");
    console.log("allVentas");
    console.log(allVentas);
    const ventasFormatted: Venta[] = allVentas.map((v) => ({
      id: v.id,
      date: new Date(v.fecha.seconds),
      totalAmount: v.costoTotal,
      quantityOfProducts: v.lineasDeVenta.length,
      lineasDeVentas: v.lineasDeVenta.map((l: LineaDeVentaFirebase) => ({
        id: l.id,
        quantity: l.cantidad,
        description: l.description,
        product: allProducts.find((p) => p.id === l.productoID),
      })),
    }));
    setVentas(ventasFormatted);
    const rowsFormatted = ventasFormatted.map((v) => createVentaRow(v));
    setRows(rowsFormatted);
  };
  const deleteById = async (id: string) => {
    await deleteDoc(doc(db, "ventas", id));
    const newVentasArray = ventas.filter((v) => v.id !== id);
    setVentas(newVentasArray);
    const rowsFormatted = newVentasArray.map((u) => createVentaRow(u));
    setRows(rowsFormatted);
  };
  const addVenta = async () => {
    const newVenta = {
      date: new Date(),
      totalAmount: 0,
      quantityOfProducts: 0,
      lineasDeVentas: [],
    };
    const docRef = await addDoc(collection(db, "venta"), newVenta);
    const newVentasArray = [...ventas, { id: docRef.id, ...newVenta }];
    setVentas(newVentasArray);
    const rowsFormatted = newVentasArray.map((u) => createVentaRow(u));
    setRows(rowsFormatted);
    setOpen(false);
  };
  const updateUser = async () => {
    await setDoc(doc(db, "usuarios", ventaToEdit.id), {
      id: ventaToEdit.id,
      date: ventaToEdit.date,
      totalAmount: 0,
      quantityOfProducts: 0,
      lineasDeVentas: [],
    });
    const newVentasArray = ventas.map((v) =>
      v.id !== ventaToEdit.id
        ? v
        : {
            ...v,
            date: ventaToEdit.date,
            totalAmount: 0,
            quantityOfProducts: 0,
            lineasDeVentas: [],
          }
    );
    setVentas(newVentasArray);
    const rowsFormatted = newVentasArray.map((u) => createVentaRow(u));
    setRows(rowsFormatted);
    setOpen(false);
  };
  const addProductToVenta = (product: Product) => {
    console.log(product);
  };
  const createProductRow = (product: Product, needAdd: boolean): ProductRow => {
    return {
      name: product.name,
      description: product.description,
      quantity: product.stock,
      addToCart: needAdd ? (
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <IconButton
            aria-label="add"
            size="large"
            onClick={() => addProductToVenta(product)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      ) : null,
    };
  };
  const createVentaRow = (venta: Venta): VentaRow => {
    return {
      id: venta.id,
      totalAmount: String(venta.totalAmount),
      date: venta.date.toLocaleString(),
      quantityOfProducts: String(venta.quantityOfProducts),
      options: (
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <IconButton
            aria-label="see"
            size="large"
            onClick={() => {
              setIsEdit(true);
              const prods = venta.lineasDeVentas.map((l) => l.product);
              console.log("prods");
              console.log(prods);
              const rowsFormatted = prods.map((u) =>
                createProductRow(u, false)
              );
              setProductRows(rowsFormatted);
              setIsOpenProductsModal(true);
            }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              deleteById(venta.id);
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
    { id: "addToCart", label: "Añadir", align: "center" },
  ];

  const columnsVentas: readonly Column[] = [
    { id: "id", label: "ID" },
    { id: "date", label: "Fecha" },
    { id: "totalAmount", label: "Total" },
    { id: "quantityOfProducts", label: "# Productos" },
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
    setVentaToEdit(ventaDefault);
  };
  const editField = (fieldName: string, newValue: string) =>
    setVentaToEdit({ ...ventaToEdit, [fieldName]: newValue });

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
            {isShowingProducts ? "Mostrar" : "Agregar"}
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columnsProducts
                    .filter((c) => !(isShowingProducts && c.label === "Añadir"))
                    .map((column) => (
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
                        const value = row[column.id as productField];
                        return (
                          value !== null && (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )
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
            value={ventaToEdit.date}
            fullWidth
          />
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              id="demo-simple-select"
              value={ventaToEdit.id}
              label="Rol"
              onChange={({ target: { value } }) => editField("rol", value)}
            >
              <MenuItem value="item">item</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            onClick={() => (ventaToEdit.id ? updateUser() : addVenta())}
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
                {columnsVentas.map((column) => (
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columnsVentas.map((column) => {
                        const value = row[column.id as ventaField];
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
