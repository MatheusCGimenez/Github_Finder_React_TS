import { useParams } from "react-router-dom";
import { IRepo } from "../interfaces/Repo";
import styles from "./Repository.module.css";
import BackBtn from "../components/BackBtn";
import { useEffect, useState } from "react";
import { useGithubLoader } from "../hooks/useGithubLoader";

const Repository = () => {
  const { username } = useParams<{ username: string }>();
  const { loaderRepoData, loading } = useGithubLoader();
  const [repos, setRepos] = useState<IRepo[] | []>([]);

  useEffect(() => {
    loaderRepoData(username as string).then((data) => {
      if (!data) return;

      const newRepo: IRepo = {
        name: data.name,
        description: data.description,
        forks_count: data.forks_count,
        html_url: data.html_url,
        language: data.language,
        stargazers_count: data.stargazers_count,
      };

      setRepos([...repos, newRepo]);
    });
  }, []);

  return (
    <div>
      <h1>
        Repositórios de <span>{username}</span>
        <BackBtn />
      </h1>
    </div>
  );
};

export default Repository;
