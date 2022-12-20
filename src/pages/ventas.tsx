import { DashboardLayout } from "../layouts/DashboardLayout";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import VentasContainer from "../containers/ventas/VentasContainer";

export default function VentasPage() {
  const [isLogged, setIsLogged] = useState(true);
  const { userAuth } = useContext(AuthContext);
  const route = useRouter();

  useEffect(() => {
    goToRolRoute();
  }, []);

  const goToRolRoute = () => {
    if (userAuth.uid.trim() === "") {
      setIsLogged(false);
      route.push("/login");
    } else if (userAuth.rol === "Production") {
      setIsLogged(false);
      route.push("/productos");
    }
  };
  if (!isLogged || userAuth.uid.trim() === "") return <>Unauthorized</>;

  return (
    <DashboardLayout title="Ventas">
      <VentasContainer />
    </DashboardLayout>
  );
}
