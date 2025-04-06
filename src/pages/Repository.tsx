import { useParams } from "react-router-dom";
import { IRepo } from "../interfaces/Repo";
import styles from "./Repository.module.css";
import BackBtn from "../components/BackBtn";
import { useEffect, useState } from "react";
import { useGithubLoader } from "../hooks/useGithubLoader";
import { HiIdentification } from "react-icons/hi2";
import { FaCode } from "react-icons/fa";

const Repository = () => {
  const { username } = useParams<{ username: string }>();
  const { loaderRepoData, loading } = useGithubLoader();
  const [repos, setRepos] = useState<IRepo[]>([]);

  useEffect(() => {
    if (!username) return;

    loaderRepoData(username).then((data) => {
      if (!data) return;

      const formattedRepos: IRepo[] = data.map((element) => ({
        id: element.id,
        name: element.name,
        description: element.description,
        forks_count: element.forks_count,
        html_url: element.html_url,
        language: element.language,
        stargazers_count: element.stargazers_count,
      }));

      setRepos(formattedRepos);
    });
  }, [username]);

  if (loading) {
    return <h2>Carregando informações...</h2>;
  }

  return (
    <div>
      <h1 className={styles.h1}>
        Repositórios de <span>{username}</span>
      </h1>
      <BackBtn />
      {repos.length < 1 ? (
        <h2>Nenhum repositório público encontrado neste perfil.</h2>
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className={styles.repo_container}>
            <h2>{repo.name}</h2>
            <p>
              <HiIdentification className={styles.icon} />
              {repo.id}
            </p>
            <p>
              <FaCode className={styles.icon} />
              {repo.language ? repo.language : "Não consegui identificar 🥹"}
            </p>
            <div className={styles.forks_stars}>
              <div className={styles.forks}>
                <p>FORKS</p>
                <button>{repo.forks_count}</button>
              </div>
              <div className={styles.stars}>
                <p>ESTRELAS</p>
                <button>{repo.stargazers_count}</button>
              </div>
            </div>
            <button
              onClick={() => window.open(repo.html_url)}
              className={styles.btn}
            >
              VER CÓDIGO COMPLETO
            </button>
            <div className={styles.description}>
              {!repo.description ? null : (
                <textarea  defaultValue={repo.description}></textarea>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Repository;
