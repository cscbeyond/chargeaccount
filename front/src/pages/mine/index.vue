<template>
    <div class="mine">
        <div class="head">
            <div v-if="havePermission == false" class="img-box">
                <button class="avator" @getuserinfo="bindGetUserInfo" open-type='getUserInfo' style="background-image:url(https://chensc.club/static/assets/images/defaultAvatar.jpg);"
                    plain='true'></button>
            </div>
            <div v-else class="img-box">
                <button class="avator" @getuserinfo="bindGetUserInfo" open-type='getUserInfo' :style="avatarImgBg"></button>
            </div>
            <div class="nickname">{{userInfo.nickName}}</div>
			<!-- <div>{{userInfo.avatarUrl}}</div> -->
            <!-- <div class="nickname">昵称</div> -->
            <!-- <div class="tips">
                <div class="tip continu">
                    <span class="num">{{continu}}</span>
                    <span class="title">已连续打卡</span>
                </div>
                <div class="tip continu-days">
                    <span class="num">{{continuDays}}</span>
                    <span class="title">总记账天数</span>
                </div>
                <div class="tip charge-count">
                    <span class="num">{{chargeCount}}</span>
                    <span class="title">总记账笔数</span>
                </div>
            </div> -->
        </div>
        <div class="blk-10"></div>
		<div class="activites">
			<div class="save-plan">
				<i class="iconfont icon-qian1"></i>
				<p>存钱计划</p>
			</div>
			<div class="save-plan">
				<i class="iconfont icon-qian1"></i>
				<p>存钱计划</p>
			</div>
			<div class="save-plan">
				<i class="iconfont icon-qian1"></i>
				<p>存钱计划</p>
			</div>
			<div class="save-plan">
				<i class="iconfont icon-qian1"></i>
				<p>存钱计划</p>
			</div>
		</div>
        <div class="mid">
            <!-- <div class="options">
                <div class="option" @click="navTo('exchange')">
                    <i class="left iconfont icon-application"></i><span>汇率计算</span><i class="iconfont icon-arrow-right right"></i>
                </div>
            </div>
            <div class="options">
                <div class="option">
                    <i class="left iconfont icon-noun__cc"></i><span>定时提醒</span><i class="iconfont icon-arrow-right right"></i>
                </div>
            </div>-->
			 <div class="options">
                <div @click="navTo('about')" class="option">
                    <i class="left iconfont icon-qian"></i><span>关于点滴</span><i class="iconfont icon-arrow-right right"></i>
                </div>
            </div>
           <!-- <div class="options">
                <div class="option">
                    <i class="left iconfont icon-xiazai"></i><span>问题反馈</span><i class="iconfont icon-arrow-right right"></i>
                </div>
            </div>  -->
        </div>
		<div class="des">
			<div class="top">
				<p>财务自由,<span>点滴</span>做起</p>
			</div>
			<div class="share">
				<button open-type='share'>分享小程序</button>
			</div>
			<div class="version">V1.1.0</div>
		</div>
        <!-- <div class="blk-10"></div> -->
        <div class="tabbar">
            <div class="tabbar-items">
                <div class="tabbar-item" @click="navTo('index')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-shouzhiliushui"></i>
                    </div>
                    <div class="tabbar-text">明细</div>
                </div>
                <!-- <div class="tabbar-item" @click="navTo('charts')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-tubiao"></i>
                    </div>
                    <div class="tabbar-text">图表</div>
                </div> -->
                <div class="tabbar-item center" @click="navTo('chargeAccount')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-jiahao center-btn"></i>
                    </div>
                    <div class="tabbar-text">记账</div>
                </div>
                <!-- <div class="tabbar-item" @click="navTo('bill')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-zhangdan"></i>
                    </div>
                    <div class="tabbar-text">账单</div>
                </div> -->
                <div class="tabbar-item active" @click="navTo('mine')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-wode"></i>
                    </div>
                    <div class="tabbar-text">我的</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    nickname: '请点击上方图片进行授权',
                },
                continu: 1, //已连续打卡
                continuDays: 10, //总记账天数
                chargeCount: 20, //总记账笔数
                havePermission: false,
				avatarImgBg: '',
				bindGetUserInfoTimerFlag: true,
            }
        },
        mounted() {
			this.getUserInfoFromStorage();
        },
        onShow() {
		},
		onShareAppMessage: function () {
			console.log('分享功能');
		},
        methods: {
			exchange(){

			},
			getUserInfoFromStorage(){
				let userInfo = wx.getStorageSync('userInfo');
				if(userInfo){
					this.havePermission = true;
					this.userInfo = JSON.parse(userInfo);
					this.avatarImgBg = 'background-image:url(' + this.userInfo.avatarUrl + ');'
				}else{
            		this.checkUserInfo();
				}
			},
            checkUserInfo() {
				console.log('查看是否授权');
				wx.showLoading({
					title: '加载中',
				})
                wx.getSetting({
                    success: (res) => {
                        console.log(res);
                        if (res.authSetting['scope.userInfo']) {
							this.havePermission = true;
							this.myGetUserInfo();
                        } else {
                            wx.showToast({
                                title: '请点击头像进行授权',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    }
                })
			},
			myGetUserInfo(){
				let timerFlag = true;
				if(!timerFlag){
					return;
				}
				timerFlag = false;
				setTimeout(() => {
					wx.getUserInfo({
						success: (res) => {
							console.log(res.userInfo);
							this.userInfo = res.userInfo;
							this.avatarImgBg = 'background-image:url(' + res.userInfo.avatarUrl +
								');'
								wx.hideLoading();
							wx.setStorageSync('userInfo',JSON.stringify(res.userInfo))
						}
					});
					timerFlag = true;
				}, 5000);
			},
            bindGetUserInfo(e) {
                console.log(e)
                let userInfo = e.mp.detail.userInfo;
                if (userInfo) {
					this.userInfo = userInfo;
					wx.setStorageSync('userInfo',JSON.stringify(userInfo))
					this.avatarImgBg = 'background-image:url(' + userInfo.avatarUrl + ');'
					//函数节流
					if(!this.bindGetUserInfoTimerFlag){
						return;
					}
					this.bindGetUserInfoTimerFlag = false;
					this.sendUserInfo();
					setTimeout(() => {
						this.bindGetUserInfoTimerFlag = true;
					}, 13000);
                    this.havePermission = true;
                }else{
					 wx.showToast({
						title: '未授权将无法显示您的昵称及头像',
						icon: 'none',
						duration: 1500
					})
				}
            },
			sendUserInfo(){
				this.cscPost("/login/updateUserInfo.api", {
						openid: wx.getStorageSync('openid'),
						userInfo: this.userInfo
                    })
                    .then(res => {
                        console.log("---------存用户头像等信息成功-------");
                        console.log(res);
                        if (res.data.code == 0) {
							console.log('更新成功');
                        }
                    })
                    .catch(err => {
                        console.log('存用户头像等信息失败----------');
                        console.log(err);
                    });
			},
            //底部导航
            navTo: function (val) {
                let url = '';
                if (val == 'charts') { //图标
                    url = '/pages/charts/main'
                } else if (val == 'bill') { // 账单
                    url = '/pages/bill/main'
                } else if (val == 'index') { //首页
                    url = '/pages/index/main'
                } else if (val == 'mine') { // 我的
                    url = '/pages/mine/main'
                    console.log('当前页');
                    return;
                } else if (val == 'chargeAccount') { //记账
                    wx.navigateTo({
                        url: '/pages/chargeAccount/main'
                    });
                    return;
                }else if(val == 'exchange'){
					wx.navigateTo({
                        url: '/pages/exchange/main'
                    });
                    return;
				}else if(val == 'about'){
					wx.navigateTo({
                        url: '/pages/about/main'
                    });
                    return;
				}
                wx.redirectTo({
                    url: url,
                    success: function (res) {
                        console.log(res);
                    },
                    fail: function (err) {
                        console.log(err);
                    },
                    complete: function (data) {
                        console.log(data);
                    }
                });
            },
        },
    }

</script>

<style lang="less">
    .mine {
        margin-bottom: 110rpx;

        .blk-10 {
            background-color: #F5F5F5;
            height: 20rpx;
		}
		.activites{
			display: flex;
		}

        .mid {
            .options {
                .option {
                    border-bottom: 1rpx solid #F5F5F5;
                    height: 80rpx;
                    line-height: 80rpx;
                    padding: 0 30rpx;

                    span {
                        font-size: 30rpx;
                    }

                    i {
                        display: inline-block;
                    }

                    .left {
                        padding-right: 20rpx;
                    }

                    .right {
                        float: right;
                    }
                }
            }
        }

        .head {
            background-color: #2CF2B4;

            .nickname {
                color: #fff;
                font-size: 30rpx;
                text-align: center;
                padding-bottom: 10rpx;
            }

            .img-box {
                display: flex;
                justify-content: center;
                align-items: center;

                .avator {
                    height: 150rpx;
                    width: 150rpx;
                    display: inline-block;
                    border-radius: 50%;
                    margin: 50rpx;
                    margin-bottom: 10rpx;
                    background-size: contain;
                    border: none;
                }
            }

            .tips {
                .tip {
                    display: inline-block;
                    color: #fff;
                    width: 33.33%;
                    text-align: center;
                    margin-bottom: 30rpx;
                    .num {
                        display: block;
                        color: #fff;
                        font-size: 30rpx;
                        margin-bottom: 10rpx;
                    }

                    .title {
                        display: block;
                        color: #fff;
                        font-size: 20rpx;
                    }
                }
            }
		}
		.des{
			margin-top: 400rpx;
			.top{
				margin-top: 40rpx;
				p{
					font-size: 30rpx;
					text-align: center;
					color: #ccc;
					margin-bottom: 30rpx;
					span{
						display: inline-block;
						color: #2CF2B4;
					}
				}
			}
			.version{
				margin-top: 30rpx;
				text-align: center;
				color: #ccc;
				font-size: 28rpx;
			}
			.share{
				button{
					background-color: #2CF2B4;
					color: #fff;
					width: 70%;
				}
			}
		}
    }

</style>
