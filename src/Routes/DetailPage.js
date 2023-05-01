import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function DetailPage() {
  const[movie, setMovie] = useState({});
  let {movieId} = useParams(); //주소창에서 param값만 가져옴
  console.log('useParams()->', useParams())
  console.log('movieId->',movieId);

  useEffect (() => {
      fetchData();
    
  },[movieId]);

  const fetchData = async() => {
    try{
     
      const request = await axios.get(`/movie/${movieId}`,{
        params: {append_to_response: "videos"}
      })
      console.log('detailrequest->',request)
      setMovie(request.data);

   

    }catch(error){
      console.log("error->", error)
      
      

    }
  };

  // const truncate = (str, n) => {
  //   return str?.length > n ?str.substr
  // }



  if(!movie) return <div>...loading</div>;

  return (
    <>
    <section>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title || movie.name || movie.original_name}/>
      <div className='detail__content'>

      </div>
    </section>
    <h2 className='detail__title'>{movie.title}</h2>
      <p>평점:{movie.vote_average}</p>
      <p>{movie.overview}</p>
      {/* <iframe src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&playlist=${movie.videos.results[0]?.key}`}></iframe>  */}
     
     </>
  )
}

export default DetailPage