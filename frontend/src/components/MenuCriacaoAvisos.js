import AvisoEditar from "./AvisoEditar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

export default function MenuCriacaoAvisos() {
    const [todosOsAvisos, setTodosOsAvisos] = useState([]);
    let { user } = useContext(AuthContext);
    const api = useAxios();

    useEffect(async () => {
        const { data } = await api.get("/get-avisos/");
        const avisos = data.avisos;
        // console.log(avisos);
        setTodosOsAvisos(avisos);
    }, []);

    const [emEdicao, setEmEdicao] = useState(false);
    const [indexPostEmEdicao, setIndexPostEmEdicao] = useState(null);

    function mudarUmPost(indexDoAviso, avisoAlterado) {
        let data = [...todosOsAvisos];
        data[indexDoAviso] = avisoAlterado;
        setTodosOsAvisos(data);
    }

    async function salvarMudancas() {
        const { id_aviso, titulo, descricao } =
            todosOsAvisos[indexPostEmEdicao];

        let response;

        // se for null, um aviso novo está sendo criado
        if (id_aviso == null) {
            response = await api.post("create-aviso/", {
                titulo,
                descricao,
                id_criador: user.user_id,
            });

            if (response.status === 200) {
                alert("Aviso criado com sucesso");
                window.location.reload();
            } else {
                alert("Erro ao criar aviso");
            }

            // se não for null, um aviso já existente está sendo editado
        } else {
            response = await api.patch("update-aviso/", {
                id_aviso,
                titulo,
                descricao,
            });

            if (response.status !== 200) {
                alert("Não foi possível atualizar o aviso");
            }
        }

        setEmEdicao(false);
        setIndexPostEmEdicao(null);
    }

    function criarNovoAviso() {
        setTodosOsAvisos([
            ...todosOsAvisos,
            {
                titulo: "Novo Aviso",
                descricao: "Nova descrição",
                id_aviso: null,
                autor: "",
            },
        ]);

        setEmEdicao(true);
        setIndexPostEmEdicao(todosOsAvisos.length);
    }

    function handleClick(e) {
        const id = parseInt(e.target.id);
        setIndexPostEmEdicao(id);
        setEmEdicao(!emEdicao);
    }

    return (
        <div className="lista-avisos responsivo">
            <h1>Avisos: </h1>
            {todosOsAvisos.map((aviso, indexDoAviso) => {
                return (
                    <AvisoEditar
                        aviso={aviso}
                        indexDoAviso={indexDoAviso}
                        emEdicao={emEdicao}
                        mudarUmPost={mudarUmPost}
                        postSendoEditado={handleClick}
                        indexPostEmEdicao={indexPostEmEdicao}
                        salvarMudancas={salvarMudancas}
                        key={indexDoAviso}
                    />
                );
            })}
            {!emEdicao && <button onClick={criarNovoAviso}>Novo Aviso</button>}
        </div>
    );
}
