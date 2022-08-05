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
        const response = await api.patch("/update-profile/", data);
        console.log(response);

        if (response.data.response === "error") {
            alert("Erro ao atualizar pontos");
        } else {
            alert("Pontos atualizados com sucesso");
            window.location.reload();
        }
    }

    return (
        <div className="page">
            <h2>
                Esse página é exclusiva para: <br /> líderes e diretores.
            </h2>

            <div className="dar-pontos">
                <label>
                    <h4>Pessoa escolhida:</h4>
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
                            <h5>Pontos:</h5>

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
        </div>
    );
}
