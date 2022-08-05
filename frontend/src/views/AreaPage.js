import { useContext } from "react";
import ProfileContext from "../context/ProfileContext";
import { useParams } from "react-router-dom";
import { convertArea } from "../utils/ConvertDbValues";

export default function AreaPage() {
    const { userProfile } = useContext(ProfileContext);
    const params = useParams();

    const areaParametro = params.area.replace("%", " ");
    const areaPerfil = convertArea(userProfile?.area);

    const arrayAreas = [
        "Financeiro",
        "Gestão de Pessoas",
        "Gestão de Projetos",
        "Marketing",
    ];

    if (!arrayAreas.includes(areaParametro) || !userProfile) {
        console.log("oi");
        return <></>;
    }

    if (areaParametro === areaPerfil || userProfile?.eh_diretor) {
        return (
            <div className="page">
                <h1>
                    Esse página é exclusiva para membros da área:{" "}
                    {areaParametro}
                </h1>
            </div>
        );
    } else {
        return (
            <div className="page">
                <h1>
                    Esse página é exclusiva para membros da área:{" "}
                    {areaParametro}. Você não pode acessar esse conteúdo.
                </h1>
            </div>
        );
    }
}
