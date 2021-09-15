import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';
import {Link} from 'react-router-dom';

function Movie({ title, year, summary, poster, genres}) {
    return (
        <div className = "movie">
            <Link
            to={{
                pathname: '/movie-detail',
                state: {year,title,summary,poster,genres},            }}
            >
            <img src = {poster} alt ={title} title={title}/>
            <div className = "movie__data">
                <h3 className ="movie__title">{title}</h3>
                <h5 className ="movie__year">{year}</h5>
                <ul className= "movie__genres">
                    {genres.map((genre,index) => {
                        return <li key={index} className ="movie__genre">{genre}</li>; //li 엘리멘트 여러 개 출력
                    })}
                </ul>
                <p className = "movie__summary">{summary.slice(0,180)}...</p>
                {/*시놉시스 글자 180자 이내로 제한*/}
            </div>
            </Link>
        </div>
    );
}

Movie.propTypes = {
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired, 
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}; 
// API내에서 필요한 값들 호출
export default Movie;