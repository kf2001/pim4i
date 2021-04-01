<script>
export default {
  name: "MyToDo",
  components: {},
  data: function () {
    return {
      Todos: [],
      TodosUnDo: [],
      modo: new Array(100).fill(0),
    };
  },
  mounted: function () {},
  created: function () {
    this.carica();
  },
  computed: {},

  methods: {
    salva() {
      localStorage.Todos = JSON.stringify(this.Todos);
    },
    carica() {
      if (localStorage.Todos) this.Todos = JSON.parse(localStorage.Todos);
      this.Todos = this.Todos.sort((a, b) => b.priorita - a.priorita);
    },
    elimina(idx) {
      console.log(idx);
      this.Todos.splice(idx, 1);
    },

    aggiungi() {
      let newTodo = {
        descrizione: "",
        fatto: false,
        priorita: 0,
      };

      this.Todos.push(newTodo);
    },
    edit(e) {
      this.modo[e] = 1;
      this.TodosUnDo = JSON.parse(JSON.stringify(this.Todos));
      this.$forceUpdate();
    },
    conferma(e) {
      console.log(e, 1);
      this.modo[e] = 0;
      this.salva();
      this.carica();
    },
    annulla(e) {
      console.log(e, 2);
      this.modo[e] = 0;

      this.Todos = JSON.parse(JSON.stringify(this.TodosUnDo));
      this.Todos = this.Todos.sort((a, b) => b.priorita - a.priorita);
    },
  },
};
</script>

<template>
  <div>
    <el-card style="width: 700px">
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
        <th style="width: 40%">Descrizione</th>

        <th style="width: 20%">Priorità</th>
        <th style="width: 10%">Fatto!</th>
        <th></th>
        <th></th>
        <th></th>
        <tr v-for="(td, idx) in Todos" :key="idx">
          <td>
            <el-input :disabled="!modo[idx]" v-model="td.descrizione"></el-input>
          </td>

          <td>
            <el-slider
              :disabled="!modo[idx]"
              v-model="td.priorita"
              :step="1"
              :min="1"
              :max="10"
              show-stops
            >
            </el-slider>
          </td>
          <td>
            <el-checkbox :disabled="!modo[idx]" v-model="td.fatto"></el-checkbox>
          </td>
          <td>
            <el-button
              v-show="!modo[idx]"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="elimina(idx)"
            ></el-button>
            <el-button
              v-show="modo[idx]"
              type="success"
              icon="el-icon-check"
              circle
              size="mini"
              @click="conferma(idx)"
            ></el-button>

            <el-button
              v-show="!modo[idx]"
              type="warning"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="edit(idx)"
            ></el-button>
            <el-button
              v-show="modo[idx]"
              type="danger"
              icon="el-icon-error"
              circle
              size="mini"
              @click="annulla(idx)"
            ></el-button>
          </td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<style lang="css">
td {
  padding: 1em;
}
</style>
