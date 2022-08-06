import { useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../utils/useAxios";

export default function DarPontos({
    IdMembroEscolhido,
    infoMembros,
    handleSelectedMemberChange,
}) {
    const api = useAxios();
    const [pontos, setPontos] = useState(0);

    function handleInputChangeTyping(e) {
        setPontos(e.target.value);
    }

    function handleInputChangeSelect(e) {
        const id_current = e.target.value;
        if (id_current === "") {
            setPontos(0);
        }

        if (IdMembroEscolhido || id_current !== "") {
            const pontosMembroAtual = infoMembros.find(
                (membro) => membro.user === parseInt(id_current)
            ).pontos;

            setPontos(pontosMembroAtual);
        }
    }

    async function handleButtonClick() {
        const response = await api.patch("/update-profile/", {
            user_id: IdMembroEscolhido,
            pontos: pontos,
        });

        if (response.data.response === "error") {
            alert("Erro ao atualizar pontos. Avise o Marcelo.");
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
                        value={IdMembroEscolhido}
                        onChange={(e) => {
                            handleSelectedMemberChange(e);
                            handleInputChangeSelect(e);
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
                {IdMembroEscolhido && (
                    <>
                        <label>
                            <h5>Pontos:</h5>

                            <input
                                type="text"
                                className="input-novos-pontos"
                                onChange={handleInputChangeTyping}
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
            <Link to={"/"}>
                <button className="voltar-but">
                    <a className="a-voltar-but">
                        Página inicial
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="home-icon"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </a>
                </button>
            </Link>
        </div>
    );
}
