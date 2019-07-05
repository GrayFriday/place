// pages/preview/preview.js
var app = getApp();
var amapFile = require('../../utils/amap-wx.js')
var markersData = [];
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */

  data: {
    id: '',
    scale: 14,
    markers1: [{
      callout: {}
    }],
    latitude: '',
    longitude: '',
    textData: {},
    polyline: [{
      points: [],
      color: "#FF0000",
      width: 3,
      dottedLine: false
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.data.id = options.id;
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '06127e36a780db3eb68addd63fa1be36'
    });
    myAmapFun.getRegeo({
      success: function(data) {
        that.getStadium()

      },
      fail: function(info) {
       
      }
    })

    this.getLocation().then(res => {
      that.setData({
        longitude1: res.longitude,
        latitude1: res.latitude
      })
    })

  },
  // 地图放大
  fangDaTap: function(e) {
    var that = this;
    console.log("scale===" + this.data.scale);
    that.setData({
      scale: ++this.data.scale
    })
  },

  // 地图缩小

  suoXiaoTap: function(e) {
    var that = this;
    console.log("scale===" + this.data.scale);
    that.setData({
      scale: --this.data.scale
    })
  },

  getStadium: function() {
    const data = {
      id: this.data.id
    }
    const url = '/api/v1/user/livePreview'
    http(url, data, "POST").then(res => {
      console.log(res)
      let that = this;
      if (res.statusCode === 200) {
        var dataPlace = res.data.Data
        const markers = []
        const points = []
        var datas = {}
        for (let index in dataPlace) {
          let longitude = dataPlace[index].longitude
          let latitude = dataPlace[index].latitude
          let title = dataPlace[index].title
          let id = dataPlace[index].id
          var pointsData = {
            longitude,
            latitude
          }
          datas = {
            longitude,
            latitude,
            iconPath: "../../images/danghui.png",
            id,
            width: 30,
            height: 30,
            callout: {
              content: title,
              color: '#000000',
              display: 'ALWAYS'
            }
          }
          markers.push(datas)
          points.push(pointsData)
        }
        this.data.polyline[0].points = points
        that.setData({
          markers1: markers,
          polyline: this.data.polyline,
        })
        wx.hideLoading()
      }
    })
  },

  onShow() {},
  // 微信获得经纬度
  getLocation: () => {
    return new Promise((resolve, reject) => {
      return wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          resolve(res)
        },
        fail: function(res) {
          reject('fail' + JSON.stringify(res))
        }
      })
    })
  },

})