import { useContext, useState } from 'react'
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Divider,
  List,
  Container,
  styled,
  Grid
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Copyright } from '../components/base/Copyright'
import { mainListItems, secondaryListItems } from '../components/base/ListItems'
import { AuthContext } from '../contexts/AuthContext'
import LogoutIcon from '@mui/icons-material/Logout'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}))

interface Props {
  children: React.ReactNode
  username?: string
}

export const DashboardLayout: React.FC<Props> = ({
  children,
  username = 'Joseph'
}) => {
  const auth = getAuth()
  const route = useRouter()
  const { userAuth } = useContext(AuthContext)
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const closeSession = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        route.push('/login')
      })
      .catch(error => {
        // An error happened.
        console.error('ERROR LOGOUT', error)
      })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='absolute' open={open}>
        <Toolbar
          sx={{
            pr: '24px' // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginRight: '20px'
            }}
          >
            <Typography component='span' variant='body1' fontWeight={600}>
              {userAuth.name || 'Usuario'}
            </Typography>
            <Typography component='span' variant='body2'>
              {userAuth.rol || 'Rol'}
            </Typography>
          </Box>
          <IconButton color='inherit' onClick={closeSession}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component='nav'>
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          {children}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  )
}
