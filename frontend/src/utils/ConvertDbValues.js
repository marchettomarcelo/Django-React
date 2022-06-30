export function convertProjeto(projeto) {
    switch (projeto) {
        case "AMBI":
            return "Ambientar";

        case "INFO":
            return "Informar";

        case "PONT":
            return "Pontuais";

        case "CA10":
            return "Camisa 10";

        case "AULA":
            return "Aulas Solidárias";

        case "CHAL":
            return "Challenge";

        case "MUND":
            return "Mun";

        case "SOMA":
            return "Somar";

        case "SOCI":
            return "Social Planning";

        case "VENU":
            return "Vênus";

        case "ALEG":
            return "Alegrarte";

        default:
            return "";
    }
}

export function convertArea(area) {
    switch (area) {
        case "F":
            return "Financeiro";
        case "GP":
            return "Gestão de Pessoas";
        case "P":
            return "Gestão de Projetos";
        case "M":
            return "Marketing";

        default:
            return "";
    }
}
