import { useNavigate } from "react-router-dom";
import styles from "./BackBtn.module.css";
import { IoReturnDownBack } from "react-icons/io5";

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <>
      <IoReturnDownBack className={styles.icon} onClick={() => navigate(-1)} />
    </>
  );
};

export default BackBtn;
