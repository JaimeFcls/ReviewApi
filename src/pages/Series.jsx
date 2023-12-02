import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getUser } from "../components/getUser";
import "./Series.css";

const seriesURL = import.meta.env.VITE_API_2;
const defaultImageURL = './imagempadrao.png';

const Series = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const user = getUser();

    const handleReplyClick = (commentId) => {
        if (replyingTo === commentId) {
            setReplyingTo(null); // fecha a área de texto se já estiver aberta
        } else {
            setReplyingTo(commentId); // abre a área de texto se estiver fechada
        }
    };


    const handleCommentChange = (event) => {
        const text = event.target.value;
        if (text.length <= 1500) {
            setCommentText(text);
            setCharCount(text.length);
        }
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8082/api/comentar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comentar: commentText,
                usuarioId: user.id,
                serieId: id,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            setComments([...comments, data]);
            setCommentText("");
            setCharCount(0);
        } else {
            console.error('Erro ao enviar comentário:', response.statusText);
        }
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

        const commentsRes = await fetch(`http://localhost:8082/api/comentar/serie/${id}`);
        const commentsData = await commentsRes.json();
        setComments(commentsData);
    };
    const handleCommentDelete = async (commentId) => {
        if (window.confirm('Tem certeza de que deseja excluir este comentário? As respostas obtidas também serão excluidas')){
        const response = await fetch(`http://localhost:8082/api/comentar/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            setComments(comments.filter(comment => comment.id !== commentId));
        } else {
            console.error('Erro ao excluir comentário:', response.statusText);
        }
        }
    };

    const handleReplyChange = (event) => {
        const text = event.target.value;
        if (text.length <= 1500) {
            setReplyText(text);
        }
    };
    const handleReplySubmit = async (event, commentId) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8082/api/respostas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                texto: replyText,
                usuarioId: user.id,
                comentarioId: commentId,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            setReplies([...replies, data]);
            setReplyText("");
            setReplyingTo(null);
        } else {
            console.error('Erro ao enviar resposta:', response.statusText);
        }
    };
    const getReplies = async () => {
        try {
            const response = await fetch(`http://localhost:8082/api/respostas`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setReplies(data);
            } else {
                console.error('Erro ao recuperar respostas:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao recuperar respostas:', error);
        }
    };
    const handleReplyDelete = async (replyId) => {
        if (window.confirm('Tem certeza de que deseja excluir esta resposta?')){
        const response = await fetch(`http://localhost:8082/api/respostas/${replyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            setReplies(replies.filter(reply => reply.id !== replyId));
        } else {
            console.error('Erro ao excluir resposta:', response.statusText);
        }
    }
    };
    useEffect(() => {
        const seriesUrl = `${seriesURL}${id}?language=pt-br`;
        getSeries(seriesUrl);
        getReplies();
    }, []);
    return (
        <div className="series-back">
            <img src={`https://image.tmdb.org/t/p/w500${series?.backdrop_path}`} alt="series backdrop" style={{ width: '1920px', height: '400px', opacity: "20%" }} />
            {series && (
                <>
                    <img className="series-poster" src={`https://image.tmdb.org/t/p/w500${series?.poster_path}`} alt="series poster" />
                    <p className="series-title">{series.name}</p>
                    <p className="tagline">{series.tagline}</p>
                    <div className="sinopse">
                        <h3>Sinopse</h3>
                        <p>{series.overview}</p>
                        <br />
                        <p>Lançado em: {new Date(series.first_air_date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="comments">
                        <h3>Comentar</h3>
                        <br />
                        {user ? (
                            <form onSubmit={handleCommentSubmit}>
                                <textarea
                                    className="comentario"
                                    name="comment"
                                    type="text"
                                    placeholder="Adicione um comentário..."
                                    value={commentText}
                                    onChange={handleCommentChange}
                                    required
                                />
                                <div className="char-count">Caracteres restantes: {1500 - charCount}</div>
                                <button className="comentar" type="submit">Enviar</button>
                            </form>
                        ) : (
                            <p>Você precisa estar logado para comentar. <a className="clique" href="/login">Clique aqui para entrar</a></p>
                        )}
                        <div>
                            <p className="cmt">Comentarios :</p>
                        </div>
                        {comments.map((comment, index) => (
                            <div className="ComentarioFinal" key={index}>
                                <p className="falaai">{comment.comentar}</p>
                                <p className="nomeComment"> - {comment.usuario.nome}</p>
                                {user && user.id === comment.usuario.id && (
                                    <div className="lixeira" onClick={() => handleCommentDelete(comment.id)}>
                                        <FaRegTrashCan />
                                    </div>
                                )}
                                <div className="resposta" onClick={() => handleReplyClick(comment.id)}>
                                    <FaReply />
                                </div>
                                {replyingTo === comment.id && (
                                    <form onSubmit={(event) => handleReplySubmit(event, comment.id)}>
                                        <div>
                                            <h6 className="titleRespostas">Responder :</h6>
                                        </div>
                                        <textarea className="comentarioResposta" value={replyText} onChange={handleReplyChange} />
                                        <button className="enviarResposta" type="submit">Enviar</button>
                                    </form>
                                )}
                                <div>
                                    <h6 className="titleRespostas">Respostas :</h6>
                                </div>
                                {replies
                                    .filter(reply => reply.comentario?.id === comment?.id)
                                    .map((reply, index) => (
                                        <div className="RespostaFinal" key={index}>
                                            <p className="falaai">{reply.texto}</p>
                                            <p className="nomeReply"> - {reply.usuario.nome}</p>
                                            {user && reply?.usuario && (user.id === reply.usuario.id) && (
                                                <div className="lixeira2" onClick={() => handleReplyDelete(reply.id)}>
                                                    <FaRegTrashCan />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                            
                        ))}
                        
                    </div>
                </>
            )}
        
            
        </div>
    );
};

export default Series;
