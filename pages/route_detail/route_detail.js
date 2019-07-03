// pages/route_detail/route_detail.js
import http from "../../utils/http.js"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[],
    http:app.globalData.http
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = parseInt(options.id);
    wx.showLoading({
      title: '加载中',
    })
    const data = {
      id: id
    }
    const url = '/api/v1/user/getActivity'
    http(url, data, "POST").then(res => {
      console.log(res)
      let that = this;
      if (res.statusCode === 200) {
        that.setData({
          datas: res.data.Data
        })
        wx.hideLoading()
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 跳转线路预览
  toRoutePreview:function(){
    wx.navigateTo({
      url: '/pages/preview/preview',
    })
  },

  // 跳转景点介绍
  toPlaceInfor:function(){
    wx.navigateTo({
      url: '/pages/introduction_spot/introduction_spot',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})