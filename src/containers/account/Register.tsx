import React from 'react'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Link,
    Box,
    Grid
} from '@mui/material'
import { Copyright } from '../../components/base/Copyright'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddOutlined from '@mui/icons-material/PersonAddOutlined';
import { Firestore } from 'firebase/firestore';


const theme = createTheme();

const roles = [
    {
        label: 'Administrador'
    },
    {
        label: 'Produccion'
    },
    {
        label: 'Ventas'
    }
];

export const Register = () => {
    const [rol, setRol] = React.useState('Ventas')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRol(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src="/broken-image.jpg">
                        <PersonAddOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    <Box component="form" /*/onSubmit={handleSubmit}/*/ noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo Electronico"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="rol"
                                required
                                fullWidth
                                select
                                margin="normal"
                                name="rol"
                                label="Seleccionar"
                                value={rol}
                                onChange={handleChange}
                                helperText="Porfavor seleccionar el Rol"
                            >
                                {roles.map((option) => (
                                    <option>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrarse
                        </Button>
                        <Grid container>
                            <Link href="#" variant="body2">
                                {"¿Ya tienees una cuenta? Inicia Sesion"}
                            </Link>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>

    )
}


