import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import AvisoVisualizar from "./AvisoVisualizar";

export default function ListarAvisos() {
    const [todosOsAvisos, setTodosOsAvisos] = useState([]);

    const api = useAxios();

    useEffect(async () => {
        const { data } = await api.get("/get-avisos/");
        const avisos = data.avisos;
        // console.log(avisos);
        setTodosOsAvisos(avisos);
    }, []);

    return (
        <div className="lista-avisos responsivo">
            <h1>Avisos: </h1>
            {todosOsAvisos.map((aviso, index) => {
                return <AvisoVisualizar aviso={aviso} key={index} />;
            })}
        </div>
    );
}
