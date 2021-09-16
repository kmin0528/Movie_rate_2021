# Movie_rate 2021
React JS Fundamentals Course 2021

<h2>-----React가 동작하는 원리 ------</h2>



<p>1.<body>태그 내에 <.div id ="root">□<./div> 사이가 비어있는데 </p>
<p>2.  react는 작성한 프로젝트 폴더에 있는 코드를 자바스크립트를 이용하여 해석한다.</p>
<p>3.  그리고 해석한 결과물을 index.html로 끼워넣는다.</p>
<p>4.  그래서 index.html 파일에 없던 <.div>HI HI<./div>가 react 앱이 실행되면서 생기게 된다. </p>  
</br>

  <p>ReactDOM.render(<App />,document.getElementById('root'));</p>
  <p>App.js 파일에 작성한 코드를 index.html의 아이디가 root인 element에 넣어준다.</p>



  <h3>map() 함수 사용</h3>
  <p>배열의 모든 원소마다 특정 작업을 하는 함수를 적용 후 </p>
  <p>그 함수가 반환한 결과를 모아서 배열로 반환을 한다. </p>
  </br><p>↳ map()함수 사용으로 배열의 데이터수 무관하게 컴포넌트를 여러개 손쉽게 출력할 수 있다. </p>
  <p>※※리스트의 각 key값들은 유일성을 만족해야함※※</p>
  <p>Q1. JS에서 일반 함수 내에 배열로 저장하는 형태와 map() 함수로 배열을 저장하는 형태의 차이점?</p>

  

  <p>-----------------------------------------------------</p>
  <p>rating props 컴포넌트에 전달, </p>
  <p>=> 이 과정에서 props의 자료형을 검사할 수 있도록 만들어주는 prop-types도구 설치 (npm install prop-types)</p>
  <p>prop-types는 컴포넌트가 전달받은 props가 정말 내가 원하는 값인지 확인을 해준다.</p>



 <h3>동적 데이터를 다루기 위한 state 사용</h3>
  <p>객체의 구성 요소중 일부가, 있다가 없어질 수도 있고, 구성 요소가 하나였다가 둘이 될 수도 있는데, props는 이러한 데이터를 다루지 못하기 때문에 state를 사용함으로서 보완한다.</p>
 <p>------state 사용하기 ------</p>

```jsx
class App extends React.Component {
    state = {									 // 반드시 클래스형  컴포넌트내에서 사용 //
     count:0, 									//count 키 추가 후 키값 임의로 0 지정// 
    };
    render() {
      return  The number is: {this.state.count};          //state 출력//
    }
  }
    export default App 
```

<u>주의 사항</u>

1. 원래 react는 state가 변경되면 render() 함수를 다시 실행하여 변경된 state를 화면에 출력한다.
2. 그러나 state를 직접 변경하는 경우에는 render() 함수를 다시 실행하지 않는다. 
3. react는 이러한 방식으로 state를 직접 변경할 수 없도록 제한함



<h4>React에서 Mount로 분류하는 생명 주기 함수</h4>



```jsx
constructor(props){				//render() 함수보다 먼저 실행됨(React.Component에 포함된 함수가 아닌 JS 함수!)
    super(props);
    console.log('hello');
  }  
state= {
    count: 0,
  };
  add = () =>{
    this.setState(current=> ({ count: current.count +1 }));
  };
  minus = () =>{
    this.setState(current=>({ count: current.count-1}));
  };
  componentDidMount() {			// 컴포넌트가 처음 화면에 그려지면 실행 됨	
    console.log('component rendered');
  }
  componentDidUpdate() {		// 화면이 새로 그려지는 시점에 실행됨
    console.log('I just updated');
  }
  componentWillUnmount(){ 		// 컴포넌트가 화면에서 떠날 때 실행됨
    console.log('Goodbye, cruel world');
  }
  render() {			
    console.log("I'm rendering");
    return ( 
      <div>
        <h1>The number is: {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );  
  }
}
```







<h3>영화 데이터 저장</h3>

```jsx
class App extends React.Component {
  state = {
    isLoading: true,
    movies:[],
  };
  componentDidMount() {
    // 영화 데이터 로딩
    setTimeout(() => {
      this.setState({ isLoading: false});
    }, 6000);
  }
  render () {
    const { isLoading } = this.state; 
    return <div> {isLoading ? 'Loading...' : 'We are ready'} </div>;
    //'We are ready 자리에 영화 데이터 출력함'
  }
}

export default App;
```



<h4>영화 API 사용해보기</h4>

1. axios 설치

   -  -npm install axios

   - Chrome 주소창에 yts.It/api 입력 // 'List Movies API'사용

   

<h5>활용</h5>



```jsx
import React from 'react';
import axios from 'axios';
import Movie from './Movie';

class App extends React.Component {
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
    return <div> {isLoading ? 'Loading...' : movies.map((movie)=> {
   //movies는 배열, 배열의 원소 한개가 movie로 넘어온다.
      return (
       <Movie 
          id={movie.id}
          year={movie.year}
          title={movie.title}
          summary={movie.summary}
          poset={movie.medium_cover_image}
            />
      ); // Movie 컴포넌트 출력
    })} </div>;
    //'We are ready 자리에 영화 데이터 출력함'
  }
}

export default App;


```

<h5>movie.js선언</h5>

```jsx
import React from 'react';
import PropTypes from 'prop-types';

function Movie({id, title, year, summary, poster}) {
    return <h4>{title}</h4>;
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired, 
}; 
// API내에서 필요한 값들 호출
export default Movie;
```



<h4>CSS를 적용하기 위한 HTML 추가</h4>

```css
.movies .movie {
    background-color: white;
    margin-bottom: 70px;
    font-weight: 300;
    padding:20px;
    border-radius:5px;
    color: #adaeb9;
    box-shadow: 0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px
     rgba(0,0,0,0.3),
        0 -6px 16px -6px rgba(0, 0, 0, 0.025);
        
}
.movies .movie a {
    display:gird;
    grid-template-columns: minmax(150px, 1fr) 2fr;
    grid-gap:20px;
    text-decoration: none;
    color: inherit;
}
.movie img {
    position: relative;
    top: -50px;
    max-width: 150px;
    width: 100%;
    margin-right: 30px;
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3),
        0 -12px 36px -8px rgba(0 ,0 ,0 , 0.025);
}
.movie .movie__title,
.movie .movie__year {
    margin:0;
    font-weight: 300;
}
.movie .movie__title{
    margin-bottom: 5px;
    font-size: 24px;
    color: #2c2c2c;
}
.movie .movie__genres{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0px;
}
.movie__genres li,
.movie .movie__year {
    margin-right: 10px;
    font-size: 14px;
}
```

<h5>//메인페이지 구성완료//</h5>



<h3>상세 페이지 구성하기</h3>
react-router-dom 설치

- npm install react-router-dom



<h4>a href 태그</h4>

- a 엘리먼트 특성상 href속성은 페이지 전체를 다시 그림.
- 이 상태라면 필요한 부분만 다시 그려주는 React의 장점을 활용하기 힘듬
- ==> react-router-dom의 Link 컴포넌트 사용으로 해결
- import {Link} from 'react-router-dom' 를 임포트 한다.



