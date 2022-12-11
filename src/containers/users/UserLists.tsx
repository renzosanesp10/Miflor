import { useState } from 'react'
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
  IconButton
} from '@mui/material'
import { FloatingWindow } from '../../components/base/FloatingWindow'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

interface Column {
  id: 'name' | 'email' | 'role' | 'options'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: number) => string
}

interface Data {
  name: string
  email: string
  role: string
  options: React.ReactNode
}

export const UserLists = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [age, setAge] = useState('')

  function createData (name: string, email: string, role: string): Data {
    return {
      name,
      email,
      role,
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
    createData('India', 'IN', 'Admin'),
    createData('China', 'CN', 'Ventas'),
    createData('Italy', 'IT', 'Ventas'),
    createData('United States', 'US', 'Producción'),
    createData('Canada', 'CA', 'Producción'),
    createData('Australia', 'AU', 'Producción'),
    createData('Germany', 'DE', 'Producción'),
    createData('Ireland', 'IE', 'Producción'),
    createData('Mexico', 'MX', 'Producción'),
    createData('Japan', 'JP', 'Ventas'),
    createData('France', 'FR', 'Ventas'),
    createData('United Kingdom', 'GB', 'Ventas'),
    createData('Russia', 'RU', 'Ventas'),
    createData('Nigeria', 'NG', 'Ventas'),
    createData('Brazil', 'BR', 'Producción')
  ]

  const columns: readonly Column[] = [
    { id: 'name', label: 'Nombre' },
    { id: 'email', label: 'Correo' },
    { id: 'role', label: 'Rol' },
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
      <Box
        sx={{
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button variant='contained' onClick={handleOpenModal}>
          Agregar
        </Button>
        <FloatingWindow open={open} setOpen={setOpen}>
          <Typography component='h5' variant='h5' marginBottom={2}>
            {isEdit ? 'Editar' : 'Agregar'}
          </Typography>
          <TextField
            sx={{ marginBottom: '8px' }}
            id='name'
            label='Nombre'
            variant='outlined'
            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px' }}
            id='email'
            label='Correo'
            variant='outlined'
            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px' }}
            id='password'
            type='password'
            label='Contraseña'
            variant='outlined'
            fullWidth
          />
          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <InputLabel id='role-label'>Age</InputLabel>
            <Select
              labelId='role-label'
              id='demo-simple-select'
              value={age}
              label='Age'
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' fullWidth>
            gregar
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
                      key={row.email}
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
