import { SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { IUser } from "../interfaces/User";

interface Props {
  loadUser: (username: string) => Promise<IUser | null>;
  setUser: React.Dispatch<SetStateAction<IUser | null>>;
}

const Search = ({ loadUser, setUser }: Props) => {
  const [userName, setUserName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnClick = () => {
    // remoção de texto em branco

    userName.replace(/\s+/g, "");
    loadUser(userName).then((res) => {
      if (!res) return;

      const newUser: IUser = {
        avatar_url: res.avatar_url,
        bio: res.bio,
        created_at: res.created_at,
        followers: res.followers,
        following: res.following,
        location: res.location,
        login: res.login,
      };

      setUser(newUser);
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.search_container}>
      <h1>Digite o nome do usuário</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.form_container}
      >
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="John Doe"
          ref={inputRef}
        />
        <button onClick={handleOnClick} type="submit">
          <FaSearch className={styles.icon} />
        </button>
      </form>
    </div>
  );
};

export default Search;
