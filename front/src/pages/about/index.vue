<template>
    <div class="about">
        <div class="head">
            <h4>功能介绍</h4>
        </div>
        <div class="blk-10"></div>
        <div class="mid">
		   <div>
			   <ul>

				   <li>首页：</li>
				   <li>1、长按账单可重新编辑，右滑账单可删除账单。</li>
				   <li>2、左上角可查看时间段的账单记录，按“今天”可选择添加账单时间。</li>
			   </ul>
			   <ul>
				   <li>记账页：</li>
				   <li>1、支出与收入可自定义名称，长按自定义名称可删除。</li>
				   <li></li>
			   </ul>
		   </div>
        </div>

		<div class="suggess">
			如果您在使用中遇到了任何问题，请联系微信:cscbeyond或关注公众号：Folk and Rock，发送消息反馈问题即可，客服人员会在第一时间联系您并帮您解决问题。您的反馈，就是我们进步的动力！
		</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {},
        onShow() {},
        onShareAppMessage: function () {},
        methods: {
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
                } else if (val == 'exchange') {
                    wx.navigateTo({
                        url: '/pages/exchange/main'
                    });
                    return;
                } else if (val == 'about') {
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
		onLoad() {
            wx.setNavigationBarTitle({
                title: '关于点滴'
            });
            wx.setNavigationBarColor({
                frontColor: '#ffffff', //前景颜色值，包括按钮、标题、状态栏的颜色。微信小程序官方规定:仅支持 #ffffff 和 #000000
                backgroundColor: '#2CF2B4' //背景颜色值，有效值为十六进制颜色
            });
        },
    }

</script>

<style lang="less">
    .about {
		box-sizing: border-box;
		padding-top: 40rpx;
		height: 100vh;
		background-color: rgb(248, 247, 247);
		padding-bottom: 120rpx;
		overflow: auto;
		.head{
			h4{
				text-align: center;
				font-size: 36rpx;
			}
		}
		.mid{
			div{
				ul{
					padding: 30rpx;
					li{
						text-indent: 20rpx;
						font-size: 30rpx;
					}
				}
			}
		}

		.suggess{
			margin-top: 40rpx;
			padding: 30rpx;
			text-indent: 30rpx;
			color: #ccc;
			font-size: 28rpx;
		}
	}

</style>
