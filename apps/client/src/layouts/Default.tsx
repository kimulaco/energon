import { useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/";
import { useFetch } from "../utils/fetch/useFetch";
import { useUser } from "../utils/user/useUser";

interface Health {
  server: boolean;
}

interface ResponseHealth {
  statusCode: number;
  health: Health;
}

const LayoutDefault = () => {
  const { state: userState, logout } = useUser();
  const { doFetch } = useFetch<ResponseHealth>();

  const handleClickLogout = useCallback(async () => {
    console.log(userState);
    try {
      await logout();
    } catch {}
  }, [userState.user.id, logout]);

  useEffect(() => {
    doFetch("/api/health").catch(() => {});
  }, []);

  return (
    <div className="LayoutDefault">
      <AppHeader userState={userState} onClickLogout={handleClickLogout} />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDefault;
