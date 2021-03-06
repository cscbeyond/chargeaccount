import axios from 'axios';
import Vue from 'vue';

function cscPost(url, data) {
    console.log('cscPost执行')

    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中',
		})
        wx.request({
			// url: 'http://127.0.0.1:3003' + url,
			url: 'https://chensc.club' + url,
            method: 'POST',
            dataType: 'json',
            data: data,
            success: (res) => {
                wx.hideLoading();
                if(res.data.code == 250){
                    wx.showToast({
                        title: res.data.val,
                        icon: 'none',
                        duration: 2000,
                    })
                }
                resolve(res);
            },
            fail: (err) => {
				wx.hideLoading();
				reject(err);
				wx.showToast({
					title: '服务器开小差了',
					icon: 'none',
					duration: 1000,
				});
            },
        })
    })
}

export default {
    install: function (Vue) {
        Vue.prototype.cscPost = cscPost;
    }
}
