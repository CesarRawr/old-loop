import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { HamburgerMenu } from "@ui/index";

export default function Header() {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <header className={styles.header}>
      <HamburgerMenu />
      <span className={styles.logo} onClick={onClick}>
        loop
      </span>
    </header>
  );
}
