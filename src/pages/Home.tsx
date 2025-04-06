import { IUser as UserProps } from "../interfaces/User";
import Search from "../components/Search";
import { useState } from "react";
import UserInfo from "../components/UserInfo";
import { useGithubLoader } from "../hooks/useGithubLoader";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const { loaderGithubData, loading } = useGithubLoader();

  return (
    <div>
      <Search loadUser={loaderGithubData} setUser={setUser} />
      {user && (
        <>
          {!loading ? (
            <UserInfo
              avatar_url={user.avatar_url}
              bio={user.bio}
              created_at={user.created_at}
              followers={user.followers}
              following={user.following}
              location={user.location}
              login={user.login}
              loading={loading}
            />
          ) : (
            <h2>Carregando dados de usuário...</h2>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
