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
    | "eliminar"
    | "dni"
    | "description"
    | "quantity"
    | "totalAmount"
    | "addToCart"
    | "id"
    | "date"
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
interface ProductVentaRow {
  name: React.ReactNode;
  quantity: React.ReactNode;
  eliminar: React.ReactNode;
}
type LineaDeVentaField = "id" | "quantity" | "description" | "product";
type prodVentaField = "name" | "quantity" | "eliminar";
type productField = "name" | "description" | "quantity" | "addToCart";
type ventaField =
  | "id"
  | "date"
  | "quantityOfProducts"
  | "totalAmount"
  | "options";
interface VentaRow {
  id: string;
  dni: string;
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
  dni: string;
  date: string;
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
  dni: "",
  date: new Date().toLocaleDateString(),
  lineasDeVentas: [],
  totalAmount: 0,
  quantityOfProducts: 0,
};

export default function VentasContainer() {
  const [isOpenProductsModal, setIsOpenProductsModal] = useState(false);
  const [isOpenVentaModal, setIsOpenVentaModal] = useState(false);
  const [isShowingProducts, setIsShowingProducts] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsToSelect, setProductsToSelect] = useState<Product[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [ventaToEdit, setVentaToEdit] = useState<Venta>(ventaDefault);
  const [rows, setRows] = useState<VentaRow[]>([]);
  const [productRow, setProductRows] = useState<ProductRow[]>([]);
  const [productSelectedRow, setProductSelectedRow] = useState<
    ProductVentaRow[]
  >([]);
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
    setProductsToSelect(allProducts);
    const rowsFormatted = allProducts.map((u) => createProductRow(u, false));
    setProductRows(rowsFormatted);
    return allProducts;
  };
  const fetchVentas = async (allProducts: Product[]) => {
    const allVentas = await getWholeDocumentByName(db, "ventas");
    const ventasFormatted: Venta[] = allVentas.map((v) => ({
      id: v.id,
      dni: v.dni,
      date: v.fecha,
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
      dni: ventaToEdit.dni,
      fecha: new Date().toLocaleDateString(),
      costoTotal: ventaToEdit.totalAmount,
      lineasDeVenta: ventaToEdit.lineasDeVentas.map((l) => ({
        cantidad: l.quantity,
        id: l.id,
        description: l.description,
        productoID: l.product.id,
      })),
    };
    const docRef = await addDoc(collection(db, "ventas"), newVenta);
    const newVentasArray = [
      ...ventas,
      {
        ...ventaToEdit,
        quantityOfProducts: ventaToEdit.lineasDeVentas.length,
        id: docRef.id,
      },
    ];
    setVentas(newVentasArray);
    const rowsFormatted = newVentasArray.map((u) => createVentaRow(u));
    setRows(rowsFormatted);
    setIsOpenVentaModal(false);
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
            onClick={() => {}}
          >
            <AddIcon />
          </IconButton>
        </Box>
      ) : null,
    };
  };
  const createVentaProductRow = (lv: LineaDeVenta): ProductVentaRow => {
    return {
      name: (
        <FormControl fullWidth sx={{ marginBottom: "8px" }}>
          <Select
            labelId="rol-label"
            id={lv.id}
            value={lv.product.id}
            onChange={({ target: { value } }) =>
              editFieldProductVenta("product", value, lv.id)
            }
          >
            {products.map((p, idx) => (
              <MenuItem key={idx} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      quantity: (
        <TextField
          sx={{ marginBottom: "8px" }}
          id="name"
          type="number"
          variant="outlined"
          value={lv.quantity}
          onChange={({ target: { value } }) =>
            editFieldProductVenta("quantity", value, lv.id)
          }
        />
      ),
      eliminar: (
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <IconButton
            aria-label="add"
            size="large"
            onClick={() => deleteLineaDeVentaDeVenta(lv.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    };
  };
  const deleteLineaDeVentaDeVenta = (lineaDeVentaID: string) => {
    setVentaToEdit((v) => {
      const lineasDeVentaUpdated = v.lineasDeVentas.filter(
        (l) => String(l.id) !== String(lineaDeVentaID)
      );
      const totalAmount = lineasDeVentaUpdated.reduce(
        (amount, value) =>
          Number(value.product.price) * Number(value.quantity) + amount,
        0
      );
      setProductSelectedRow(
        lineasDeVentaUpdated.map((l) => createVentaProductRow(l))
      );
      return { ...v, lineasDeVentas: lineasDeVentaUpdated, totalAmount };
    });
  };
  const createVentaRow = (venta: Venta): VentaRow => {
    return {
      id: venta.id,
      dni: venta.dni,
      totalAmount: "S/. " + String(venta.totalAmount),
      date: venta.date,
      quantityOfProducts: String(venta.quantityOfProducts),
      options: (
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <IconButton
            aria-label="see"
            size="large"
            onClick={() => {
              setIsEdit(true);
              const productsOnly = venta.lineasDeVentas.map((lvc) => ({
                ...lvc.product,
                name: lvc.product.name,
                description: lvc.product.description,
                stock: Number(lvc.quantity),
              }));
              const rowsFormatted = productsOnly.map((u) =>
                createProductRow(u, false)
              );
              setProductRows(rowsFormatted);
              setIsOpenProductsModal(true);
              setIsShowingProducts(true);
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
  const columnsProductsVenta: readonly Column[] = [
    { id: "name", label: "Nombre" },
    { id: "quantity", label: "Cantidad" },
    { id: "eliminar", label: "Eliminar" },
  ];
  const columnsVentas: readonly Column[] = [
    { id: "id", label: "ID" },
    { id: "dni", label: "DNI Cliente" },
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
  const getRandomID = () =>
    String(new Date().getTime()) + String(Math.floor(Math.random() * 1000));
  const addLineVentaToTable = () => {
    const lineDeVentaToAdd = {
      product: products[0],
      description: "",
      id: getRandomID(),
      quantity: "1",
    };
    const lineasDeVentaUpdated = [
      ...ventaToEdit.lineasDeVentas,
      lineDeVentaToAdd,
    ];
    const totalAmount = lineasDeVentaUpdated.reduce(
      (amount, value) =>
        Number(value.product.price) * Number(value.quantity) + amount,
      0
    );
    setVentaToEdit({
      ...ventaToEdit,
      lineasDeVentas: lineasDeVentaUpdated,
      totalAmount,
    });
    setProductSelectedRow(
      lineasDeVentaUpdated.map((l) => createVentaProductRow(l))
    );
  };

  const handleOpenModal = () => {
    setIsOpenVentaModal(true);
    setIsEdit(false);
    setVentaToEdit(ventaDefault);
    setIsShowingProducts(true);
  };
  const editFieldProductVenta = (
    fieldName: LineaDeVentaField,
    newValue: string,
    lineaDeVentaID: string
  ) => {
    setVentaToEdit((v) => {
      let totalAmount = 0;
      const lineasDeVentasUpdated = v.lineasDeVentas.map((l) => {
        let newLine;
        if (lineaDeVentaID !== l.id) {
          totalAmount += l.product.price * Number(l.quantity);
          return l;
        }
        if (fieldName === "product") {
          newLine = {
            ...l,
            [fieldName]: products.find((p) => p.id === newValue) as Product,
          };
        } else {
          newLine = { ...l, [fieldName]: newValue };
        }
        totalAmount += newLine.product.price * Number(newLine.quantity);
        return newLine;
      });
      setProductSelectedRow(
        lineasDeVentasUpdated.map((l) => createVentaProductRow(l))
      );
      return { ...v, lineasDeVentas: lineasDeVentasUpdated, totalAmount };
    });
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
        <FloatingWindow open={isOpenVentaModal} setOpen={setIsOpenVentaModal}>
          <Typography component="h5" variant="h5" marginBottom={2}>
            {isEdit ? "Editar" : "Agregar"}
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              sx={{ marginBottom: "8px", width: "48%" }}
              id="date"
              label="Fecha"
              variant="outlined"
              disabled
              value={new Date().toLocaleDateString()}
            />
            <TextField
              sx={{ marginBottom: "8px", width: "48%" }}
              id="dni"
              label="DNI Cliente"
              variant="outlined"
              onChange={({ target: { value } }) => editField("dni", value)}
              value={ventaToEdit.dni}
            />
          </div>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columnsProductsVenta.map((column) => (
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
                {productSelectedRow.map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {columnsProductsVenta.map((column) => {
                        const value = row[column.id as prodVentaField];
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
          <div
            style={{
              marginTop: "6px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "justify-between",
            }}
          >
            <TextField
              sx={{ width: "48%" }}
              id="totalAmount"
              label="Precio Total"
              variant="outlined"
              value={ventaToEdit.totalAmount}
              disabled
            />
            <Button
              sx={{
                margin: 1,
                width: "48%",
              }}
              size="small"
              variant="contained"
              fullWidth
              onClick={addLineVentaToTable}
            >
              <AddIcon /> Product
            </Button>
          </div>
          <Button variant="contained" fullWidth onClick={addVenta}>
            Guardar
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
