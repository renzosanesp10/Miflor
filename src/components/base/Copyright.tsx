import { Typography, Link, SxProps } from '@mui/material'

interface Props {
  sx?: SxProps
}

export const Copyright: React.FC<Props> = ({ sx }) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' sx={sx}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Panaderia Mi Flor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
