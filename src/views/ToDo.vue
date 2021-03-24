<script>




export default {
  name: "MyToDo",
  components: {
   
  },
  data: function () {
    return {
      Todo:[]
     
    };
  },
    mounted: function () {
    console.log("cazzo")
  },
  created: function () {
    this.carica();
  },
  
  methods: {
    salva() {
      localStorage.Todo = JSON.stringify(this.Todo);
    },
    carica() {
      if (localStorage.Todo)
        this.Todo = JSON.parse(localStorage.Todo);
    },
 
  
  },
};
</script>

<template>
<div>

  <div is="sui-segment" inverted>
    <sui-button color="red" inverted>Red</sui-button>
    <sui-button color="orange" inverted>Orange</sui-button>
    <sui-button color="yellow" inverted>Yellow</sui-button>
    <sui-button color="olive" inverted>Olive</sui-button>
    <sui-button color="green" inverted>Green</sui-button>
    <sui-button color="teal" inverted>Teal</sui-button>
    <sui-button color="blue" inverted>Blue</sui-button>
    <sui-button color="violet" inverted>Violet</sui-button>
    <sui-button color="purple" inverted>Purple</sui-button>
    <sui-button color="pink" inverted>Pink</sui-button>
    <sui-button color="brown" inverted>Brown</sui-button>
    <sui-button color="grey" inverted>Grey</sui-button>
    <sui-button color="black" inverted>Black</sui-button>
  </div>
  </div>
</template>

<style lang='css'>


</style>


