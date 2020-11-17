//引入角色接口
import { getSeckList } from '../../util/axios'

//state
const state = {
        seckList: []
    }
    //getters
const getters = {
    //导出角色
    getSeckList() {
        return state.seckList
    }
}

//mutations
const mutations = {
    //修改state的seckList
    REQ_SECKLIST(state, payload) {
        state.seckList = payload
    }
}

//actions
const actions = {
    //封装一个获取角色列表的行动
    getSeckListAction({ commit }) {
        //调取列表接口
        getSeckList()
            .then(res => {
                if (res.data.code == 200) {
                    //提交一个mutations
                    console.log(res, 'seckkkkk');
                    commit('REQ_SECKLIST', res.data.list)
                }
            })
    }
}

//导出
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
}