// pages/discovery_activities_detail/discovery_activities_detail.js
import http from "../../utils/http.js"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to_answer:true,
    activities:[],
    http:app.globalData.http,
    inputValue:'WB'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {+
    this.initBlue();
    wx.showLoading({
      title: '加载中',
    })
    const data = {
     id:options.id
    }
    const url = '/api/v1/user/show_activity'
    http(url, data, "POST").then(res => {
      let details = res.data.Data
      let lanya = res.data.Data.answer
      console.log(lanya)
      let that = this;
      if (res.statusCode === 200) {
        that.setData({
          activities: details
        })
        wx.hideLoading();
        wx.setNavigationBarTitle({
          title: details.title
        });
      }

    })
    
  },

  /**
   * 初始化蓝牙设备
   */
  initBlue: function () {
    var that = this;
    wx.openBluetoothAdapter({ 
      success: function (res) {
        // console.log(res)
        wx.showToast({
          title: '初始化成功',
          icon: 'success',
          duration: 3000
        })
        that.findBlue(); //2.0
      },
      fail: function (res) { //如果手机上的蓝牙没有打开，可以提醒用户
        wx.showToast({
          title: '请开启蓝牙',
          icon: 'fails',
          duration: 3000
        })
        that.initBlue()
      }
    })
  },

  /**
   *开始搜索蓝牙设备
   */
  findBlue() {
    var that = this
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      interval: 0,
      success: function (res) {

        wx.showLoading({
          title: '正在搜索设备',
        })
        that.getBlue() //3.0
      }
    })
  },

  /**
   * 获取搜索到的设备信息
   */
  getBlue() {
    var that = this
    wx.getBluetoothDevices({
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        for (var i = 0; i < res.devices.length; i++) {　　　 //that.data.inputValue：表示的是需要连接的蓝牙设备ID，简单点来说就是我想要连接这个蓝牙设备，所以我去遍历我搜索到的蓝牙设备中是否有这个ID
          if (res.devices[i].name == that.data.inputValue || res.devices[i].localName == that.data.inputValue) {
            that.setData({
              deviceId: res.devices[i].deviceId,
              consoleLog: "设备：" + res.devices[i].deviceId,
            })
            // that.connetBlue(res.devices[i].deviceId); //4.0
            return;
          }
        }
      },
      fail: function () {
        console.log("搜索蓝牙设备失败")
      }
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