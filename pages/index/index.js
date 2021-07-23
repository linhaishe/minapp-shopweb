//Page Object

import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperlist: [],
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

    //封装写法
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    }).then((result) => {
      this.setData({
        swiperlist: result.data.message,
      });
    });
  },
});
