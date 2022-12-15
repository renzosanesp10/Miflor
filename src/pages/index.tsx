import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { UserLists } from "../containers/users/UserLists";

export default function HomePage() {
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
    } else if (userAuth.rol === "Seller") {
      setIsLogged(false);
      route.push("/ventas");
    }
  };

  if (!isLogged || userAuth.uid.trim() === "") {
    return <>Unauthorized</>;
  }
  return (
    <DashboardLayout title="Usuarios">
      <UserLists />
    </DashboardLayout>
  );
}
