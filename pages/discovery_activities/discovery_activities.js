// pages/discovery_activities/discovery_activities.js
import http from "../../utils/http.js"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    title: "提示",
    activities: [],
    http: app.globalData.http
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    const data = {
      phone: '13551021774',
      password: '199422'
    }
    const url = '/api/v1/user/get_activity'
    http(url, data, "POST").then(res => {
      console.log(res)
      let that =this;
      if (res.statusCode === 200) {
        that.setData({
          activities: res.data.Data
        })
        wx.hideLoading()
      }
    });
    
  },

  toActivity: function (event) {
    console.log(event)
    var postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/discovery_activities_detail/discovery_activities_detail?id=' + postId,
      success: function (res) { 
       
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})