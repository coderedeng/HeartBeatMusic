import { getMv,getmvUrl } from "../../api/music.js"
//   area: 地区, 可选值为全部, 内地, 港台, 欧美, 日本, 韩国, 不填则为全部 type: 类型, 可选值为全部, 官方版, 原生, 现场版, 网易出品, 不填则为全部

// order: 排序, 可选值为上升最快, 最热, 最新, 不填则为上升最快

// limit: 取出数量, 默认为 30

// offset: 偏移数量, 用于分页, 如: (页数 - 1) * 50, 其中 50 为 limit 的值, 默认 为 0

// 接口地址 : / mv / all

// 调用例子 : /mv/all ? area = 港台
  // area: area, 地区
  // type: type, 类型
  // order: order, 排序
  // offset: offset, 页数
  // limit: 30 数量
Page({
data: {
    mv: null,
    isShow:true,
    isHidden:false,
    mvUrl:null,
    cid:null,
    multiArray: [[['全部'], ['内地'], ['港台'], ['欧美'], ['日本'], ['韩国']], [['全部'], ['官方版'], ['原生'], ['现场版'], ['网易出品']], [['上升最快'], ['最热'], ['最新']]],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: '内地'
        },{
          id:2,
          name: '港台'
        },{
          id: 3,
          name: '欧美'
        },{
          id: 4,
          name: '日本'
        },{
          id: 5,
          name: '韩国'
        },
      ],[{
        id: 0,
        name: '全部'
      },{
        id: 1,
        name: '官方版'
      },{
        id: 2,
        name: '原生'
      },{
        id: 3,
        name: '现场版'
      },{
        id: 4,
        name: '网易出品'
      }],[{
        id: 0,
        name: '上升最快'
      },{
        id: 1,
        name: '最新'
      },{
        id: 2,
        name: '最热'
      }]
    ],
    multiIndex: [0, 0, 0],
    area:null,
    type:null,
    order:null,
    offset:1,
    limit:30
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    this.setData(data);
    data.multiIndex[e.detail.column] = e.detail.value;
    // console.log(, data.multiArray[1][data.multiIndex[1]][0], data.multiArray[2][data.multiIndex[2]][0]);
    this.setData({
      area:data.multiArray[0][data.multiIndex[0]][0],
      type:data.multiArray[1][data.multiIndex[1]][0],
      order:data.multiArray[2][data.multiIndex[2]][0],
    })
    this.getAllMv()
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAllMv()
  },
  getAllMv(){
    var area = this.data.area;
    var type = this.data.type;
    var order = this.data.order;
    var offset = this.data.offset;
    var limit = this.data.limit;
    getMv(area, type, order, offset, limit).then(({ data }) => {
      // console.log(data.data)
      this.setData({
        mv: data.data
      })
    })
  }, 
  play(event){
    var cid = event.currentTarget.id
    var id = parseInt(this.data.mv[cid].id)
    getmvUrl(id).then(({data})=>{
      // console.log(data.data.url)
      this.setData({
        mvUrl: data.data.url,
        isShow: false,
        isHidden:true,
        cid: cid
      })
    })
    // console.log("run")
  },run(){
    console.log("run")
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
    // this.setData({
    //   pageNum: 1
    // })
    // 这里面写下来刷新的逻辑
    // this.getAllData(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //在这里写上啦加载的逻辑
    var that = this;
    var area = this.data.area;
    var type = this.data.type;
    var order = this.data.order;
    var offset = this.data.offset;
    var limit = this.data.limit;
    var page = that.data.offset + 1
    var sum = this.data.limit+30;
    getMv(area, type, order, page, sum).then(function (data) {
      if (data.data.data.length > 0) {
        // 1.将数据增加到allData
        var arr = that.data.mv
        arr = [...arr, ...data.data.data]
        that.setData({
          mv: arr,
          // 2.让page + 1
          offset: page,
          limit: sum
        })

      } else {
        wx.showToast({
          title: '没有更多数据了',
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})