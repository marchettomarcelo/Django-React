import axios from "axios";
import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

export default function DarPontos({
    membroEscolhido,
    infoMembros,
    handleChange,
}) {
    const api = useAxios();
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

    async function handleButtonClick() {
        const data = {
            user_id: membroEscolhido,
            pontos: pontos,
        };
        console.log(data);
        const response = await api.post("/update-profile/", data);
        console.log(response);
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
                {membroEscolhido && (
                    <>
                        <label>
                            <h4>Pontos:</h4>

                            <input
                                type="text"
                                className="input-novos-pontos"
                                onChange={handleInputChange}
                                value={pontos}
                            />
                        </label>
                        <button
                            className="dar-pontos-but"
                            onClick={handleButtonClick}
                        >
                            <h5>Dar Pontos</h5>
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
