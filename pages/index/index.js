//Page Object
Page({
  data: {
    //轮播图数组
    swiperlist: [],
  },

  onLoad: function (options) {
    wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
      success: (res) => {
        console.log(res);
        this.setData({
          swiperlist: res.data.message,
        });
      },
    });
  },
});
