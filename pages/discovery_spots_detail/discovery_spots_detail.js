// pages/discovery_activities_detail1/discovery_activities_detail1.js
import http from "../../utils/http.js"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to_answer: true,
    spots:[],
    http:app.globalData.http
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const data = {
      id: options.id
    }
    const url = '/api/v1/user/get_Scenic_info_wx'
    http(url, data, "POST").then(res => {
      let details = res.data.Data
      let that = this;
      if (res.statusCode === 200) {
        that.setData({
          spots: details
        })
        wx.hideLoading();
        wx.setNavigationBarTitle({
          title: details.title
        });
      }

    })

  },

  toAnswer: function () {
    wx.navigateTo({
      url: '/pages/answer_place/answer_place',
    })
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