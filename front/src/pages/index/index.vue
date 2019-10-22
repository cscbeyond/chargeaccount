<template>
    <div class="detial">
        <div class="content">
			<div class="modal" v-if="modalShow">
				<div class="modal-content">
					<div>
						<div class="blk-20"></div>
						<label class="edie-label" for="editName">
							名称：<input v-model="editName" id="editName" type="text">
						</label>
						<div class="blk-20"></div>
						<label class="edie-label" for="editCount">
							金额：<input v-model="editCount" id="editCount" type="text">
						</label>
						<div style="height:30rpx;"></div>
					</div>
					<!-- <input class="self-define-name" v-model="selfDefineName" placeholder="请输入自定义名称（最多四个字）" type="text"> -->
					<div class="footer-btns">
						<span class="cancel" @click.stop="cancelBtn">取消</span>
						<span class="confirm" @click.stop="confirmBtn">确认</span>
					</div>
				</div>
			</div>
            <div class="head">
                <div class="h-top">
                    <span class="time">{{visiableYear}}年</span><span class="income">收入</span><span class="spend">支出</span><span class="left">结余</span>
                </div>
                <div class="h-bottom">
                    <span class="time">
                        <picker mode="date" :value="pickerDate" :start="startDate" end="2030-02" fields="month" @change="bindTimeChange($event)">
                            <view class="picker">
                                {{visiableMonth}}月
                                <i class="down iconfont icon-tubiaozhizuo-"></i>
                            </view>
                        </picker>
                    </span><span class="income">{{incomeTotal}}</span><span class="spend">{{spandTotal}}</span><span class="spend">{{incomeTotal+spandTotal}}</span>
                </div>
            </div>
			<!-- <div class="items-container"> -->
			<scroll-view :scroll-top="scrollTop" :style="{'height': 'calc(100vh - 250rpx)'}" @scrolltolower="scrolltolower" @scroll="scroll" class="items-container" scroll-y='true'>
				<div class="has-none" v-if="endList.length==0">
					<i class="iconfont icon-zhangdan"></i>
					账单里空空如也，快来记一笔吧！
				</div>
					<!-- 这是记录 -->
				<div v-for="(item,idx) in endList" :key="idx">
					<!-- 时间 -->
					<div class="item-time">
						<span class="date">{{item.create_time}}</span><span class="week">星期{{item.week}}</span>
						<span class="spend" v-if="item.type == 1">支出</span>
						<span class="spend" v-else>收入</span>
					</div>
					<!-- 每一项 -->
					<div @longpress="edit(item)" class="items" @touchstart="touchStart" @touchmove="touchMove"
						@touchend="touchEnd($event,idx)" @click="recover(idx)" :data-type="item.moveType">
						<div class="item">
							<i class="iconfont" :class=item.icon></i><span class="item-name">{{item.item_name}} <span class="des" v-if="item.des">({{item.des}})</span></span><span
								class="price"><span v-if="item.type == 1">-</span>{{item.count}}</span>
						</div>
						<div @click="delItem(item)" class="del">删除</div>
					</div>
				</div>
			</scroll-view>
			<!-- </div> -->
            <div class="tabbar">
                <div class="tabbar-items">
                    <div class="tabbar-item active" @click="navTo('index')">
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
                        <div class="tabbar-text ">记账</div>
                    </div>
                    <!-- <div class="tabbar-item" @click="navTo('bill')">
                        <div class="tabbar-icon">
                            <i class="iconfont icon-zhangdan"></i>
                        </div>
                        <div class="tabbar-text">账单</div>
                    </div> -->
                    <div class="tabbar-item" @click="navTo('mine')">
                        <div class="tabbar-icon">
                            <i class="iconfont icon-wode"></i>
                        </div>
                        <div class="tabbar-text">我的</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import card from "@/components/card";
    import Swiper from "@/components/swiper";
    import store from "@/utils/store.js";
    export default {
        components: {
            card,
            Swiper
        },
        data() {
            return {
				scrollTop: 9999,
                userInfo: {},
                startDate: "2017-05",
                endDate: "2030-05",
                visiableYear: "2019",
                pickerDate: "",
                visiableMonth: "",
                jscode: "", // jscode
                recordList: [],
                startTime: "", // 查询的月份
                spandTotal: 0,
                incomeTotal: 0,
                startX: 0,
                moveX: 0,
				endX: 0,
				startY:0,
				endY:0,
				modalShow: false,
				editName: '',
				editCount: null,
				editId: null,
            };
        },
        created() {
            // 调用应用实例的方法获取全局数据
			this.initTime();
			
        },
        onShow: function () {
            this.getOpenidFromLocal();
			this.initDatas();

        },
        onShareAppMessage: function () {
            console.log('分享功能');
		},
		toBtm(e){
			console.log(e);
		},
        computed: {
            endList: function () {
                let json = {};
                let newArr = [];
                let eachItem = [];
                let len = this.recordList.length;
				// console.log(eachItem);
				for(let i = 0; i < this.recordList.length; i++){
					this.recordList[i].moveType = 0;
				}
                return this.recordList;
            }
        },
        methods: {
			cancelBtn(){
				this.modalShow = false;
			},
			confirmBtn(){
				console.log('发送请求去后台修改');
				console.log('11111----  '+typeof this.editCount,+this.editCount);
				let count = Number(this.editCount);
				console.log('22222----  '+typeof count,+count)
				if (this.editName.length >= 5){
					wx.showToast({
						title: '名称最多四个字哦！',
						icon: 'none',
						duration: 2000
					})
					return;
				}else if(typeof count != 'number' || isNaN(count)){
					wx.showToast({
						title: '金额只能输入数字哦！',
						icon: 'none',
						duration: 2000
					})
					return;
				}
               	this.cscPost("/editRecord/editRecord.api", {
						editName: this.editName,
						editCount: this.editCount,
                        itemId: this.editId
                    })
                    .then(res => {
						this.modalShow = false;
                        console.log(res);
                        if (res.data.code == 0) {
                            console.log("---------删除成功-------");
                            this.getRecordByOpenId();
                        }
                    })
                    .catch(err => {
						this.modalShow = false;
                        console.log("---------删除成功-------");
                        console.log(err);
                    });
				
			},
			edit(item){
				console.log('长按');
				this.modalShow = true;
				console.log(item);
				this.editName = item.item_name;
				this.editCount = item.count;
				this.editId = item.id;
			},
            // 滑动开始
            touchStart(e) {
                // 获取移动距离，可以通过打印出e，然后分析e的值得出
                this.startX = e.mp.changedTouches[0].clientX;
                this.startY = e.mp.changedTouches[0].clientY;
			},
			touchMove(){
			},
            // 滑动结束
            touchEnd(e, index) {
                // 获取移动距离
                this.endX = e.mp.changedTouches[0].clientX;
				this.endY = e.mp.changedTouches[0].clientY;
				if(this.startY - this.endY > 20){
				
				}else{
					if (this.startX - this.endX > 25) {
						for (let i = 0; i < this.endList.length; i++) {
							this.endList[i].moveType = 0;
						}
						this.endList[index].moveType = 1;
					} else if (this.startX - this.endX < -25) {
						for (let i = 0; i < this.endList.length; i++) {
							this.endList[i].moveType = 0;
						}
					}
				}
            },
            // 点击回复原状
            recover(index) {
                this.endList[index].moveType = 0;
            },
            // 删除
            delItem(item) {
                this.cscPost("/delete/delItemByOpenidAndItemId.api", {
                        openid: this.openid,
                        itemId: item.id
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            console.log("---------删除成功-------");
                            this.getRecordByOpenId();
                        }
                    })
                    .catch(err => {
                        console.log("---------删除成功-------");
                        console.log(err);
                    });
                console.log(item);
            },
            // 从本地拿openId
            getOpenidFromLocal: function () {
                let openid = wx.getStorageSync("openid");
                let userInfo = wx.getStorageSync("userInfo");
                if (openid) {
                    this.openid = openid;
					this.getRecordByOpenId();
					this.getUserInfoByOpenId();
                } else {
                    this.getUserInfo();
                }
			},
			getUserInfoByOpenId(){
				let userInfo = wx.getStorageSync("userInfo");
				if(userInfo){
					return;
				}
				this.cscPost("/login/getUserInfoByOpenId.api", {
					openid: this.openid,
				})
				.then(res => {
					console.log('-----userInfo是----')
					let userInfo = JSON.stringify(res.data.val[0]);
					if (res.data.code == 0) {
						wx.setStorageSync('userInfo',userInfo)
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
            //初始化
            getUserInfo(e) {
                // 调用登录接口
                wx.login({
                    success: loginRes => {
                        this.jscode = loginRes.code;
                        this.getOpenId();
                    }
                });
            },
            //发送jscode 换openid
            getOpenId: function () {
                // 发送jscode到后台 获取openid
                // console.log("sendJsCode");
                this.cscPost("/login/getOpenIdByJscode.api", {
                        jscode: this.jscode
                    })
                    .then(res => {
                        // console.log("---------取openid成功-------");
                        // console.log(res);
                        if (res.data.code == 0) {
                            let openid = res.data.val;
                            this.openid = openid;
                            wx.setStorageSync("openid", openid);
                            this.getRecordByOpenId();
                        }
                    })
                    .catch(err => {
                        console.log("---------取openid失败-------");
                        console.log(err);
                    });
            },
            //根据openid取记录
            getRecordByOpenId: function () {
                this.startTime = this.pickerDate;
                console.log("根据日期 openid查询记录");
                this.cscPost("/search/searchRecord.api", {
                        openid: this.openid,
                        startTime: this.startTime
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.recordList = res.data.val.recordList;
                            this.spandTotal = 0;
                            this.incomeTotal = 0;
                            for (let i = 0; i < this.recordList.length; i++) {
                                let item = this.recordList[i];
                                item.create_time = item.create_time.slice(5, 10);
                                item.week = this.switchWeek(item.week);
                                if (item.type == 1) {
                                    //支出
                                    this.spandTotal = this.spandTotal - Number(item.count);
                                } else if (item.type == 2) {
                                    //收入
                                    this.incomeTotal = this.incomeTotal + Number(item.count);
                                }
							}
							wx.nextTick(() => {
								this.scrollTop = this.scrollTop+ 90;
							})
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //把星期数字转成汉字
            switchWeek(val) {
                if (val == 1) {
                    return "一";
                } else if (val == 2) {
                    return "二";
                } else if (val == 3) {
                    return "三";
                } else if (val == 4) {
                    return "四";
                } else if (val == 5) {
                    return "五";
                } else if (val == 6) {
                    return "六";
                } else if (val == 7) {
                    return "日";
                }
            },
            //底部导航
            navTo: function (val) {
                let url = "";
                if (val == "charts") {
                    //图标
                    url = "/pages/charts/main";
                } else if (val == "bill") {
                    // 账单
                    url = "/pages/bill/main";
                } else if (val == "index") {
                    //首页
                    console.log("当前页");
                    return;
                } else if (val == "mine") {
                    // 我的
                    url = "/pages/mine/main";
                } else if (val == "chargeAccount") {
                    //记账
                    wx.navigateTo({
                        url: "/pages/chargeAccount/main"
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
            //初始化 初始值
            initDatas() {
                this.spandTotal = 0;
                this.incomeTotal = 0;
            },
            initTime() {
                let now = new Date();
                let thisYear = now.getFullYear();
                let thisMonth = now.getMonth() + 1;
                this.startDate = thisYear - 2 + "-01";
                this.visiableYear = thisYear;
                this.visiableMonth = thisMonth;
                this.pickerDate = thisYear + "-" + thisMonth;
            },
            //时间选择器 取值
            bindTimeChange(e) {
                let tragetTime = e.target.value; //取到的值
                this.visiableYear = tragetTime.slice(0, 4);
                this.visiableMonth = tragetTime.slice(5, 7); // 显示的月份
                this.pickerDate = tragetTime;
                this.getRecordByOpenId();
            }
        }
    };

</script>
<style lang="less">
    .detial {
		height: 100vh;
		overflow: hidden;
		.blk-20{
			height: 20rpx;
		}
        .content {
            padding-bottom: 135rpx;
            width: 100vw;
			overflow-x: hidden;
			.modal{
				position: fixed;
				height: 100vh;
				width: 100vw;
				background-color: rgba(0,0,0,0.5);
				z-index: 10087;
				top: 0;
				left: 0;
				.modal-content{
					width: 80%;
					background-color: #fff;
					padding-top: 20rpx;
					border-radius: 10rpx;
					margin: 40% auto;
					.edie-label{
						padding: 10rpx 40rpx;
						display: block;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 28rpx;
						#editName,#editCount{
							width: 60%;
							display: inline-block;
							border: 1px solid #ccc;
							height: 100%;
							border-radius: 6rpx;
							padding-left: 20rpx;
						}
					}
					.footer-btns{
						position: absolut;
						bottom: 0;
						left: 0;
						width: 100%;
						box-sizing: border-box;
						.cancel {
							width: 50%;
							color: #000;
							display: inline-block;
							text-align: center;
							border-right: 1px solid #EEECEF;
							border-top: 1px solid #EEECEF;
							padding: 20rpx;
							color: #000;
							box-sizing: border-box;
						}
						.confirm{
							width: 50%;
							color: #000;
							display: inline-block;
							text-align: center;
							border-top: 1px solid #EEECEF;
							padding: 20rpx;
							color: #3BC520;
							box-sizing: border-box;
						}
					}
				}
			}
			.head{
				position: fixed;
				top: 0;
				z-index: 10;
				left: 0;
				width: 100%;
			}
			.items-container{
				margin-top: 130rpx;
				height: calc(100vh - 250rpx);
				-webkit-overflow-scrolling: touch;
				overflow-y: auto;
				overflow-x: hidden;
				.has-none {
					text-align: center;
					font-size: 32rpx;
					color: #2cf2b4;
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translateX(-50%);
					width: 100%;
					i {
						font-size: 80rpx;
						margin-bottom: 20rpx;
					}
				}

				.item-time {
					border-bottom: 1rpx solid #f6f6f6;
					position: relative;
					padding: 0 30rpx;
					height: 50rpx;
					line-height: 50rpx;

					.date,
					.week,
					.spend {
						color: #a2a2a2;
						font-size: 24rpx;
					}

					.date {
						margin-right: 10rpx;
					}

					.spend {
						position: absolute;
						top: 50%;
						right: 40rpx;
						transform: translateY(-50%);
					}
				}

				div[data-type="0"] {
					transform: translate3d(0, 0, 0);
				}

				div[data-type="1"] {
					transform: translate3d(-130rpx, 0, 0);
				}

				.items {
					position: relative;
					left: 0;

					.del {
						position: absolute;
						top: 0;
						right: -130rpx;
						background-color: #f03731;
						color: #fff;
						width: 130rpx;
						text-align: center;
						height: 80rpx;
						line-height: 80rpx;
					}

					.item {
						height: 80rpx;
						line-height: 80rpx;
						border-bottom: 1rpx solid #f6f6f6;
						position: relative;
						padding: 0 20rpx;

						i {
							margin-right: 20rpx;
							display: inline-block;
							color: #2cf2b4;
							background-color: #f6f6f6;
							width: 60rpx;
							height: 60rpx;
							line-height: 60rpx;
							text-align: center;
							border-radius: 50%;
							font-size: 34rpx;
						}

						span {
							font-size: 26rpx;
							color: #535353;
						}
						.des{
							font-size: 20rpx;
							color: rgb(190, 189, 189);
						}

						.price {
							position: absolute;
							right: 40rpx;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}
			}

            .head {
                background-color: #2cf2b4;

                .h-top {
                    span {
                        display: inline-block;
                        color: #fff;
                        height: 60rpx;
                        line-height: 60rpx;
                        font-size: 28rpx;
                        text-align: center;
                    }

                    .time {
                        width: 26%;
                        text-align: center;
                    }

                    .income,
                    .spend, .left{
                        width: 24%;
                        text-align: center;
                    }
                }

                .h-bottom {
                    span {
                        display: inline-block;
                        color: #fff;
                        height: 70rpx;
                        line-height: 70rpx;
                        font-size: 30rpx;
                        text-align: center;
                        font-weight: 900;
                    }

                    .time {
                        width: 26%;

                        .picker {
                            text-align: center;

                            i {
                                display: inline;
                            }
                        }
                    }

                    .income,
                    .spend {
                        width: 24%;
                    }
                }
            }
        }
    }

</style>
