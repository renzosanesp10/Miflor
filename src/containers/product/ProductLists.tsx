import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button/Button";
import IconButton from "@mui/material/IconButton/IconButton";
import React, { useContext, useEffect, useState } from "react";
import { FloatingWindow } from "../../components/base/FloatingWindow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getWholeDocumentByName } from "../../lib/firebaseHelper";
import { firebaseApp } from "../../config/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";

interface Column {
  id:
    | "name"
    | "description"
    | "category"
    | "supplier"
    | "stock"
    | "price"
    | "options";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

interface Data {
  name: string;
  description: string;
  category: string;
  supplier: string;
  stock: string;
  price: string;
  options: React.ReactNode;
}

interface Producto {
  id: string;
  category: string;
  description: string;
  name: string;
  price: string;
  stock: string;
  supplier: string;
}
interface Supplier {
  id: string;
  phone: string;
  email: string;
  name: string;
  supplierName: string;
}
const productDefault = {
  id: "",
  name: "",
  description: "",
  category: "",
  supplier: "",
  stock: "",
  price: "",
};

export const ProductLists = () => {
  const [product, setProducts] = useState<Producto[]>([]);
  const [productToEdit, setProductToEdit] = useState<Producto>(productDefault);
  const { db } = useContext(AuthContext);
  const [rows, setRows] = useState<Data[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [age, setAge] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteById = async (id: string) => {
    await deleteDoc(doc(db, "productos", id));
    const newProductArray = product.filter((p) => p.id !== id);
    setProducts(newProductArray);
    const rowsFormatted = newProductArray.map((p) => createData(p));
    setRows(rowsFormatted);
  };

  const addProduct = async () => {
    const newProduct = {
      name: productToEdit.name,
      description: productToEdit.description,
      category: productToEdit.category,
      supplier: productToEdit.supplier,
      stock: productToEdit.stock,
      price: productToEdit.price,
    };
    const docRef = await addDoc(collection(db, "productos"), newProduct);
    const newProductArray = [...product, { id: docRef.id, ...newProduct }];
    setProducts(newProductArray);
    const rowsFormatted = newProductArray.map((p) => createData(p));
    setRows(rowsFormatted);
    setOpen(false);
  };

  const fetchProducts = async () => {
    const allProducts = await getWholeDocumentByName(db, "productos");
    const allSuppliers = await getWholeDocumentByName(db, "proveedor");
    console.log("allSuppliers");
    console.log(allSuppliers);
    const productsFormatted: Producto[] = allProducts.map((p) => {
      console.log("product");
      console.log(p);
      const supplier =
        allSuppliers.find((s) => s.id === p.supplier)?.supplierName ||
        "not found";
      console.log("supplier");
      console.log(supplier);
      return { ...p, supplier };
    });
    setProducts(productsFormatted);
    setSuppliers(
      allSuppliers.map((s) => ({
        id: s.id,
        phone: s.Telefono,
        email: s.email,
        name: s.name,
        supplierName: s.supplierName,
      }))
    );
    const rowsFormatted = productsFormatted.map((u) => createData(u));
    setRows(rowsFormatted);
  };

  const updateProduct = async () => {
    await setDoc(doc(db, "productos", productToEdit.id), {
      name: productToEdit.name,
      description: productToEdit.description,
      category: productToEdit.category,
      supplier:
        suppliers.find(
          (s) =>
            s.id === productToEdit.supplier ||
            s.supplierName === productToEdit.supplier
        )?.id ?? "not found",
      stock: productToEdit.stock,
      price: productToEdit.price,
    });
    const newProductArray = product.map((p) =>
      p.id !== productToEdit.id
        ? p
        : {
            ...p,
            name: productToEdit.name,
            description: productToEdit.description,
            category: productToEdit.category,
            supplier:
              suppliers.find(
                (s) =>
                  s.id === productToEdit.supplier ||
                  s.supplierName === productToEdit.supplier
              )?.supplierName ?? "not found",
            stock: productToEdit.stock,
            price: productToEdit.price,
          }
    );
    setProducts(newProductArray);
    const rowsFormatted = newProductArray.map((p) => createData(p));
    setRows(rowsFormatted);
    setOpen(false);
  };

  const createData = (products: Producto): Data => {
    return {
      name: products.name,
      description: products.description,
      category: products.category,
      supplier: products.supplier,
      stock: products.stock,
      price: products.price,
      options: (
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              setOpen(true);
              setIsEdit(true);
              setProductToEdit(products);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              deleteById(products.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    };
  };

  const columns: readonly Column[] = [
    { id: "name", label: "Nombre del Producto" },
    { id: "description", label: "Descripcion" },
    { id: "category", label: "Categoria" },
    { id: "supplier", label: "Proveedores" },
    { id: "stock", label: "Existencias" },
    { id: "price", label: "Precio" },
    { id: "options", label: "Opciones", align: "center" },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const editField = (fieldName: string, newValue: string) =>
    setProductToEdit({ ...productToEdit, [fieldName]: newValue });

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
          Agregar Producto
        </Button>
        <FloatingWindow open={open} setOpen={setOpen}>
          <Typography component="h5" variant="h5" marginBottom={2}>
            {isEdit ? "Editar" : "Agregar"}
          </Typography>
          <TextField
            sx={{ marginBottom: "8px" }}
            id="name"
            label="Nombre del Producto"
            variant="outlined"
            onChange={({ target: { value } }) => editField("name", value)}
            value={productToEdit.name}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            id="description"
            label="Descripcion"
            variant="outlined"
            onChange={({ target: { value } }) =>
              editField("description", value)
            }
            value={productToEdit.description}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            id="category"
            label="Categoria"
            variant="outlined"
            onChange={({ target: { value } }) => editField("category", value)}
            value={productToEdit.category}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            id="supplier"
            label="Proveedor"
            variant="outlined"
            onChange={({ target: { value } }) => editField("supplier", value)}
            value={productToEdit.supplier}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            id="stock"
            label="Existencias"
            variant="outlined"
            onChange={({ target: { value } }) => editField("stock", value)}
            value={productToEdit.stock}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            id="price"
            type="text"
            label="Precio"
            variant="outlined"
            onChange={({ target: { value } }) => editField("price", value)}
            value={productToEdit.price}
            fullWidth
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => (productToEdit.id ? updateProduct() : addProduct())}
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
                    <TableRow hover role="checkbox" tabIndex={-1}>
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
};
