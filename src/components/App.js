import React from "react";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    movies: [],
    searchQuery: "",
  };

  //fetch'den gelen promiseleri asenkron yapıyı kabul etmek için async ve await kullandık
  // async componentDidMount() {
  //   //verilerimizin olduğu yer URL
  //   const baseURL = "http://localhost:3002/movies";
  //   const response = await fetch(baseURL);
  //   console.log(response)
  //   //response.json demek; gelen veri json formatında olsun.
  //   const data = await response.json();
  //   console.log(data)
  //   //gelen data'yı movies'in içine yerleştirdik.
  //   this.setState({movies: data})
  // }

  //axios ile tek seferde verileri json formatında aldık.
  //yukarındankinden farkı response fetch kullanmadık. response ile çevirmemize de gerek kalmadan direkt dataya ulaştık
  async componentDidMount() {
    //edit kısmında editlememize rağmen sayfayı yenilemeden yaptığımız değişikliği görmüyorduk. getMovies kullanarak direkt getirmiş olduk 
this.getMovies();

   // const response = await axios.get("http://localhost:3002/movies");
    //console.log(response);
   // this.setState({ movies: response.data });
  }
  async getMovies() {
    const response = await axios.get("http://localhost:3002/movies");
    this.setState({ movies: response.data });
  }

  // deleteMovie = (movie) => {
  //   const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

  //FETCH API
  // deleteMovie = async (movie) => {
  //   const baseURL = `http://localhost:3002/movies/${movie.id}`
  //   await fetch(baseURL, {
  //     method:"DELETE"
  //   })
  //    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

  //AXİOS API
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3002/movies/${movie.id}`);
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    //movies'i NewMovieList olarak değiştirdik. Elimizde film bilgisi olmasaydı bunu kullanırdık.
    // this.setState({
    //   movies: newMovieList
    // })

    // Yukarıdakine alternatif, diğer yol.
    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  //SEARCH MOVIE
  searchMovie = (event) => {
    //search butonunda yazı yazdığımız değerler
    //console.log(event.target.value)

    //state'i update ettik. Her değişiklik yaptığımızda uptade etmiş olacağız.
    this.setState({ searchQuery: event.target.value });
  };

  //ADD MOVIE
  addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)
    this.setState( state =>({
      movie:state.movies.concat([movie])
    }))
  }

  // EDIT MOVİE
  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
    this.getMovies();

  }

  render() {
    let filteredMovies = this.state.movies.filter((movie) => {
      return (
        movie.name
          .toLowerCase()
          .indexOf(this.state.searchQuery.toLowerCase()) !== -1
      );
    }
    //id büyükten küçüğe sıraladık. 1; 2.parametreyi  verir. -1 ise büyük yani 1.parametre olanı verir. 0 ise eşit olanı
    ).sort((a, b)=>{
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
    });

    return (
      <Router>
        <Switch>
          <div className="mt-3">
            <div className="container">
              <Route
                path="/"
                exact
                render={() => (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-lg-12 mb-5">
                        <SearchBar searchMovieProp={this.searchMovie} />
                      </div>
                    </div>
                    <MovieList
                      movies={filteredMovies}
                      deleteMovieProp={this.deleteMovie} //delete'i propslayacağız
                    />
                  </React.Fragment>
                )}
              ></Route>
              <Route
                path="/add"
                render={({history}) => (
                  <AddMovie
                  onAddMovie = {(movie)=> {this.addMovie(movie)
                    history.push("/")
                  }}
                  />
                )} >

                  </Route>
              <Route
                path="/edit/:id" 
                render={(props) => (
                  <EditMovie
                  {...props}
                    onEditMovie={(id, movie) => {
                      this.editMovie(id, movie)
                     
                    }}
                  />
                )} >

              </Route>
                 

            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
