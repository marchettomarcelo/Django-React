import { useEffect, useState } from "react";

export default function DarPontos({
    membroEscolhido,
    infoMembros,
    handleChange,
}) {
    const [pontos, setPontos] = useState(0);

    function handleInputChange(e) {
        setPontos(e.target.value);
    }
    function handleInputChange2(e) {
        const id_current = e.target.value;
        if (id_current === "") {
            setPontos(0);
        }

        if (membroEscolhido || id_current !== "") {
            const pontosMembroAtual = infoMembros.find(
                (membro) => membro.user === parseInt(id_current)
            ).pontos;

            setPontos(pontosMembroAtual);
        }
    }

    return (
        <>
            <h1>Esse página é exclusiva para membros da Diretoria</h1>

            <div className="dar-pontos">
                <label>
                    <h3>Pessoa escolhida:</h3>
                    <select
                        className="select-nomes"
                        value={membroEscolhido}
                        onChange={(e) => {
                            handleChange(e);
                            handleInputChange2(e);
                        }}
                    >
                        <option value={""}>{"-----"}</option>

                        {infoMembros.map((membro, index) => (
                            <option key={index} value={membro.user}>
                                {membro.nome_exibicao}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <h4>Pontos:</h4>

                    <input
                        type="text"
                        className="input-novos-pontos"
                        onChange={handleInputChange}
                        value={pontos}
                    />
                </label>
                <p>Atribuir pontos a: {membroEscolhido}!</p>
            </div>
        </>
    );
}
