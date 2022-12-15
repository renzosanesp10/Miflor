import { ProductLists } from "../containers/product/ProductLists";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function VentasPage() {
  const { userAuth } = useContext(AuthContext);
  const route = useRouter();

  useEffect(() => {
    if (userAuth && userAuth.uid) {
      if (userAuth.uid.trim() === "") {
        route.push("/login");
      }
      if (userAuth.rol === "Production") {
        route.push("/productos");
      }
    }
  }, []);

  return (
    <DashboardLayout title="Ventas">
      <ProductLists />
    </DashboardLayout>
  );
}
