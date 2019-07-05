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
    id:'',
    scale: 14,
    markers1: [],
    latitude: '',
    longitude: '',
    textData: {},
    polyline: [{
      points: [
      ],
      color: "#FF0000",
      width: 3,
      dottedLine: false
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ( options ) {
    wx.showLoading({
      title: '加载中',
    })
    console.log( options )
    this.data.id = options.id;
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '06127e36a780db3eb68addd63fa1be36'
    });
    myAmapFun.getRegeo({
      success: function (data) {
        that.getStadium()

      },
      fail: function (info) {
        //失败回调
        console.log(info)
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
  fangDaTap: function (e) {
    var that = this;
    console.log("scale===" + this.data.scale);
    that.setData({
      scale: ++this.data.scale
    })
  },

  // 地图缩小
  
  suoXiaoTap: function (e) {
    var that = this;
    console.log("scale===" + this.data.scale);
    that.setData({
      scale: --this.data.scale
    })
  },

  getStadium: function () {
    const data = {
      id:this.data.id
    }
    const url = '/api/v1/user/livePreview'
    http(url, data, "POST").then(res => {
      console.log(res)
      let that = this;
      if (res.statusCode === 200) {
        var dataPlace = res.data.Data
        const markers = []
        const points = []
        for (let index in dataPlace) {
          if (!markers[index]) {
            markers[index] = []
          }
          let longitude = dataPlace[index].longitude
          let latitude = dataPlace[index].latitude
          let title = dataPlace[index].title
          let id = dataPlace[index].id
          var pointsData = {
            longitude,
            latitude
          }
          var datas = {
            longitude,
            latitude,
            iconPath: "../../images/danghui.png",
            id,
            width: 30,
            height: 30,
            title
          }
          markers.push(datas)
          points.push(pointsData)
        }
        this.data.polyline[0].points = points
        that.setData({
          markers1: markers,
          polyline: this.data.polyline
        })
        wx.hideLoading()
      }
    })
  },

  onShow() { },
  // 微信获得经纬度
  getLocation: () => {
    return new Promise((resolve, reject) => {
      return wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          resolve(res)
        },
        fail: function (res) {
          reject('fail' + JSON.stringify(res))
        }
      })
    })
  },

  /**
   * 将焦点给到 input（在真机上不能获取input焦点）
   */
  tapInput() {
    this.setData({
      //在真机上将焦点给input
      inputFocus: true,
      //初始占位清空
      inputInfo: ''
    });
  },

  /**
   * input 失去焦点后将 input 的输入内容给到cover-view
   */
  blurInput(e) {
    this.setData({
      inputInfo: e.detail.value || '输入'
    });
  },

  toIndex: function () {
    this.setData({
      showModal_0: false
    })
  },


})