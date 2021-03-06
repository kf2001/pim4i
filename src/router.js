import Vue from 'vue'
	import Router from 'vue-router'

    import MyCal from './views/MyCal.vue'
    
    import MyToDo from './views/ToDo.vue'
	import MyStick from './views/StickBoard.vue'
	import Home from './views/Home.vue'

	Vue.use(Router)
	export default new Router({
	  routes: [

		{
            path: '/home',
            name: 'Home',
            component: Home
          },
		{
		  path: '/calendar',
		  name: 'Calendar',
		  component: MyCal
		},
	
        {
            path: '/todo',
            name: 'Todo',
            component: MyToDo
          },
		  {
            path: '/stick',
            name: 'Stick',
            component: MyStick
          }
	  ]
	})