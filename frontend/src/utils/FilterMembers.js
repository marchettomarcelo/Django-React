export function FilterMembers(infoMembros, userProfiele) {
    let membros = [];

    userProfiele.projeto.forEach((projetoAtual) => {
        const membrosDesteProjeto = infoMembros.filter((membro) => {
            return (
                membro.projeto.length > 0 &&
                membro.projeto[0].projeto === projetoAtual.projeto
            );
        });

        membros = membros.concat(membrosDesteProjeto);
    });

    return membros;
}
