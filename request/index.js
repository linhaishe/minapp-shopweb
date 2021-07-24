//一个页面调用多个ajax请求时，wx.showLoading要确认每个请求都有返回数据之后才会做关闭。所以计算同个页面的ajax请求的次数，并进行判断即可。ajaxTimes

//同时发送异步代码次数
let ajaxTimes = 0;

//promise封装，避免回调地狱

export const request = (params) => {
  ajaxTimes++;
  //显示加载中 效果
  wx.showLoading({
    title: "正在加载...", //提示的内容,
    mask: true, //显示透明蒙层，防止触摸穿透,
    // success: res => {}
  });

  //定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          //关闭正在等待的图标
          wx.hideLoading();
        }
      },
    });
  });
};
