import moment from "moment";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { getUser } from "../components/getUser";
import axios from "axios";


import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const defaultImageURL = './imagempadrao.png';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [charCount, setCharCount] = useState(0);
  
  const user = getUser();

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
        movieId: id,
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

  const getMovie = async (url) => {
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
    setMovie(data);

    const commentsRes = await fetch(`http://localhost:8082/api/comentar/filme/${id}`);
    const commentsData = await commentsRes.json();
    setComments(commentsData);
  };
  const handleCommentDelete = async (commentId) => {
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
  };

  const handleResponseSubmit = (e, commentId) => {
    e.preventDefault();

    // Obter a resposta do campo de entrada
    const responseText = e.target.elements[0].value;

    // Criar o objeto de resposta
    const response = {
      resposta: responseText,
      usuario: user,  // Supondo que 'user' seja o usuário atualmente logado
      comentarioId: commentId
    };

    // Enviar a resposta para o servidor
    axios.post('/api/resposta/comentario/' + commentId, response)
      .then(res => {
        console.log(res);
        console.log(res.data);

        // Limpar o campo de entrada
        e.target.elements[0].value = '';

        // Atualizar a lista de comentários/respostas
        // ...
      });
  }

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?language=pt-br`;
    getMovie(movieUrl);
  }, []);

  return (
    <div className="movie-back">
      <img src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`} alt="movie backdrop" style={{ width: '1920px', height: '400px', opacity: "20%" }} />
      {movie && (
        <>
          <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="movie poster" />
          <p className="movie-title">{movie.title}</p>
          <p className="tagline">{movie.tagline}</p>
          <div className="sinopse">
            <h3>Sinopse</h3>
            <p>{movie.overview}</p>
            <br />
            <p>Lançado em: {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>
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
                <p className="dataComment">{moment(comment.data).format('DD/MM/YYYY')}</p>
                {user && user.id === comment.usuario.id && (
                  <div className="lixeira" onClick={() => handleCommentDelete(comment.id)}>
                    <FaRegTrashCan />
                  </div>
                )}
                <div className="Respostas">
                  {Array.isArray(comment.respostas) && comment.respostas.map((resposta, index) => (
                    <p key={index}>{resposta.resposta}</p>
                  ))}
                </div>
                {user && (
                  <form onSubmit={(e) => handleResponseSubmit(e, comment.id)}>
                    <input type="text" placeholder="Escreva sua resposta aqui..." />
                    <button type="submit">Responder</button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;