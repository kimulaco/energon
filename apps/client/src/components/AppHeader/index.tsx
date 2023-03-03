import { Link } from "react-router-dom";
import styles from "./index.module.css";

const AppHeader = () => {
  return (
    <header>
      <div className={styles.inner}>
        <h1 className={styles.title}>ENERGON</h1>

        <div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
