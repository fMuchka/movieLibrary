<template>
  <div class="movie-tile">
    <button class="edit" @click="changeEditMode()">{{ editButtonText }}</button>
    <label class="item">
        <span class="item-title">Title:</span>
        <MTinput name="movie-title" :editable="editMode" v-model="movieInfo['name']"/>
    </label>
    
    <label class="item">
        <span class="item-title">Release date:</span>
        <MTinput :editable="editMode" v-model="movieInfo['release-date']"/>
    </label>

    <label class="item">
        <span class="item-title">Runtime:</span>
        <MTinput :editable="editMode" v-model="movieInfo['runtime']"/>
    </label>

    <div class="item-wrapper">
        <span class="item-title">Categories:</span>
        <div
         v-for="(t, i) in movieInfo['categories']"
         :key="i"
        >
            <MTinput 
                :editable="editMode" 
                v-model="movieInfo['categories'][i]" 
                v-on:keyup.enter="movieInfo['categories'].push('')"
            />
        </div>
    </div>

    <label class="item">
        <span class="item-title">Director:</span>
        <MTinput :editable="editMode" v-model="movieInfo['director']"/>
    </label>

    <div class="item-wrapper">
        <span class="item-title">Writers:</span>
        <div
         v-for="(w, k) in ensureArray(movieInfo['writer'])"
         :key="k"
        >
         <MTinput 
            v-if="Array.isArray(movieInfo['writer'])" 
            :editable="editMode" 
            v-model="movieInfo['writer'][k]"
            v-on:keyup.enter="movieInfo['writer'].push('')"
        />
         <MTinput 
            v-else 
            :editable="editMode" 
            v-model="movieInfo['writer']"
            v-on:keyup.enter="movieInfo['writer']=[movieInfo['writer'], '']"
        />
        </div>
    </div>


    <div class="item-wrapper">
        <span class="item-title">Actors:</span>
        <div
         v-for="(a, j) in movieInfo['actors']"
         :key="j"
        >
         <MTinput 
            :editable="editMode" 
            v-model="movieInfo['actors'][j]"
            v-on:keyup.enter="movieInfo['actors'].push('')"
        />
        </div>
    </div>

    <label class="item">
        <span class="item-title">Story:</span>
        <MTinput class="long-text" :editable="editMode" v-model="movieInfo['storyline']"/>
    </label>
  </div>
</template>

<script>
import MTinput from "./MTinput.vue"

export default {
    props:{
        movieInfo: {
            type: Object,
            default: function(){
                return this.$store.getters["getMovieTemplate"];
            }
        },
    },
    components:{
        MTinput
    },

    data(){
        return{
            editMode: false,
            editButtonText: "Edit"
        }
    },

    methods: {
        changeEditMode(){
            this.$set(this, "editMode", !this.editMode);

            if (this.editMode === false){
                const key = this.$vnode.key;
                this.$set(this, "editButtonText", "Edit");

               this.$store.dispatch("updateMovieData", {index: key, movieInfo: this.movieInfo})
               .then(console.log("Done"))
               .then(console.log(JSON.stringify(this.$store.state.movies, null, "̈́\t")))
            }else{
                this.$set(this, "editButtonText", "Confirm");
            }
        },
        
        ensureArray(item){
            if (Array.isArray(item)) {
                return item;
            }else{
                return [item];
            }
        },
    }
}
</script>

<style>

</style>