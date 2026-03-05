import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState({});
  const [tituloPT, setTituloPT] = useState("");
  const [sinopsePT, setSinopsePT] = useState("");

  useEffect(() => {
    fetch(`${props.apiUrl}&i=${props.movieID}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieDesc(data);

        // Traduz título
        fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            data.Title,
          )}&langpair=en|pt-BR`,
        )
          .then((res) => res.json())
          .then((traducao) =>
            setTituloPT(traducao.responseData.translatedText),
          );

        // Traduz sinopse
        fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            data.Plot,
          )}&langpair=en|pt-BR`,
        )
          .then((res) => res.json())
          .then((traducao) =>
            setSinopsePT(traducao.responseData.translatedText),
          );
      })
      .catch((error) => console.error(error));
  }, [props.apiUrl, props.movieID]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt={tituloPT} />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/jjflix.png" alt="" />
              {movieDesc.Type === "movie" ? "Filme" : "Série"}
              <h1>{tituloPT || movieDesc.Title}</h1>

              <a
                href={`https://google.com/search?q=${encodeURIComponent(
                  tituloPT || movieDesc.Title,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶️ Assistir
              </a>
            </div>
          </div>
        </div>

        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            ⭐ Avaliação: {movieDesc.imdbRating} | ⏳ Duração:{" "}
            {movieDesc.Runtime} | 📅 {movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>🎭 Elenco: {movieDesc.Actors}</p>
            <p>🎬 Gênero: {movieDesc.Genre}</p>
          </div>
        </div>

        <div className={styles.desc}>
          <p>📖 Sinopse: {sinopsePT || movieDesc.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
