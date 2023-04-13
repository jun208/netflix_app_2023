import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/SearchPage.css'
import useDebounce from 'hooks/useDebounce';

function SearchPage() {
  const[searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);    
  }
  console.log('useLocation()->', useLocation())
  
  let query = useQuery(); // ?q=spiderman
  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 500)
  console.log('searchTerm->', searchTerm); //spiderman
  
  useEffect (() => {
    if(debounceSearchTerm){
      fetchSearchMovie(debounceSearchTerm);
    }

  },[debounceSearchTerm]);

  const fetchSearchMovie = async(debounceSearchTerm) => {
    try{
      //https://api.themoviedb.org/3/search/movie?&query=
      // https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
      const request =await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      console.log('request->',request)
      setSearchResults(request.data.results);
    }catch(error){
      console.log("error", error)
    }

  }
  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map(movie =>{
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500/" +  movie.backdrop_path;
          return(
            <div className='movie' onClick={()=> navigate(`/${movie.id}`)


            }>
              <div className='movie__column-poster'>
                <img src={movieImageUrl} alt={movie.title} className='movie__poster'/>
              </div>
            </div>

          )
        }
        })}
      </section>

    ) : (
      <section className="no-results">
        <div>
          <p>찾고자 하는 검색어"{searchTerm}"에 해당하는 영화가 없습니다.</p>
        </div>
      </section>

    )

  }

  return renderSearchResults();

}

export default SearchPage