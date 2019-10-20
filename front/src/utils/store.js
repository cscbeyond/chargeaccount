// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		count: 0,
		userId: null,
		userOpenId: null,
    },
    mutations: {
        increment: (state) => {
            const obj = state
            obj.count += 1
        },
        decrement: (state) => {
            const obj = state
            obj.count -= 1
		},
		setOpenid:(state,val)=>{
			const obj = state
			state.userOpenId = val;
		},
		setUserId:(state,val)=>{
			const obj = state;
			state.userId = val;
		}
    }
})

export default store
