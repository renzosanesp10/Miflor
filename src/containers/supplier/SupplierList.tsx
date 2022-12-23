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
  id: "name" | "email" | "supplierName" | "phone";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

interface Data {
  name: string;
  email: string;
  supplierName: string;
  phone: string;
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
  Telefono: string;
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

export const SupplierList = () => {
  const [product, setProducts] = useState<Producto[]>([]);
  const { db } = useContext(AuthContext);
  const [rows, setRows] = useState<Data[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const allSuppliers = await getWholeDocumentByName(db, "proveedor");
    setProducts(allSuppliers);
    const rowsFormatted = allSuppliers.map((u) => createData(u));
    setRows(rowsFormatted);
  };
  const createData = (supplier: Supplier): Data => {
    return {
      name: supplier.name,
      supplierName: supplier.supplierName,
      email: supplier.email,
      phone: supplier.Telefono,
    };
  };

  const columns: readonly Column[] = [
    { id: "supplierName", label: "Proveedor" },
    { id: "name", label: "Nombre" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Telefono" },
  ];
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
