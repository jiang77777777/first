//引入角色接口
import { getSpecsList, getSpecsCount } from "../../util/axios";

//state
const state = {
    specsList: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
};
//getters
const getters = {
    //导出用户列表
    getSpecsList() {
        return state.specsList;
    },
    //导出总条数
    getSpecsCount() {
        return state.total;
    },
    //导出总条数
    getSpecsSize() {
        return state.size;
    }
};

//mutations
const mutations = {
    //修改state的SpecsList
    REQ_SPECSLIST(state, payload) {
        state.specsList = payload;
    },
    //修改state中的total总条数
    REQ_SPECSCOUNT(state, payload) {
        state.total = payload;
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
};

//actions
const actions = {
    //封装一个获取管理员列表的行动
    getSpecsAction(context) {
        console.log(context, "context");
        //调取列表接口
        getSpecsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                console.log(res, "响应数据");
                //提交一个mutations
                // context.commit("REQ_SPECSLIST", res.data.list);
                let data = res.data.list ? res.data.list : []
                    //提交一个mutations
                context.commit("REQ_SPECSLIST", data);
                //判断一下，当前是不是第一页 如果不是并且你当前的这个列表等于0
                if (context.state.page != 1 && data.length == 0) {
                    //重新调取修改页码的行动
                    context.dispatch('changePageAction', context.state.page - 1)
                        //重新调取列表
                    context.dispatch('getUserAction')
                    return
                }
            }
        });
    },
    //封装一个获取总条数事件
    getCountAction({ commit }) {
        getSpecsCount().then(res => {
            if (res.data.code == 200) {
                commit("REQ_SPECSCOUNT", res.data.list[0].total);
            }
        });
    },
    //封装一个修改page的action
    changePageAction(context, payload) {
        console.log(context, '页码哈哈哈哈哈')
        context.commit('REQ_PAGE', payload)
            //重新调取列表
        context.dispatch('getSpecsAction')
    }
};

//导出
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
};