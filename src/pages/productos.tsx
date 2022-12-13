import { ProductLists } from '../containers/product/ProductLists'
import { DashboardLayout } from '../layouts/DashboardLayout'

export default function ProductPage () {
  return (
    <DashboardLayout title='Productos'>
      <ProductLists />
    </DashboardLayout>
  )
}
