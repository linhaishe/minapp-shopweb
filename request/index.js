//promise封装，避免回调地狱

export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
