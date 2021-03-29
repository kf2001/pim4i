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
    <el-table :data="Todos" style="width: 100%">
      <el-table-column label="Descrizione" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.descrizione }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Importanza" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.importanza }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Fatto!" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fatto }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Fatto!">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 
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

   -->
  </div>
</template>

<style lang="css"></style>
