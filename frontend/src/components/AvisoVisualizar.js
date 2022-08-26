export default function AvisoVisualizar(props) {
    console.log(props);
    return (
        <div className="aviso">
            <h1>{props.aviso.titulo}</h1>
            <p>{props.aviso.descricao}</p>
            <strong>
                {" "}
                <p>Criado por: {props.aviso.autor}</p>
            </strong>
            {props.children}
        </div>
    );
}
