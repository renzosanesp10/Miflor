import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button/Button'
import IconButton from '@mui/material/IconButton/IconButton'
import React, { useEffect, useState } from 'react'
import { FloatingWindow } from '../../components/base/FloatingWindow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { firebaseApp } from '../../config/firebase'
import { getFirestore, collection, getDocs, deleteDoc, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";


interface Column {
  id: 'name' | 'description' | 'category' | 'supplier' | 'stock' | 'price' | 'options'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: number) => string
}

interface Data {
  name: string
  description: string
  category: string
  supplier: string
  stock: string
  price: string
  options: React.ReactNode
}

interface Productos {
  category: string
  description: string
  name: string
  price: number
  stock: number
  supplier: string

}

interface Iprops{
  producto: Productos
}



export const ProductLists = ({producto} :Iprops) => {

  //const [productos, setProductos] = useState<Productos[]>([]);
  //const firestore = getFirestore(firebaseApp);
  //const productsCollection = collection(firestore, 'productos');

/*/
  useEffect(() =>
    onSnapshot(productsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      setProductos(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    }),
    []
  );

  console.log(productos, "productos")
/*/

  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [age, setAge] = useState('')

  function createData(name: string,
    description: string,
    category: string,
    supplier: string,
    stock: string,
    price: string): Data {
    return {
      name,
      description,
      category,
      supplier,
      stock,
      price,
      options: (
        <Box sx={{ display: 'inline-flex', gap: '10px' }}>
          <IconButton
            aria-label='edit'
            size='large'
            onClick={() => {
              setOpen(true)
              setIsEdit(true)
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label='delete' size='large'>
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  }

  const rows = [
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('Mantequilla', 'Mantequilla gloria', 'Abarrotes', 'Grupo Jorama', '7', '3.5'),
    createData('China', 'CN', 'Ventas', '', '', ''),
  
  ]

  const columns: readonly Column[] = [
    { id: 'name', label: 'Nombre del Producto' },
    { id: 'description', label: 'Descripcion' },
    { id: 'category', label: 'Categoria' },
    { id: 'supplier', label: 'Proveedores' },
    { id: 'stock', label: 'Existencias' },
    { id: 'price', label: 'Precio' },
    { id: 'options', label: 'Opciones', align: 'center' }
  ]

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOpenModal = () => {
    setOpen(true)
    setIsEdit(false)
  }

  return (
    <>
      <Box sx={{
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      >
        <Button variant='contained' onClick={handleOpenModal}>
          Agregar Producto
        </Button>
        <FloatingWindow open={open} setOpen={setOpen}>
          <Typography component='h5' variant='h5' marginBottom={2}>
            {isEdit ? 'Editar' : 'Agregar'}
          </Typography>
          <TextField
            sx={{ marginBottom: '8px' }}
            id='name'
            label='Nombre del Producto'
            variant='outlined'

            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px' }}
            id='description'
            label='Descripcion'
            variant='outlined'
            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px' }}
            id='category'
            label='Categoria'
            variant='outlined'
            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px' }}
            id='supplier'
            label='Proveedor'
            variant='outlined'
            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px' }}
            id='stock'
            label='Existencias'
            variant='outlined'
            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px' }}
            id='password'
            type='password'
            label='Precio'
            variant='outlined'
            fullWidth
          />
          <Button variant='contained' fullWidth>
            Agregar
          </Button>
        </FloatingWindow>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
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
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                    >
                      {columns.map(column => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}
