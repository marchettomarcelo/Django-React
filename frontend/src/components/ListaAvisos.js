import Aviso from "./Aviso";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function ListaAvisos() {
    const [todosOsAvisos, setTodosOsAvisos] = useState([
        { titulo: "titulo1", descricao: "descricao1" },
        { titulo: "titulo2", descricao: "descricao2" },
        { titulo: "titulo3", descricao: "descricao3" },
    ]);

    const [emEdicao, setEmEdicao] = useState(false);
    const [indexPostEmEdicao, setIndexPostEmEdicao] = useState(null);

    function mudarUmPost(indexDoAviso, avisoAlterado) {
        let data = [...todosOsAvisos];
        data[indexDoAviso] = avisoAlterado;
        setTodosOsAvisos(data);
    }

    function salvarMudancas() {
        setEmEdicao(false);
        setIndexPostEmEdicao(null);
    }

    function handleClick(e) {
        const id = parseInt(e.target.id);
        setIndexPostEmEdicao(id);
        setEmEdicao(!emEdicao);
    }

    return (
        <div className="lista-avisos responsivo">
            {/* <button onClick={handleClick}>editar posts</button> */}
            {todosOsAvisos.map((aviso, indexDoAviso) => {
                return (
                    <Aviso
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
        </div>
    );
}
