import { UserLists } from '../containers/users/UserLists'
import { DashboardLayout } from '../layouts/DashboardLayout'

export default function HomePage () {
  return (
    <DashboardLayout title='Usuarios'>
      <UserLists />
    </DashboardLayout>
  )
}
