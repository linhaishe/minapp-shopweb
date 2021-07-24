// pages/category/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  data: {
    //左边的菜单数据
    leftCate: [],
    //右边的菜单列表数据
    rightCate: [],

    //被点击的左侧的菜单
    currentIndex: 0,
    scrollTop: 0,
  },
  //接口返回的数据
  resCateDate: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
    0 web中的本地存储和 小程序中的本地存储的区别
      1 写代码的方式不一样了 
        web: localStorage.setItem("key","value") localStorage.getItem("key")
    小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
      2:存的时候 有没有做类型转换
        web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
      小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型
    1 先判断一下本地存储中有没有旧的数据
      {time:Date.now(),data:[...]}
    2 没有旧数据 直接发送新请求 
    3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
     */
    this.getCateList();

    // 1. 获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    //2. 判断本地存储中是否有数据

    if (!Cates) {
      //如果不存在则发送请求
      this.getCateList();
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        //如果过期重新发送请求
        this.getCateList();
      } else {
        //没有过期则使用本地数据
        this.resCateDate = Cates.data;
        //构造左侧大菜单数据
        let leftCate = this.resCateDate.map((v) => v.cat_name);
        //构造右侧商品数据
        let rightCate = this.resCateDate[0].children;
        this.setData({
          leftCate,
          rightCate,
          scrollTop: 0,
        });

        //设置scroll-view标签的距离，使得点击切换的时候自动跳回顶部
      }
    }
  },

  //获取菜单数据
  async getCateList() {
    // request({
    //   url: "/categories",
    // }).then((result) => {
    //   this.resCateDate = result.data.message;
    //   // 把接口的数据存入到本地存储中
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.resCateDate });
    //   //构造左侧大菜单数据
    //   let leftCate = this.resCateDate.map((v) => v.cat_name);
    //   //构造右侧商品数据
    //   let rightCate = this.resCateDate[0].children;
    //   this.setData({
    //     leftCate,
    //     rightCate,
    //   });
    // });

    //es7 async await
    const res = await request({ url: "/categories" });
    this.resCateDate = res.data.message;
    wx.setStorageSync("cates", { time: Date.now(), data: this.resCateDate });
    //构造左侧大菜单数据
    let leftCate = this.resCateDate.map((v) => v.cat_name);
    //构造右侧商品数据
    let rightCate = this.resCateDate[0].children;
    this.setData({
      leftCate,
      rightCate,
    });
  },

  //左侧菜单点击事件
  handleItemTap(e) {
    //console.log(e);
    //获取被点击的标题身上的索引
    //修改cunrrentIndex
    //根据不同的索引渲染不同的内容

    const { index } = e.currentTarget.dataset;
    let rightCate = this.resCateDate[index].children;
    this.setData({
      currentIndex: index,
      rightCate,
      scrollTop: 0,
    });
  },
});
/*
//缓存技术
//优化用户体验，做缓存效果

用户打开页面的时候，做一个判断
判断本地存储中有没有数据，如果没有就发送新的请求获取数据。
如果有就的数据，且就的数据没有过期，那就使用本地存储中的数据

 */
