export function FilterMembers(infoMembros, userProfiele) {
    let membros = [];

    for (let i = 0; i < userProfiele.projeto.length; i++) {
        for (let j = 0; j < infoMembros.length; j++) {
            if (
                userProfiele.projeto[i].projeto ===
                infoMembros[j].projeto[0].projeto
            ) {
                membros.push(infoMembros[j]);
            }
        }
    }

    return membros;
}
