<template>
  <div id="Library">
      <div id="top-panel">
          <div id="search-wrapper">
              Search
              <input type="text" v-model="search.for">
              in
              <select name="search-attributes" v-model="search.by">
                  <option 
                    v-for="(atr, key) in movieProps"
                    :key="key"
                    :value="atr"
                  >
                  {{ atr }}
                  </option>
              </select>
          </div>
          
          <div id="sort-wrapper">
              Sort by
              <select name="sort-attributes" v-model="sort.by">
                  <option 
                    v-for="(atr, key) in movieProps"
                    :key="key"
                    :value="atr"
                  >
                  {{ atr }}
                  </option>
              </select>
          </div>

      </div>

      <movie-tile
        v-for="item in movies"
        :key="getMovieIndex(item)"

        :movieInfo="item"
      />

      <button id="newMovie" @click="addMovie()">Add New Movie</button>
  </div>
</template>

<script>

import movieTile from "./MovieTile.vue"

export default {
    name: "Library",
    components: {
        movieTile
    },

    data(){
        return{
            search: {
                for: "",
                by: null
            },
            sort: {
                by: null
            }
        }
    },

    computed: {
        movies() {
            const search = this.search;
            const sort = this.sort;
            const movies = this.$store.getters["getMovies"];

            let res = [];


            if (search.by !== null) {
                res = movies.filter(e => {
                        const value = e[search.by];

                        if (typeof value === "string") {
                            const upValue = value.toUpperCase();
                            const upSearch = search.for.toUpperCase();
                           
                           return upValue.includes(upSearch);
                        }
                        if (typeof value === "number") {
                            return value === parseInt(search.for);
                        }
                        if (Array.isArray(value)) {
                            return value.filter(l => {
                                const upL = l.toUpperCase();
                                const upSearch = search.for.toUpperCase();
                                
                                return upL.includes(upSearch);
                            }).length > 0;
                        }
                    } 
                );
            }
            if (search.for === "" || search.by === null) {
               res = movies;
            }

            if (sort.by !== null) {
              res = res.sort((a, b) => {
                    return (a[sort.by] > b[sort.by]) ? 1 : -1;
                });
            }

            return res;
        },
        movieProps(){
            const movies = this.$store.getters["getMovies"];
            if (movies[0] === undefined || movies[0] === null) {
                return ["No Value"];
            }
            return [null, ...Object.keys(movies[0]).sort()];
        }
    },

    methods: {
        getMovieIndex(movie){
            return this.$store.state.movies.findIndex(e => e === movie);
        },
        addMovie(){
            this.$store.state.movies.push(
                this.$store.getters["getMovieTemplate"]
            )
        }
    }
}
</script>

<style>
.movie-tile {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 5vh auto;
    border: 1px solid grey;
    border-radius: 25px;
    background-color: #dad8d8;
    color: #042b5f;
    font-size: 20px;
    padding: 0px 25px 10px;
}

button.edit {
    width: 80px;
    display: flex;
    justify-content: center;
    align-self: end;
    margin-top: 10px;
    background: #19a7fa;
    border: 1px solid black;
    border-radius: 5px;
    padding: 2.5px 0;
}

button.edit:hover {
    filter: brightness(0.8);
    cursor: pointer;
}

.movie-tile .item {
    display: grid;
    grid-template-columns: 160px 1fr;
    grid-template-rows: 1fr;
    text-align: left;
    margin: 2.5px 0;
}

.item-wrapper {
    display: grid;
    grid-template-rows: 1fr;
    text-align: left;
    margin: 12.5px 0;
}

.item-wrapper > div {
    padding-left: 160px;
}

.item-title {
    font-weight: bold;
    margin-right: 15px;
    display: flex;
    align-items: center;
}

.long-text input{
    width: 99%;
}

#top-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 80vw;
    margin: auto;
}

button#newMovie {
    margin-bottom: 35px;
    border-radius: 5px;
    border: 1px solid black;
    width: 200px;
    height: 50px;
    font-size: 18px;
    background: #cf7024;
}

button#newMovie:hover {
    cursor: pointer;
    filter: brightness(0.8);
}

div[name='movie-title'] {
    font-size: 28px;
    font-weight: bold;
}

</style>