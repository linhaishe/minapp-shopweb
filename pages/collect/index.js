// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [
      { id: 0, value: "商品收藏", isActive: true },
      { id: 1, value: "品牌收藏", isActive: false },
      { id: 2, value: "店铺收藏", isActive: false },
      { id: 3, value: "浏览足迹", isActive: false },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect,
    });
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
});
