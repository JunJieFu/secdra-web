import httpUtil from "../assets/js/util/httpUtil";
import {Result} from "../assets/js/model/base";

const state = {};

const mutations = {};

const actions = {
  //分页获取数据
  async APaging(context, params) {
    return await httpUtil.get("/draw/paging", params);
  },
  //获取推荐列表
  async AListByRecommend(context, params) {
    return await httpUtil.get("/draw/listByRecommend", params);
  },
  //分页获取推荐
  async APagingByRecommend(context, params) {
    return await httpUtil.get("/draw/pagingByRecommend", params);
  },
  //获取分页收藏
  async APagingCollection(context,params){
    return await httpUtil.get("/collection/paging",params);
  },
  //收藏
  async ACollection(context,params){
    return await httpUtil.post("/collection/focus", params);
  },
  //批量取消收藏
  async AUnCollection(context,params){
    return await httpUtil.post("/collection/unFocus", params);
  },
  //按标签获取第一张图片
  async AGetFirstByTag(context,params){
    return await httpUtil.get("/draw/getFirstByTag",params);
  },
  //统计标签
  async ACountByTag(context,params){
    return await httpUtil.get("/draw/countByTag",params);
  },
  //按用户获取
  async APagingByUserId(context,params){
    return await httpUtil.get("/draw/pagingByUserId",params);
  },
  //保存图片
  async ASave(context,params){
    return await httpUtil.post("/draw/save",params);
  },
  //保存图片
  async AUpdate(context,params){
    return await httpUtil.post("/draw/update",params);
  },
  //批量更新图片
  async ABatchUpdate(context,params){
    return await httpUtil.post("/draw/batchUpdate",params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
