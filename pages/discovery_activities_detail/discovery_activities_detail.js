// pages/discovery_activities_detail/discovery_activities_detail.js
import http from "../../utils/http.js"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to_answer:true 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const data = {
     id:options.id
    }
    const url = '/api/v1/user/show_activity'
    http(url, data, "POST").then(res => {
      console.log(res)
      // let that = this;
      // if (res.statusCode === 200) {
      //   that.setData({
      //     activities: res.data.Data
      //   })
      // }

    })
    
  },

  toAnswer:function(){
    wx.navigateTo({
      url: '/pages/answer_activity/answer_activity',
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