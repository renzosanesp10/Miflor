import { ProductLists } from "../containers/product/ProductLists";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function ProductPage() {
  const [isLogged, setIsLogged] = useState(true);
  const { userAuth } = useContext(AuthContext);
  const route = useRouter();

  useEffect(() => {
    if (userAuth.uid.trim() === "") {
      setIsLogged(false);
      route.push("/login");
    }
    if (userAuth.rol === "Seller") {
      setIsLogged(false);
      route.push("/register");
    }
  }, []);

  if (isLogged || userAuth.uid.trim() === "") {
    return <>Unauthorized</>;
  }

  return (
    <DashboardLayout title="Productos">
      <ProductLists />
    </DashboardLayout>
  );
}
