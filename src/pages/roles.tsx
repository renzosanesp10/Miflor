import { UserLists } from "../containers/users/UserLists";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function RolesPage() {
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
      if (userAuth.rol === "Seller") {
        route.push("/register");
      }
    }
  }, []);

  return (
    <DashboardLayout title="Roles">
      <UserLists />
    </DashboardLayout>
  );
}
