var app = getApp()
export function getSearch(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/search?",
      data:{
        keywords:id
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

export function getBanner() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/banner?",
      data: {
        type:2
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

export function getNewsong() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/top/list?",
      data:{
        idx:3
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
export function getPlayMusic(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: "https://music.163.com/song/media/outer/url?",
      data:{
        id:id
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

export function getRanklist(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/top/list?",
      data:{
        idx:id
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

export function getMv(area, type, order, offset, limit) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/mv/all?",
      data:{
        area : area,
        type : type,
        order : order,
        offset: offset,
        limit : limit
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
export function getmvUrl(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/mv/url?",
      data:{
        id:id
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
export function getLogin(phone, password) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/login/cellphone?",
      data:{
        phone: phone,
        password: password
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
export function getSongs(uid) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/user/playlist?",
      data:{
        uid: uid
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
export function getDetail(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: app.globalData.baseUrl + "/playlist/detail?",
      data:{
        id: id
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}