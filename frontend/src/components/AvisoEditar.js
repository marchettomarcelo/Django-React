import { useEffect, useState } from "react";
import AvisoVisualizar from "./AvisoVisualizar";
import BotaoEditar from "./BotaoEditar";

export default function AvisoEditar({
    aviso,
    indexDoAviso,
    emEdicao,
    mudarUmPost,
    postSendoEditado,
    indexPostEmEdicao,
    salvarMudancas,
}) {
    const [avisoComponente, setAvisoComponente] = useState(null);
    useEffect(() => {
        setAvisoComponente(aviso);
    }, []);

    function handleChange(e) {
        let avisoAlterado = { ...avisoComponente };
        avisoAlterado[e.target.name] = e.target.value;
        setAvisoComponente(avisoAlterado);
        mudarUmPost(indexDoAviso, avisoAlterado);
    }

    if (avisoComponente === null) {
        return <></>;
    }

    if (!emEdicao) {
        return (
            <AvisoVisualizar aviso={avisoComponente}>
                <BotaoEditar
                    postSendoEditado={postSendoEditado}
                    indexDoAviso={indexDoAviso}
                />
            </AvisoVisualizar>
        );
    } else if (indexDoAviso === indexPostEmEdicao) {
        return (
            <>
                <div className="aviso">
                    <div>
                        <input
                            type="text"
                            value={avisoComponente.titulo}
                            name="titulo"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            value={avisoComponente.descricao}
                            name="descricao"
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={salvarMudancas}>salvar mudancas</button>
                </div>
            </>
        );
    } else {
        return (
            <div className="aviso">
                <h1>{avisoComponente.titulo}</h1>
                <p>{avisoComponente.descricao}</p>
            </div>
        );
    }
}
