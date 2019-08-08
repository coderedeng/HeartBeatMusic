// pages/Ranklist/Ranklist.js
import { getSearch, getBanner, getNewsong, getPlayMusic} from "../../api/music.js"
const backgroundAudioManager=wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:"",
      musicList: null,
      isShow:"",
      banner: null,
      indexMusic:null,
      isTrue:null,
      msg:null,
      musicList1:null,
      isHide:"",
      listId:null,
      sum:null,
      next:null
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
  next() {
    var sum = this.data.listId
    sum++
    return sum
    console.log(sum)
  },
  getValue: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  getMusic() {
    // console.log(this.data.name)
    var that=this;
    var name1 = this.data.name;
    // console.log(name1)
    if (name1!=""){
      wx.showLoading({
        title: '请稍后...',
      })
      that.setData({
        isHide: true
      })
      getSearch(name1).then(({ data }) => {
        // console.log(data.result.songs)
        that.setData({
          musicList: data.result,
          musicList1: data.result.songs
        })
        if (data.result.songs.length > 0) {
          wx.hideLoading()
          that.setData({
            isShow: true
          })
        }
      })

    }else{
      wx.showToast({
        title: '内容不能为空!'
      })
      that.setData({
        isHide: false,
        isShow:false
      })
    }
   
  },

// 页面点击下部音乐
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
    backgroundAudioManager.coverImgUrl = that.data.indexMusic[listId].ar[0].picUrl;
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'https://music.163.com/song/media/outer/url?id=' + that.data.indexMusic[listId].id+ '.mp3';
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
//下部自动获取下一曲
  getplay(listId) {
    var that = this;
  backgroundAudioManager.title = that.data.indexMusic[listId].name;
  backgroundAudioManager.epname = that.data.indexMusic[listId].al.name;
  backgroundAudioManager.singer = that.data.indexMusic[listId].ar[0].name;
  backgroundAudioManager.coverImgUrl = that.data.indexMusic[listId].al.picUrl;
  // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'https://music.163.com/song/media/outer/url?id=' + that.data.indexMusic[listId].id+ '.mp3';
    // console.log("回调成功")
    if (that.data.indexMusic.length == listId) {
      wx.showToast({
        title: '列表播放完毕!',
        icon: "loading"
      })
    }
  },
//搜索音乐页面点击获取音乐
  play1(event) {
    var that = this
    var listId = event.currentTarget.id
    var musicId = that.data.musicList1[listId].id
    that.setData({
      listId: listId
    })
    backgroundAudioManager.title = that.data.musicList1[listId].name;
    backgroundAudioManager.epname = "";
    backgroundAudioManager.singer = that.data.musicList1[listId].artists[0].name;
    backgroundAudioManager.coverImgUrl = that.data.musicList1[listId].artists[0].img1v1Url;
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'https://music.163.com/song/media/outer/url?id=' + musicId + '.mp3';
    backgroundAudioManager.onEnded(function () {
      that.getplay1(++listId)
    })
    backgroundAudioManager.onError(function(){
      wx.showToast({
        title: '版权原因禁播!',
        icon:"loading"
      })
      setTimeout(function(){
        that.getplay1(++listId)
      },1000)
    })
    backgroundAudioManager.onNext(function(){
        that.getplay1(++listId)
    })
    backgroundAudioManager.onPrev(function(){
        that.getplay1(--listId)
    })
  },
//搜索页面自动获取下一曲
  getplay1(listId) {
    var that = this;
    backgroundAudioManager.title = that.data.musicList1[listId].name;
    backgroundAudioManager.epname = "";
    backgroundAudioManager.singer = that.data.musicList1[listId].artists[0].name;
    backgroundAudioManager.coverImgUrl = that.data.musicList1[listId].artists[0].img1v1Url;
    backgroundAudioManager.src = "https://music.163.com/song/media/outer/url?id=" + that.data.musicList1[listId].id+".mp3";
    // console.log("回调成功")
    if (that.data.indexMusic.length == listId) {
      wx.showToast({
        title: '列表播放完毕!',
        icon: "loading"
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getBanner().then(({ data }) => {
      // console.log(data)
      this.setData({
        banner: data.banners
      })
     
    })
    getNewsong().then(({data})=>{
      var that=this;
      // console.log(data.playlist.tracks)
      that.setData({
        indexMusic: data.playlist.tracks
      })
    })
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