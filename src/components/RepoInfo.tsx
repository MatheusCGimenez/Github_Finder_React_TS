import { IRepo } from "../interfaces/Repo";

type RepoInfoProps = IRepo & { loading: boolean };

const RepoInfo = (props: RepoInfoProps) => {
  const {
    forks_count,
    html_url,
    language,
    name,
    stargazers_count,
    description,
    loading,
  } = props;

  return <div></div>;
};

export default RepoInfo;
