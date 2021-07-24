//Page Object

import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperlist: [],
    //导航数组
    catesList: [],
    //楼层数据
    floorList: [],
  },

  onLoad: function (options) {
    //原装写法
    // wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   success: (res) => {
    //     console.log(res);
    //     this.setData({
    //       swiperlist: res.data.message,
    //     });
    //   },
    // });

    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

  //获取轮播图
  getSwiperList() {
    //封装写法
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    }).then((result) => {
      this.setData({
        swiperlist: result.data.message,
      });
    });
  },
  //获取分类菜列表
  getCatesList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
    }).then((result) => {
      this.setData({
        catesList: result.data.message,
      });
    });
  },

  //获取楼层数据
  getFloorList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
    }).then((result) => {
      this.setData({
        floorList: result.data.message,
      });
    });
  },
});
