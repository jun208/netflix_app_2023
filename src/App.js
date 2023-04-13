import DetailPage from 'Routes/DetailPage';
import MainPage from 'Routes/MainPage';
import SearchPage from 'Routes/SearchPage';
import requests from 'api/requests';
import Banner from 'components/Banner';
import Footer from 'components/Footer';
import Nav from 'components/Nav';
import Row from 'components/Row';
import { Outlet, Route, Routes } from 'react-router-dom';
import 'styles/App.css'

const Layout = () => {
  return(
    <div>
    <Nav />
    <Outlet /> 
    {/* <Outlet />리액트 라우터 돔에 있는 함수  
      자식 경로 요소를 렌더링하려면 부모 경로 요소에서 <Outlet>을 사용해야 한다.
    */}
    <Footer />
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />}/>
          {/* index => localhost:3000/ 부모주소를 그대로 가져옴 */}
          <Route path=':movieId' element={<DetailPage />}/>
          {/* state값을 붙일 때는 :를 써줘야 함. 
          :movieId = param값 */}
          <Route path='search' element={<SearchPage />}/> 

          {/* 중첩 라우트 */}
        </Route>
      </Routes>

      {/* <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
      <Row title="Animation Movie" id="AM" fetchUrl={requests.fetchAnimationMovies}/>
      <Row title="Family Movie" id="FM" fetchUrl={requests.fetchFamilyMovies}/>
      <Row title="Adventure Movie" id="DM" fetchUrl={requests.fetchAdventureMovies}/>
      <Row title="Science Fiction Movie" id="SM" fetchUrl={requests.fetchScienceFictionMovies}/>
      <Row title="Action Movie" id="CM" fetchUrl={requests.fetchAction}/>
      <Footer /> */}

     
    </div>
  );
}

export default App;
