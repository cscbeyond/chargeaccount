<template>
    <div class="detial">
        <div class="header">
			<div class="surplus">
				<span class="mid">结余</span>
				<picker mode="date" :value="pickerDate" :start="startDate" end="2030-02" fields="month" @change="bindTimeChange($event)">
					<view class="picker ">
						{{visiableYear}}年
						<i class="down iconfont icon-tubiaozhizuo-"></i>
					</view>
				</picker>
			</div>
		</div>
      
        <div class="tabbar">
            <div class="tabbar-items">
                <div class="tabbar-item" @click="navTo('index')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-shouzhiliushui"></i>
                    </div>
                    <div class="tabbar-text">明细</div>
                </div>
                <div class="tabbar-item" @click="navTo('charts')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-tubiao"></i>
                    </div>
                    <div class="tabbar-text">图表</div>
                </div>
                <div class="tabbar-item" @click="navTo('chargeAccount')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-jiahao"></i>
                    </div>
                    <div class="tabbar-text">记账</div>
                </div>
                <div class="tabbar-item active" @click="navTo('bill')">
                    <div class="tabbar-icon">
                        <i class="iconfont icon-zhangdan"></i>
                    </div>
                    <div class="tabbar-text">账单</div>
                </div>
                <div class="tabbar-item" @click="navTo('mine')">
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
    import card from '@/components/card'
    import Swiper from '@/components/swiper'
    export default {
        data() {
            return {
				userInfo: {},
				startDate: '2010-12',
				pickerDate: '2018-11',
				visiableYear: 2017,
            }
        },
        components: {
            card,
            Swiper
        },

        methods: {
			bindTimeChange(){

			},
            bindViewTap() {
                const url = '../logs/main'
                wx.navigateTo({
                    url
                })
            },
            //底部导航
            navTo: function (val) {
                if (val) {
                    let url = '';
                    url = '/pages/' + val + '/main';
                    this.myRedirect(url);
                } else {
                    return;
                }
            },
            myRedirect: function (url) {
                wx.redirectTo({
                    url: url,
                    success: (res) => {
                        console.log(res);
                    },
                    fail: (err) => {
                        console.log(err);
                    },
                    comlete: (data) => {
                        console.log(data);
                    }
                })
            },
            getUserInfo() {
                // 调用登录接口
                wx.login({
                    success: () => {
                        wx.getUserInfo({
                            success: (res) => {
                                this.userInfo = res.userInfo
                            }
                        })
                    }
                })
            },
            clickHandle(msg, ev) {
                console.log('clickHandle:', msg, ev)
            }
        },

        created() {
            // 调用应用实例的方法获取全局数据
            this.getUserInfo()
        }
    }

</script>

<style lang="less">
    .detial {
        margin-bottom: 110rpx;
		.header{
			padding-top: 50rpx;
			background-color: #2CF2B4;
			.surplus{
				.mid{
					display: inline-block;
					margin: 0 auto;
					text-align: center;
				}
				picker{
					float: right;
					.picker{
						display: inline-block;
					}
				}
			}
		}
    }

</style>
