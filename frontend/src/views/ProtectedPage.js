import ProfileContext from "../context/ProfileContext";
import { useContext, useEffect } from "react";
import { convertProjeto, convertArea } from "../utils/ConvertDbValues";
import Box from "../components/Box";

function ProtectedPage() {
    const { userProfile } = useContext(ProfileContext);

    let projetos = userProfile?.projeto
        ?.map((proj) => {
            return convertProjeto(proj.projeto);
        })
        .join(", ");

    // let caixinhas = <> </>;

    // caixinhas = userProfile ? (
    //     Array.from(Object.keys(userProfile)).map((info, index) => {
    //         return (
    //             <Box key={index} titulo={info} conteudo={userProfile[info]} />
    //         );
    //     })
    // ) : (
    //     <> </>
    // );
    // console.log(caixinhas);

    // return <div> {caixinhas}</div>;

    return (
        <div>
            {userProfile && (
                <>
                    <h1>Projected Page</h1>
                    <p>
                        Nome de exibição:{" "}
                        {userProfile.nome_exibicao
                            ? userProfile.nome_exibicao
                            : "N/A"}
                    </p>

                    <p>
                        É líder do projeto: {userProfile.eh_lider?.toString()}
                    </p>
                    <p>
                        É diretor da área: {userProfile.eh_diretor?.toString()}
                    </p>
                    <p>Pertence ao projeto: {projetos}</p>
                    <p>Pertence a área: {convertArea(userProfile.area)}</p>
                    <br />
                    <p>Pontos por falta: {userProfile.pontos}</p>
                </>
            )}
        </div>
    );
}
export default ProtectedPage;
