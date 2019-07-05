var app = getApp();
var amapFile = require('../../utils/amap-wx.js')
var markersData = [];
import http from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */

  data: {
    showModal_0: false,
    inputFocus: false, // input 框的focus状态
    inputModel: '', // input 框的输入内容
    inputInfo: '请输入信息', // cover-view 显示的 input 的输入内容,初始值充当placeholder作用
    scale: 16,
    markers1: [],
    latitude: '',
    longitude: '',
    textData: {},
  },

  toShowModal: function(e) {
    this.setData({
      showModal: true
    })
  },

  hide: function(e) {
    this.setData({
      showModal: false
    });
  },

  // 去搜索
  toSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '06127e36a780db3eb68addd63fa1be36'
    });
    myAmapFun.getRegeo({
      success: function(data) {
        that.getStadium()

      },
      fail: function(info) {
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

    this.rejister();
    this.mapCtx = wx.createMapContext('map');
    this.startConnect();

  },

  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },

  getStadium: function() {
    const data = {

    }
    const url = '/api/v1/site/getSite'
    http(url, data, "POST").then(res => {
      let that = this;
      if (res.statusCode === 200) {
        var dataPlace = res.data.Data
        const markers = []
        for (let index in dataPlace) {
          if (!markers[index]) {
            markers[index] = []
          }
          let longitude = dataPlace[index].longitude
          let latitude = dataPlace[index].latitude
          let title = dataPlace[index].title
          let id = dataPlace[index].id
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
        }

        that.setData({
          markers1: markers
        })
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

  lanya: function() {
    this.startConnect();
  },

  // 跳转活动页
  toActivity: function() {
    wx.navigateTo({
      url: '/pages/discovery_activities/discovery_activities',
    })
  },

  // 跳转景区页
  toArea: function() {
    wx.navigateTo({
      url: '/pages/discovery_spots/discovery_spots',
    })
  },

  // 跳转路线页
  toRoute: function() {
    wx.navigateTo({
      url: '/pages/route/route',
    })
  },

  // 跳转个人主页
  toMy: function() {

    wx.navigateTo({
      url: '/pages/personal_home_page/personal_home_page',
    })
  },

  // 验证是否登录过期
  rejister: function(e) {
    var that = this
    wx.checkSession({
      success: function(res) {
        console.log(res, '登录未过期')
      },
      fail: function(res) {
        console.log(res, '登录过期了')
        //再次调用wx.login()
        wx.login({
          success: function(res) {
            console.log(res.code)
            //发送请求
            http({
              s: "Wxmini.getUserKey",
              code: res.code
            }, "POST").then(res => {
              console.log(res)
              wx.setStorageSync('openid', res.data.data.userdata.openid)
              wx.setStorageSync('userId', res.data.data.userdata.id)
            })
          }
        })
      }
    })
  },

  // 获取手机号

  getPhoneNumber: function(e) {
    console.log(2222222)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var detail = e.detail;
    const data = {
      "openid": openid,
      "encryptedData": detail.encryptedData,
      "iv": detail.iv
    }
    const url = '/api/v1/user/get_activity'
    http(url, data, "POST").then(res => {
      console.log(res)
      let that = this;
      if (res.statusCode === 200) {
        console.log(res.data.phoneNumber);
        wx.setStorageSync("phonenumber", res.data.phoneNumber);
      }

    })
  },

  toIndex: function() {
    this.setData({
      showModal_0: false
    })
  },

  // 蓝牙部分

  startConnect: function() {
    var that = this;
    // wx.showLoading({
    //   title: '开启蓝牙适配'
    // });

    wx.openBluetoothAdapter({
      success: function(res) {
        wx.showToast({
          title: '蓝牙已打开',
          icon: 'success',
          duration: 3000
        })

        setTimeout(function () {
          wx.hideToast()
        }, 3000)
        // that.getBluetoothAdapterState();
      },

      fail: function(err) {
        wx.showToast({
          title: '蓝牙未打开',
          icon: 'fail',
          duration: 3000
        })

        setTimeout(function() {
          wx.hideToast()
        }, 3000)
      }
    });

    // wx.onBluetoothAdapterStateChange(function(res) {
    //   var that = this;
    //   console.log(res)
    //   var available = res.available;
    //   if (available) {
    //     that.getBluetoothAdapterState();
    //   }
    // })

  },



})