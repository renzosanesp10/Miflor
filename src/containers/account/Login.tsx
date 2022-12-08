import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { Copyright } from '../../components/base/Copyright'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from '../../config/firebase'
import { useRouter } from 'next/router'

export const Login = () => {
  const auth = getAuth(firebaseApp)
  const route = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email') || ''
    const password = data.get('password') || ''

    signInWithEmailAndPassword(auth, email.toString(), password.toString())
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        if (user) {
          route.push('/')
        }
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error('ERROR CODE', errorCode)
        console.error('ERROR MESSAGE', errorMessage)
      })
  }

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  )
}
