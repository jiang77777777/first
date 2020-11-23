// 商品管理
// 引入列表
import { getGoodsList, getGoodsCount } from '../../util/axios' //引入角色接口
//state
const state = {
    goodslist: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
};
//getters
const getters = {
    //导出用户列表
    getGoodsList() {
        return state.goodslist;
    },
    //导出总条数
    getGoodsCount() {
        return state.total;
    },
    //导出总条数
    getGoodsSize() {
        return state.size;
    }
};

//mutations
const mutations = {
    //修改state的SpecsList
    REQ_GOODSLIST(state, payload) {
        state.goodslist = payload;
    },
    //修改state中的total总条数
    REQ_GOODSCOUNT(state, payload) {
        state.total = payload;
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
};

//actions
const actions = {
    //封装一个获取管理员列表的行动
    getGoodsAction(context) {
        console.log(context, "GOODS");
        //调取列表接口
        getGoodsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                console.log(res, "goods");
                //提交一个mutations
                // context.commit("REQ_GOODSLIST", res.data.list);
                //转化数据
                let data = res.data.list ? res.data.list : []
                    //提交一个mutations
                context.commit("REQ_GOODSLIST", data);
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
        getGoodsCount().then(res => {
            if (res.data.code == 200) {
                commit("REQ_GOODSCOUNT", res.data.list[0].total);
            }
        });
    },
    //封装一个修改page的action
    changePageAction(context, payload) {
        console.log(context, '页码哈哈哈哈哈')
        context.commit('REQ_PAGE', payload)
            //重新调取列表
        context.dispatch('getGoodsAction')
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