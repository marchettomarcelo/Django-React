import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { convertProjeto, convertArea } from "../utils/ConvertDbValues";

function ProtectedPage() {
    const [res, setRes] = useState("");
    const api = useAxios();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/username/${user.user_id}`);
                const x = response.data.response.perfil;
                console.log(x);
                setRes(x);
            } catch {
                setRes("Something went wrong");
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let projetos = res.projeto
        ?.map((proj) => {
            return convertProjeto(proj.projeto);
        })
        .join(", ");
    return (
        <div>
            <h1>Projected Page</h1>
            <p>
                Nome de exibição:{" "}
                {res.nome_exibicao ? res.nome_exibicao : "N/A"}
            </p>

            <p>É líder do projeto: {res.eh_lider?.toString()}</p>
            <p>É diretor da área: {res.eh_diretor?.toString()}</p>
            <p>Pertence ao projeto: {projetos}</p>
            <p>Pertence a área: {convertArea(res.area)}</p>
            <br />
            <p>Pontos por falta: {res.pontos}</p>
        </div>
    );
}

export default ProtectedPage;
