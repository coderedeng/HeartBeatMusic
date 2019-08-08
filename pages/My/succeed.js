// pages/My/succeed.js
import { getLogin, getSongs, getDetail } from "../../api/music.js"
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    pwd:null,
    userMsg:null,
    uid:null,
    playList:null,
    listId:null,
    indexMusic:null,
    isNull:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userData = wx.getStorageSync('userData')
    this.setData({
      user: userData.user,
      pwd: userData.pwd,
      uid: userData.uid,
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
    let user = this.data.user
    let password = this.data.pwd
    let uid = this.data.uid
    getLogin(user, password).then(({ data }) => {
      // console.log(data.profile)
      this.setData({
        userMsg: data.profile
      })
    })

    getSongs(uid).then(({ data }) => {
      // console.log(data.playlist[0].id)
      this.setData({
        playList: data.playlist
      })
  var detail1 = data.playlist[0].id
    getDetail(detail1).then(({ data }) => {
      this.setData({
        indexMusic: data.playlist.tracks
    })
      // console.log(this.data.indexMusic.length)
  })
})
 
}, 
  getId(event) {
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: "loading"
    })
    
    var detail = that.data.playList[event.currentTarget.id].id
    getDetail(detail).then(({ data }) => {
      that.setData({
          indexMusic: data.playlist.tracks
        })
    })
  },
  play(event) {
    var that = this
    // console.log(that.data.indexMusic)
    var listId = event.currentTarget.id
    var musicId = this.data.indexMusic[listId].id
    that.setData({
      listId: listId
    })
    backgroundAudioManager.title = that.data.indexMusic[listId].name;
    backgroundAudioManager.epname = that.data.indexMusic[listId].al.name;
    backgroundAudioManager.singer = that.data.indexMusic[listId].ar[0].name;
    backgroundAudioManager.coverImgUrl = that.data.indexMusic[listId].al.picUrl;
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'https://music.163.com/song/media/outer/url?id=' + musicId + '.mp3';
    backgroundAudioManager.onEnded(function () {
      that.getplay(++listId)
    })
    backgroundAudioManager.onError(function () {
      wx.showToast({
        title: '版权原因禁播!',
        icon: "loading"
      })
      setTimeout(function () {
        that.getplay(++listId)
      }, 1000)
    })
    backgroundAudioManager.onNext(function () {
      that.getplay(++listId)
    })
    backgroundAudioManager.onPrev(function () {
      that.getplay(--listId)
    })
  },
  // 下部自动获取下一曲
  getplay(listId) {
    var that = this;
    backgroundAudioManager.title = that.data.indexMusic[listId].name;
    backgroundAudioManager.epname = that.data.indexMusic[listId].al.name;
    backgroundAudioManager.singer = that.data.indexMusic[listId].ar[0].name;
    backgroundAudioManager.coverImgUrl = that.data.indexMusic[listId].al.picUrl;
    backgroundAudioManager.src = "https://music.163.com/song/media/outer/url?id=" + that.data.indexMusic[listId].id + ".mp3";
    // console.log("回调成功")
    if (that.data.indexMusic.length == listId) {
      wx.showToast({
        title: '列表播放完毕!',
        icon: "loading"
      })
    }
  },
out(){
    wx.showToast({
      title: '注销成功!',
      icon: 'succes',
      duration: 1000
    })
    wx.removeStorageSync('userData')
    setTimeout(function () {
      wx.showToast({
        title: '跳转中...',
        icon: 'loading',
        duration: 1500
      })
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
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