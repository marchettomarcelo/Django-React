import { useContext, useEffect, useState } from "react";
import ProfileContext from "../context/ProfileContext";
import { Redirect } from "react-router-dom";
import useAxios from "../utils/useAxios";
import DarPontos from "../components/DarPontos";
import { FilterMembers } from "../utils/FilterMembers";

export default function AdminPage() {
    const { userProfile } = useContext(ProfileContext);
    const [infoMembros, setInfoMembros] = useState(null);
    const [membroEscolhido, setMembroEscolhido] = useState("");
    const api = useAxios();

    useEffect(() => {
        if (userProfile !== null) {
            if (
                (userProfile.eh_diretor || userProfile.eh_lider) &&
                infoMembros === null
            ) {
                api.get("http://127.0.0.1:8000/api/users/")
                    .then((res) => {
                        setInfoMembros(res.data.users);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }, [userProfile]);

    const handleChange = (event) => {
        setMembroEscolhido(event.target.value);
    };

    if (userProfile && infoMembros) {
        if (userProfile.eh_diretor) {
            return (
                <DarPontos
                    membroEscolhido={membroEscolhido}
                    infoMembros={infoMembros}
                    handleChange={handleChange}
                />
            );
        } else if (userProfile.eh_lider) {
            const membros = FilterMembers(infoMembros, userProfile);
            return (
                <DarPontos
                    membroEscolhido={membroEscolhido}
                    infoMembros={membros}
                    handleChange={handleChange}
                />
            );
        } else {
            return <Redirect to="/" />;
        }
    } else {
        return <></>;
    }
}
