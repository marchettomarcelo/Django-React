import { useEffect, useState } from "react";

export default function Aviso({
    aviso,
    indexDoAviso,
    sendoEditado,
    mudarUmPost,
}) {
    const [avisoComponente, setAvisoComponente] = useState(null);
    useEffect(() => {
        console.log("bom dia");
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

    if (!sendoEditado) {
        return (
            <div>
                <h1>{avisoComponente.titulo}</h1>
                <p>{avisoComponente.descricao}</p>
            </div>
        );
    } else {
        return (
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
        );
    }
}
