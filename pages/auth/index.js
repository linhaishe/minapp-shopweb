import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { login } from "../../utils/asyncWx.js";

Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 1 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      // 2 获取小程序登录成功后的code
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code };
      //  3 发送请求 获取用户的token

      // const { token } = await request({
      //   url: "/users/wxloginn",
      //   data: loginParams,
      //   method: "post",
      // });

      // 4 把token存入缓存中 同时跳转回上一个页面

      //由于不是企业用户，拿不到token，所以我会将token数据直接赋值
      // let token =
      //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      wx.setStorageSync(
        "token",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      );

      // console.log("token222", token222);
      // console.log("loginParams", loginParams);
      wx.navigateBack({
        delta: 1,
      });
    } catch (error) {
      console.log(error);
    }
  },
});
