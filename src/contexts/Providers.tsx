import AuthProvider from './AuthContext'

interface Props {
  children: React.ReactNode
}

export const Providers: React.FC<Props> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}
