import { useCallback, useState } from "react";
import { IUser } from "../interfaces/User";
import { IRepo } from "../interfaces/Repo";
import { toast } from "react-toastify";

export const useGithubLoader = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const loaderGithubData = useCallback(
    async (username: string): Promise<IUser | null> => {
      if (!username) {
        toast.error("Insira algum usuário!");
        return null;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        if (!response.ok) {
          toast.error("Usuário não encontrado.");
          return null;
        }

        const data: IUser = await response.json();
        toast.success("Sucesso!");
        return data;
      } catch (error) {
        toast.error(
          "Houve um erro ao realizar a requisição. Confira o console para mais informações."
        );
        console.error(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loaderRepoData = useCallback(
    async (username: string): Promise<IRepo | null> => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );

        if (!response.ok) {
          toast.error("Não foi encontrado nenhum repositório neste perfil!");
          return null;
        }

        const data: IRepo = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        toast.error(
          "Houve um erro ao realizar a requisição. Confira o console para mais informações."
        );
        console.error(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loaderGithubData, loaderRepoData, loading };
};
