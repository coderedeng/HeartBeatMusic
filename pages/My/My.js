// pages/My/My.js
import { getLogin, getcheck} from "../../api/music.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgUser:null,
    msgPass:null,
    user:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('userData')!=""){
      wx.navigateTo({
          url:'./succeed'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }, getUser(e){
    var user = e.detail.value;
    var myreg = /^[u4E00-u9FA5]+$/;
    var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (user==""){
      wx.showToast({
        title: '请输入用户名!',
        icon: 'succes',
        duration: 1000
      })
      this.setData({
        msgUser:false
      })
    } else if (!myreg.test(user)){
      wx.showToast({
        title: '账号不能有中文',
        icon: 'succes',
        duration: 1000
      })
      this.setData({
        msgUser: false
      })
    } else if (!phone.test(user)){
      wx.showToast({
        title: '手机号输入有误',
        icon: 'succes',
        duration: 1000
      })
      this.setData({
        msgUser: false
      })
    }
    else{
      this.setData({
        msgUser: true,
        user: user
      })
    }
  },
  getPassWord(e){
    var password = e.detail.value
    if (password == "") {
      wx.showToast({
        title: '请输入密码!',
        icon: 'succes',
        duration: 1000
      })
      this.setData({
        msgPass: false
      })
    } else {
      this.setData({
        msgPass: true,
        password: password
      })
    }
  },
  login(){
    // console.log(this.data.msgUser, this.data.msgPass)
    if (this.data.msgUser && this.data.msgPass){
      let user = this.data.user
      let password = this.data.password
      // getLogin
      // console.log(user, password)

      getLogin(user, password).then(({data})=>{
        console.log(data)
        if (data.code==200){
          wx.showToast({
            title: '登录成功！',
            icon: 'succes',
            duration: 1500
          })

        var userData={
          user: user,
          pwd:password,
          uid: data.profile.userId
        }
        wx.setStorageSync("userData", userData)
          setTimeout(function(){
            wx.showToast({
              title: '跳转中...',
              icon: 'loading',
              duration: 1500
            })
            wx.navigateTo({
              url: `./succeed?user=${user}&pwd=${password}`
            })
          },1000)
        } else if (data.code == 502){
          wx.showToast({
            title: data.msg+"!",
            icon: 'succes',
            duration: 1500
          })
        }
      })
    }else{
      wx.showToast({
        title: '输入有误！',
        icon: 'succes',
        duration: 1000
      })
    }
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