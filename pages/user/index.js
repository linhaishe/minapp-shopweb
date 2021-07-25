// pages/user/index.js
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0,
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    //获取缓存中的商品收藏信息
    const collect = wx.getStorageSync("collect") || [];

    this.setData({ userinfo, collectNums: collect.length });
  },
});
