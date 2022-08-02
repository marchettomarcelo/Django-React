export default function Box({ titulo, conteudo }) {
    return (
        <div className="">
            <h1 className="text-red-700">{titulo}</h1>
            <p>{conteudo}</p>
        </div>
    );
}
