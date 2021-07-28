/* 
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件  微信小程序官方开发文档寻找
  2 判断还有没有下一页数据
    1 获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 /  页容量  pagesize)
      总页数     = Math.ceil( 23 / 10 ) = 3
    2 获取到当前的页码  pagenum
    3 判断一下 当前的页码是否大于等于 总页数 
      表示 没有下一页数据

  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 来加载下一页数据
    1 当前的页码 ++
    2 重新发送请求
    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
2 下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组 
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果

 */
// pages/goods_list/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: "综合", isActive: true },
      { id: 1, value: "销量", isActive: false },
      { id: 2, value: "价格", isActive: false },
    ],
    goodsList: [],
  },
  //接口需要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },

  pageTotal: 0,
  //

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  //获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    console.log(res.data.message.total);
    const total = res.data.message.total;
    this.pageTotal = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods],
    });
    //console.log(this.pageTotal);
    //下拉刷新成功后，关闭下拉刷新动画
    wx.stopPullDownRefresh();
  },

  //标题点击事件
  handleTabsItemChange(e) {
    //console.log(e.detail);
    //获取传递过来的数据
    const { index } = e.detail;
    //获取原数组，修改源数组

    let { tabs } = this.data;
    //遍历tabs,如果index等于数组中的index,则修改数组中的isActive
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({
      tabs,
    });
  },

  //底部上拉触发事件
  onReachBottom() {
    if (this.QueryParams.pagesize >= this.pageTotal) {
      // 没有下一页数据
      wx.showToast({ title: "没有下一页数据" });
    } else {
      //有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新事件
  onPullDownRefresh() {
    // 1 重置数组
    this.setData({
      goodsList: [],
    });
    // 2 重置页码
    this.QueryParams.pagenum = 1;
    //3 发送请求
    this.getGoodsList();
    // console.log("下拉刷新了");
  },
});
