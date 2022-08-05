import { useContext, useEffect, useState } from "react";
import ProfileContext from "../context/ProfileContext";
import { Redirect } from "react-router-dom";
import useAxios from "../utils/useAxios";
import DarPontos from "../components/DarPontos";
import { FilterMembers } from "../utils/FilterMembers";

export default function AdminPage() {
    const { userProfile } = useContext(ProfileContext);
    const [infoMembros, setInfoMembros] = useState(null);
    const [IdMembroEscolhido, setIdMembroEscolhido] = useState("");
    const api = useAxios();

    useEffect(() => {
        if (userProfile !== null) {
            if (
                (userProfile.eh_diretor || userProfile.eh_lider) &&
                infoMembros === null
            ) {
                api.get("/users/")
                    .then((res) => {
                        setInfoMembros(res.data.users);
                    })
                    .catch((err) => {
                        alert("Erro ao carregar os membros. Avise o Marcelo.");
                    });
            }
        }
    });

    const handleSelectedMemberChange = (event) => {
        setIdMembroEscolhido(event.target.value);
    };

    if (userProfile && infoMembros) {
        if (userProfile.eh_diretor) {
            return (
                <DarPontos
                    IdMembroEscolhido={IdMembroEscolhido}
                    infoMembros={infoMembros}
                    handleSelectedMemberChange={handleSelectedMemberChange}
                />
            );
        } else if (userProfile.eh_lider) {
            const membros = FilterMembers(infoMembros, userProfile);
            return (
                <DarPontos
                    IdMembroEscolhido={IdMembroEscolhido}
                    infoMembros={membros}
                    handleSelectedMemberChange={handleSelectedMemberChange}
                />
            );
        } else {
            return <Redirect to="/" />;
        }
    } else {
        return <></>;
    }
}
