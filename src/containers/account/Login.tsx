import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Copyright } from "../../components/base/Copyright";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { getOneItemFromDocumentByID } from "../../lib/firebaseHelper";

export const Login = () => {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const route = useRouter();
  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    if (route.query.logout) return;
    goToRolRoute();
  }, [userAuth, userAuth.rol]);

  const goToRolRoute = (rol?: string) => {
    const rolToVerify = rol ?? userAuth.rol;
    if (rolToVerify === "Admin") {
      route.push("/");
    } else if (rolToVerify === "Seller") {
      route.push("/ventas");
    } else if (rolToVerify === "Production") {
      route.push("/productos");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") || "";
    const password = data.get("password") || "";

    signInWithEmailAndPassword(auth, email.toString(), password.toString())
      .then(async (userCredential: { user: any }) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          const { rol: rolID }: { rol: string } =
            await getOneItemFromDocumentByID(db, "usuarios", user.uid);
          const { rol: nameOfRol }: { rol: string } =
            await getOneItemFromDocumentByID(db, "roles", rolID);
          goToRolRoute(nameOfRol);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("ERROR CODE", errorCode);
        console.error("ERROR MESSAGE", errorMessage);
      });
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Iniciar Sesion
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Recuerdame"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Iniciar Sesion
        </Button>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
};
