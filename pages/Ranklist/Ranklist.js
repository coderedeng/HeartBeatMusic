// pages/Ranklist/Ranklist.js
import {getRanklist} from "../../api/music.js"
// pages/Ranklist/Ranklist.js
import { getSearch, getBanner, getNewsong, getPlayMusic } from "../../api/music.js"
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    musicList: null,
    isShow: "",
    banner: null,
    indexMusic: null,
    isTrue: null,
    msg: null,
    musicList1: null,
    isHide: "",
    listId: null,
    navlist: [{ "name": "新歌榜" }, { "name": "热歌榜" }, { "name": "原创榜" }, { "name": "飙升榜" }, { "name": "电音榜" }, { "name": "UK周榜" }, { "name": "美周帮" }, { "name": "KTV嗨榜" }, { "name": "iTunes榜" }, { "name": "Hit FM Top榜" }, { "name": "日本Oricon周榜" }, { "name": "韩国Melon排行榜周榜" }, { "name": "韩国Mnet排行榜周榜" }, { "name": "韩国Melon原声周榜" }, { "name": "中国TOP排行榜(港台榜)" }, { "name": "中国TOP排行榜(内地榜)" }, { "name": "香港电台中文歌曲龙虎榜" }, { "name": "华语金曲榜" }, { "name": "中国嘻哈榜" }, { "name": "法国 NRJ EuroHot 30周榜" }, { "name": "台湾Hito排行榜" }, { "name": "Beatport全球电子舞曲榜" }, { "name": "云音乐ACG音乐榜" }, { "name":"云音乐嘻哈榜"}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getId(event) {
    // console.log(event.currentTarget.id)
    wx.showToast({
      title: '加载中...',
      icon: "loading"
    })
    getRanklist(event.currentTarget.id).then(({ data }) => {
      var that = this;
      // console.log(data.playlist.tracks)
      that.setData({
        indexMusic: data.playlist.tracks
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
onShow: function () {
 getRanklist(0).then(({ data }) => {
      var that = this;
      // console.log(data.playlist.tracks)
      that.setData({
        indexMusic: data.playlist.tracks
      })
    })
  }, 
  play(event) {
    var that = this
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