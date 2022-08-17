import ProfileContext from "../context/ProfileContext";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { convertProjeto, convertArea } from "../utils/ConvertDbValues";
import { Link } from "react-router-dom";

function ProtectedPage() {
    const { userProfile } = useContext(ProfileContext);
    const { user } = useContext(AuthContext);

    const projetos = userProfile?.projeto
        .map((proj) => {
            return convertProjeto(proj.projeto);
        })
        .join(", ");

    const area = convertArea(userProfile?.area);

    return (
        <div className="page">
            {userProfile && (
                <>
                    <h1> Olá senhor {user.username} </h1>
                    <p>
                        Nome de exibição:
                        {userProfile.nome_exibicao
                            ? userProfile.nome_exibicao
                            : "N/A"}
                    </p>

                    <p>
                        {userProfile.eh_lider && "Você é lider do projeto"}
                        {/* É líder do projeto: {userProfile.eh_lider?.toString()} */}
                    </p>
                    <p>
                        {userProfile.eh_diretor && "Você é diretor da sua área"}
                    </p>
                    <p>
                        {userProfile.projeto.length !== 0 &&
                            `Pertence ao projeto: ${projetos}`}
                    </p>
                    {userProfile.area && `Você pertence a área: ${area}`}

                    <br />
                    <h4>Pontos por falta: {userProfile.pontos}</h4>

                    <div className="buts-protected-page">
                        <Link to={`/areas/${area}`}>
                            <button> Pagina exclusiva da sua area </button>
                        </Link>

                        {(userProfile.eh_diretor || userProfile.eh_lider) && (
                            <Link to={`/admin`}>
                                <button style={{ marginTop: "10px" }}>
                                    {" "}
                                    Admin{" "}
                                </button>
                            </Link>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
export default ProtectedPage;
