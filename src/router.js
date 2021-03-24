import Vue from 'vue'
	import Router from 'vue-router'

    import MyCal from './views/MyCal.vue'
    import MyPin from './views/PinBoard.vue'
    import MyToDo from './views/ToDo.vue'
	import MyStick from './views/StickBoard.vue'

	Vue.use(Router)
	export default new Router({
	  routes: [
		{
		  path: '/calendar',
		  name: 'Calendar',
		  component: MyCal
		},
		{
		  path: '/pinboard',
		  name: 'Pinboard',
		  component: MyPin
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