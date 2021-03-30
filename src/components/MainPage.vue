<script>
import MyCal from "../views/MyCal.vue";

import MyToDo from "../views/ToDo.vue";
import MyStick from "../views/StickBoard.vue";

export default {
  name: "MainPage",
  components: {
    MyCal,

    MyToDo,
    MyStick,
  },
  data: function () {
    return {};
  },
  created: function () {},

  methods: {},
};
</script>

<template>
  <div>
    <div style="height: 100%; float: left">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <span slot="title"> <router-link to="/calendar">Calendario</router-link></span>
        </el-menu-item>

        <el-menu-item index="2">
          <span slot="title"> <router-link to="/todo">To Do</router-link></span>
        </el-menu-item>

        <el-menu-item index="3">
          <span slot="title"> <router-link to="/stick">StickBoard</router-link></span>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="height: 100%; float: left; text-align: left">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="css"></style>
