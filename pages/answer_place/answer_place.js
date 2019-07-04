// pages/answer/answer.js
import http from "../../utils/http.js"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: [],
    items:{},
    item: {},
    http: app.globalData.http,
    correct:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    var that=this
    const data = {
      id: '120'
    }
    const url = '/api/v1/user/get_Scenic_info_wx'
    http(url, data, "POST").then(res => {
      console.log(res)
      let subjects = res.data.Data.answer
      let number = Math.floor(Math.random() * subjects.length)
      that.data.correct = subjects[number].correct;
      if (res.statusCode === 200 ){
        that.setData({
          items: subjects[number],
          item: subjects[number].option
        })
        wx.hideLoading()
      }
      
    });
  },

  correct:function(e){
    const id = parseInt(e.currentTarget.dataset.id)
    const correct = this.data.correct
    console.log("正确答案是：" + correct)
    const list = this.data.item
    var num = 0
    for (let index in list) {
      num++
      if (id === num && correct === index) {
        wx.showToast({
          title: '恭喜选择正确',
          icon: 'none'
        })
        return false
      } else {
        wx.showToast({
          title: '答案错误',
          icon:'none'
        })
      }
    }
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