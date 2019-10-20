<script>
    export default {
        created() {
            // 调用API从本地缓存中获取数据
            const logs = wx.getStorageSync('logs') || []
            logs.unshift(Date.now())
            wx.setStorageSync('logs', logs)
            console.log('app created and cache logs by setStorageSync')
		},
    }

</script>

<style lang="less">
// 底部导航

    .tabbar {
        width: 100%;
        height: 100rpx;
        box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, .6);
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10010;
        background: #fff;
        .tabbar-items{
            display: flex;
            align-items: center;
            justify-content: center;
			height: 100%;
			.center{
				margin-bottom: 30rpx;
			}
            .active{
                color: #2CF2B4;
            }
            .tabbar-item{
                width: 33%;
                font-size: 30rpx;
                .tabbar-icon{
                    text-align: center;
                    .iconfont{
						font-size:36rpx;
					}
					.center-btn{
						width:40rpx;
						margin:0 auto;
						height:40rpx;
						background: #2CF2B4;
						color: #181818;
						border-radius: 50%;
						color: #fff;
						border: 1px solid #2CF2B4;
						font-weight: 800;
						line-height: 40rpx;
						text-align: center;
						padding: 15rpx;
					}
                }
                .tabbar-text{
                    text-align: center;
                }
            }
        }
    }

    @import url('./pages/static/assets/fonts/iconfont.css');

    * {
        box-sizing: border-box;
    }

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 200rpx 0;
    }

    /* this rule will be remove */
    * {
        transition: width 2s;
        -moz-transition: width 2s;
        -webkit-transition: width 2s;
        -o-transition: width 2s;
    }

</style>
