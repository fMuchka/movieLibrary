import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    movies: [],
  },
  mutations: {
    
  },
  actions: {

    fetchMovieData({state}) {
      const url = "https://gist.githubusercontent.com/jechtom-srovnejto/0353eef29258e4f59422a8a753ff8874/raw/0a2971d0900d5645b3209a1ebfe73dceb2d6e4fd/movies.json";

      fetch(url)
        .then(data => data.json())
        .then(result =>
          state.movies = result.Movies
        )
        .catch(err => console.log(err) /* better err handle would be nice */);
    },

    updateMovieData({ state }, {index, movieInfo}) {
      // should be API call, for now just a current state update

      state.movies[index] = movieInfo;
    }
  },

  getters: {
    getMovies: state => {
      return state.movies;
    },

    getMovieTemplate: () => {
      return {
        "actors": [],
        "categories": [],
        "director": "",
        "name": "",
        "release-date": "",
        "runtime": 0,
        "storyline": "",
        "writer": [],
        "year": 0
      }
    }
  },
  modules: {},
});
