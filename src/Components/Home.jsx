import React, { useState } from "react";
import "./Home.scss";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const apiKey = "888de1f618cf3a81896f18d51b16df2b";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
const upcoming = "upcoming";
const random= Math.floor(Math.random()*19);

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({
  title,
  arr = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Coffee_Run-movie_poster.png/600px-Coffee_Run-movie_poster.png?20200610231127",
    },
  ],
}) => (
  <div className="row">
    <h2>{title}</h2>

    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [play, setPlay] = useState([]);
  const [popularMovies, setpopularMovies] = useState([]);
  const [topRatedMovies, settopRatedMovies] = useState([]);
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    // https://api.themoviedb.org/3/movie/now_playing?api_key=888de1f618cf3a81896f18d51b16df2b&language=en-US&page=1

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setPlay(results);
    };

    const fetchpopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setpopularMovies(results);
    };
    const fetchtopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      settopRatedMovies(results);
    };
    const fetchupcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setupcomingMovies(results);
    };
    const fetchGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

    fetchNowPlaying();
    fetchpopular();
    fetchtopRated();
    fetchupcoming();
    fetchGenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: play[0]
            ? `url(${imgUrl}${play[random].backdrop_path})`
            : "rgb(16, 16, 16)",
        }}
      >
        {play[0] && <h1>{play[random].original_title}</h1>}

        {play[0] && <p>{play[random].overview}</p>}
        
        <div>
        <button><BiPlay/> Play</button>
        <button>My List <AiOutlinePlus/> </button>
        </div>
      </div>

      <Row title={"Now Playing"} arr={play} />
      <Row title={"Populer Movies"} arr={popularMovies} />
      <Row title={"Top Rated Movies"} arr={topRatedMovies} />
      <Row title={"Upcoming Movies"} arr={upcomingMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
