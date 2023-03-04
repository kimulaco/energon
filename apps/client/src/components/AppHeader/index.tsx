import { useCallback } from "react";
import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import type { UserState } from "../../utils/user/useUser";

interface Props {
  userState: UserState;
  onClickLogout?: () => void;
}

const AppHeader: FC<Props> = ({ userState, onClickLogout }) => {
  const handleClickLogout = useCallback(() => {
    if (typeof onClickLogout === "function") onClickLogout();
  }, []);

  return (
    <header>
      <div className={styles.inner}>
        <h1 className={styles.title}>ENERGON</h1>

        <div>
          <div className={styles.menu}>
            {userState.isLogined && userState.user.name && (
              <li className={styles.menuItem}>{userState.user.name}</li>
            )}

            {userState.isLogined && (
              <li className={styles.menuItem}>
                <button type="button" onClick={handleClickLogout}>
                  Logout
                </button>
              </li>
            )}

            {!userState.isLogined && userState.user.id && (
              <li className={styles.menuItem}>
                <Link to="/login">Login</Link>
              </li>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
