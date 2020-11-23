//引入角色接口
import { getRoleList } from '../../util/axios'

//state
const state = {
        roleList: []
    }
    //getters
const getters = {
    //导出角色
    getRoleList() {
        return state.roleList
    }
}

//mutations
const mutations = {
    //修改state的roleList
    REQ_ROLELIST(state, payload) {
        state.roleList = payload
    }
}

//actions
const actions = {
    //封装一个获取角色列表的行动
    getRoleAction({ commit }) {
        //调取列表接口
        getRoleList()
            .then(res => {
                if (res.data.code == 200) {
                    //提交一个mutations
                    commit('REQ_ROLELIST', res.data.list)
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