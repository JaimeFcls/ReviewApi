import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../components/getUser";
import "./Series.css";

const seriesURL = import.meta.env.VITE_API_2;
const defaultImageURL = './imagempadrao.png';

const Series = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const [comments, setComments] = useState([]);
    const user = getUser();

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const comment = event.target.elements.comment.value;
        const response = await fetch('http://localhost:8082/api/comentar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comentar: comment,
                usuarioId: user.id, 
                serieId: id, 
            }),
        });
        if (response.ok) {
            const data = await response.json();
            setComments([...comments, data]);
        } else {
            console.error('Erro ao enviar comentário:', response.statusText);
        }
        event.target.reset();
    };

    const getSeries = async (url) => {
        const res = await fetch(url, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JmZTU5NmZjMmJiMmQ1OWQwZDhiYWZlMTM2NyIsInN1YiI6IjY0ZGVhYjcyYjc3ZDRiMTEzZmM2MDVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwanTcyFlIRs3zxrfDXVXOCt6Cj2bH9AZSyUsNQgAv8',
            },
        });
        const data = await res.json();
        if (!data.poster_path) {
            data.poster_path = defaultImageURL;
        }
        console.log(data);
        setSeries(data);

        // Recuperar comentários
        const commentsRes = await fetch(`http://localhost:8082/api/comentar/serie/${id}`);
        const commentsData = await commentsRes.json();
        setComments(commentsData);
    };

    useEffect(() => {
        const seriesUrl = `${seriesURL}${id}?language=pt-br`;
        getSeries(seriesUrl);
    }, []);
    return (
        <div className="series-back">
            <img src={`https://image.tmdb.org/t/p/w500${series?.backdrop_path}`} alt="series backdrop" style={{ width: '1920px', height: '400px', opacity: "25%" }} />
            {series && (
                <>
                    <img className="series-poster" src={`https://image.tmdb.org/t/p/w500${series?.poster_path}`} alt="series poster" />
                    <p className="series-title">{series.name}</p>
                    <p className="tagline">{series.tagline}</p>
                    <div className="sinopse">
                        <h3>
                            Sinopse
                        </h3>
                        <p>{series.overview}</p>
                        <br></br>

                        <p>Lançado em : {new Date(series.first_air_date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="comments">
                        <h3>Comentários</h3>
                        {comments.map((comment, index) => (
                            <p key={index}>{comment.comentar} - {comment.usuario ? comment.usuario.nome : 'Usuário desconhecido'}</p>
                        ))}
                        {user ? (
                            <form onSubmit={handleCommentSubmit}>
                                <textarea className="comentario" name="comment" type="text" placeholder="Adicione um comentário..." required />
                                <button className="comentar" type="submit">Enviar</button>
                            </form>
                        ) : (
                            <p>Você precisa estar logado para comentar.  <a className="clique" href="/login">Clique aqui para entrar</a></p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Series;
