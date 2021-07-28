// pages/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //此方法不能使用，返回  的是匿名用户数据
  // getUserInfo(e) {
  //   const { userInfo } = e.detail;
  //   wx.setStorageSync("userinfo", userInfo);
  //   wx.navigateBack({
  //     delta: 1,
  //   });
  // },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
        const { userInfo } = res;
        wx.setStorageSync("userinfo", userInfo);
        wx.navigateBack({
          delta: 1,
        });
      },
    });
    console.log(this.data);
  },
  onLoad: function (options) {},
});
