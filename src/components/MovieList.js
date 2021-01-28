import React from "react";
import { Link } from 'react-router-dom';
//state durumu ortadan kalktığı için functional yapıya çevirdik class componentinden

const MovieList = (props) => {

  const truncateOverview = (string, maxLength) => {
    if (!string) return null;
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)} ...`
  }



// function handleClick(event){
//   console.log(event.pageY);
// }

  return (
    //ilk önce col ve row'u ayırdık col kısmını alıp map kısmının içine koyduk
    //this.props.movie kısmındaki this'i sildik class compenent yapısını silince. Yoksa hata veriyor
    <div className="row">
      {props.movies.map((movie, i) => (
        //movie.id yazarak componentleri birbirinden ayırt etmiş olduk
        <div className="col-lg-4" key={i}>
          <div className="card mb-4 shadow-sm">
            <img
              src={movie.imageURL}
              className="card-img-top"
              alt="Sample Movie"
              height="500"
            />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">{truncateOverview(movie.overview, 100)}</p>
              <div className="main-box">
                <button type="button" onClick={(event)=> props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">
                  Delete
                </button>
              <Link type="button" 
                  className="btn btn-md btn-outline-primary" to={`edit/${movie.id}`}> Edit </Link> 
                <h2>
                  <span className="badge badge-info">{movie.rating}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
