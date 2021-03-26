<script>
export default {
  name: "MyToDo",
  components: {},
  data: function () {
    return {
      value: 1,
      Todos: [
        { descrizione: "Do the dishes", fatto: false, importanza: 1, id: 0 },
        {
          descrizione: "Take out the trash",
          fatto: false,
          importanza: 2,
          id: 1,
        },
        {
          descrizione: "Finish doing laundry",
          fatto: true,
          importanza: 3,
          id: 2,
        },
      ],
    };
  },
  mounted: function () {},
  created: function () {
    this.carica();
  },

  methods: {
    handleRate(evt, props) {
      console.log(888);
      this.value = props.rating;
    },
    salva() {
      localStorage.Todo = JSON.stringify(this.Todo);
    },
    carica() {
      if (localStorage.Todo) this.Todo = JSON.parse(localStorage.Todo);
    },
  },
};
</script>

<template>
  <div>
    <div is="sui-segment" style="padding-left: 300px">
      <sui-table fixed>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell>Descrizione</sui-table-header-cell>
            <sui-table-header-cell>Importanza</sui-table-header-cell>
            <sui-table-header-cell>Fatto!</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row v-for="todo in Todos" :key="todo.id">
            <sui-table-cell>{{ todo.descrizione }}</sui-table-cell>
            <sui-table-cell>
              <sui-rating :max-rating="5" @rate="handleRate" :v-model="todo.importanza" />
            </sui-table-cell>
            <sui-table-cell>
              <sui-checkbox label="" toggle v-model="todo.fatto"
            /></sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>

      <!-- 



      <div v-for="todo in Todos" :key="todo.id">
        <span>{{ todo.descrizione }}</span>
        <span> <sui-checkbox label="Fatto!" toggle v-model="todo.fatto" /></span>
        <span> <sui-rating :max-rating="5" :rating="todo.importanza" /></span>
      </div> -->
    </div>
  </div>
</template>

<style lang="css"></style>
