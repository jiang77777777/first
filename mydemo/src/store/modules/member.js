//引入封装好的接口
import { getMemberList } from '../../util/axios'

//state
const state = {
    memberList: []
}

//getters
const getters = {
    getMemberList(state) {
        return state.memberList
    }
}

//mutations
const mutations = {
    REQ_MEMBERLIST(state, payload) {
        state.memberList = payload
    }
}

//actions
const actions = {
    getMemberListAction({ commit }) {
        getMemberList({
                istree: true
            })
            .then(res => {
                console.log(res, 'member 相应')
                if (res.data.code == 200) {

                    commit("REQ_MEMBERLIST", res.data.list)
                }
            })
            .catch(err => {

                console.log(err, '错误响应')
            })
    }
}


//默认导出所有的内容
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
}