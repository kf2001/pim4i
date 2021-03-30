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
    elimina(idx) {
      console.log(idx);
      this.Todos.splice(idx, 1);
    },
  },
};
</script>

<template>
  <div>
    <el-card style="width: 500px">
      <table>
        <th>Descrizione</th>
        <th>Fatto!</th>
        <th>Importanza</th>
        <tr v-for="(td, idx) in Todos" :key="idx">
          <td>
            <el-input v-model="td.descrizione"></el-input>
          </td>
          <td>
            <el-checkbox v-model="td.fatto"></el-checkbox>
            <!-- <el-switch v-model="td.fatto" active-text="" inactive-text=""> </el-switch> -->
          </td>
          <td>
            <el-rate v-model="td.importanza"></el-rate>
          </td>
          <td>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="elimina(idx)"
            ></el-button>
          </td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<style lang="css"></style>
