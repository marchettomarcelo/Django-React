import Aviso from "./Aviso";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function ListaAvisos() {
    const [todosOsAvisos, setTodosOsAvisos] = useState([
        { titulo: "titulo1", descricao: "descricao1" },
        { titulo: "titulo2", descricao: "descricao2" },
        { titulo: "titulo3", descricao: "descricao3" },
    ]);

    const [postSendoEditado, setPostSendoEditado] = useState(false);

    function mudarUmPost(indexDoAviso, avisoAlterado) {
        let data = [...todosOsAvisos];
        data[indexDoAviso] = avisoAlterado;
        setTodosOsAvisos(data);
    }

    function handleClick() {
        setPostSendoEditado(!postSendoEditado);
    }

    return (
        <div>
            <button onClick={handleClick}>editar posts</button>
            {todosOsAvisos.map((aviso, indexDoAviso) => {
                return (
                    <Aviso
                        aviso={aviso}
                        indexDoAviso={indexDoAviso}
                        sendoEditado={postSendoEditado}
                        mudarUmPost={mudarUmPost}
                        key={indexDoAviso}
                    />
                );
            })}
        </div>
    );
}
