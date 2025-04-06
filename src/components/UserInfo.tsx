import { NavLink } from "react-router-dom";
import { IUser } from "../interfaces/User";
import styles from "./UserInfo.module.css";
import { FaGithub } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import gifLoading from "../assets/loading.gif";

type UserInfoProps = IUser & { loading: boolean };

const UserInfo = (props: UserInfoProps) => {
  const {
    avatar_url,
    bio,
    created_at,
    followers,
    following,
    location,
    login,
    loading,
  } = props;

  const formattedDate = new Date(created_at).toLocaleString("pt-BR");

  return (
    <div className={styles.userinfo_container}>
      <NavLink to={`/repos/${login}`}>
        <FaGithub className={styles.icon} />
      </NavLink>
      <img
        onClick={() => window.open(avatar_url)}
        src={loading ? gifLoading : avatar_url}
        alt={login}
      />
      <p>
        <span>
          <IoMdPin />
        </span>
        {location ? location : "Informação não encontrada."}
      </p>
      <hr />
      <div className={styles.follow_container}>
        <div className={styles.following}>
          <p>Seguindo</p>
          <button className={styles.follow_btn}>{following}</button>
        </div>
        <div className={styles.followers}>
          <p>Seguidores</p>
          <button className={styles.follow_btn}>{followers}</button>
        </div>
      </div>
      <hr />
      <p> Criação: {formattedDate}</p>
      <div className={styles.bio}>
        <h1>BIO</h1>
        <p>{bio ? bio : "Perfil sem biografia."}</p>
      </div>
    </div>
  );
};

export default UserInfo;
