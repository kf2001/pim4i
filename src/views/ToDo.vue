<script>
export default {
  name: "MyToDo",
  components: {},
  data: function () {
    return {
      value: 1,
      Todos: [],
    };
  },
  mounted: function () {},
  created: function () {
    this.carica();
  },

  methods: {
    salva() {
      localStorage.Todos = JSON.stringify(this.Todos);
    },
    carica() {
      if (localStorage.Todos) this.Todos = JSON.parse(localStorage.Todos);
    },
    elimina(idx) {
      console.log(idx);
      this.Todos.splice(idx, 1);
    },

    aggiungi() {
      let newTodo = {
        descrizione: "",
        fatto: false,
        importanza: 0,
      };

      this.Todos.push(newTodo);
    },
  },
};
</script>

<template>
  <div>
    <el-card style="width: 500px">
      <div slot="header" class="clearfix">
        <el-button
          type="success"
          icon="el-icon-plus"
          size="small"
          circle
          @click="aggiungi"
        ></el-button>
        <el-button
          type="info"
          icon="el-icon-folder"
          circle
          size="small"
          @click="salva"
        ></el-button>
      </div>
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
