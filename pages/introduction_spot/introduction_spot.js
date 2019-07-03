// pages/introduction_spot/introduction_spot.js
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray:[],
    banner:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.dataArray(options)
   wx.showLoading({
     title: '加载中',
   })
  },

  // 获取数据
  dataArray:function(e){
    console.log(e)
    const data = {
      scenic_id:e
    }
    const url = '/api/v1/user/getNodes'
    http(url, data, "POST").then(res => {
      console.log(res.data.Data)
      let that = this;
      let banner = res.data.Data[e].img_url
      if (res.statusCode === 200) {
        that.setData({
          dataArray: res.data.Data
        })
        wx.hideLoading()
      }
    });

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