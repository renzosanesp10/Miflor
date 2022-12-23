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
import { firebaseApp } from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore , doc, setDoc, Firestore } from "firebase/firestore";
const auth = getAuth(firebaseApp);

const theme = createTheme();
const roles = [
    {
        label: 'Administrador',
        value: 'Administrador'
    },
    {
        label: 'Produccion',
        value: 'Produccion'
    },
    {
        label: 'Ventas',    
        value: 'Ventas'
    }
];

export const Register = () => {
    const [rol, setRol] = React.useState('Ventas')

    const firestore = getFirestore(firebaseApp);

    async function registrarUsuario(email:string , password:string  , name:string  , rol: string) {
        const infoUsuario = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
            ).then((usuarioFirebase) => {
                return usuarioFirebase
            });

            const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
            setDoc(docuRef, {name: name, email: email, rol: rol});    
    }

    function submitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const rol = e.target.elements.rol.value;
        const password = e.target.elements.password.value;

        registrarUsuario(email , password , name , rol);
    }

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
                        Registrar nuevo Usuario
                    </Typography>
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nombres y Apellidos"
                            name="name"
                            autoComplete="Nombres y Apellidos"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo Electronico"
                            name="email"
                            autoComplete="Correo Electronico"
                            autoFocus
                        />


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
                            autoComplete="current-rol"
                        >
                            {roles.map((option) => (
                                <option>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

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


