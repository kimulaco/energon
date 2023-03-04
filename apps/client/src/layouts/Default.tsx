import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/";
import { useFetch } from "../utils/fetch/useFetch";

interface Health {
  server: boolean;
}

interface ResponseHealth {
  statusCode: number;
  health: Health;
}

const LayoutDefault = () => {
  const { doFetch } = useFetch<ResponseHealth>();

  useEffect(() => {
    doFetch("/api/health").catch(() => {});
  }, []);

  return (
    <div className="LayoutDefault">
      <AppHeader />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDefault;
