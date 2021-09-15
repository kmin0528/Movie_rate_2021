import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies:[],
  };
  getMovies = async () => {  //javaScript에게 getMovies() 함수는 시간이 필요하다.
    const{
      data: { //여기서 data ->,
        data: {movies}, //여기서 data -> movies 가 진행된다.
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");// axios.get()의 실행을 기다려달라고 한다. // 평점 내림차순 데이터 GET
    this.setState({movies, isLoading: false}); // 구조 분해 할당으로 얻은 영화 데이터가 있는 변수
  }              //↑state//
    
  componentDidMount() {
    // 영화 데이터 로딩
    this.getMovies();
  }
  render () {
    const { isLoading ,movies} = this.state; 
    return (
    <section className = "container">   
      {isLoading ? (
        <div className ="loader">
          <span className = "loader__text">Loading...</span> 
          </div>
          ):( 
          <div className ="movies">  
            {movies.map(movie => (
            //movies는 배열, 배열의 원소 한개가 movie로 넘어온다.
       <Movie 
          id={movie.id}
          year={movie.year}
          title={movie.title}
          summary={movie.summary}
          poster={movie.medium_cover_image}
          genres={movie.genres}
            />
      ))} 
      {/*  //Movie 컴포넌트 출력 */}
    </div>
    )} 
    </section>
    //'We are ready 자리에 영화 데이터 출력함'
    );
  }
}

export default Home;
