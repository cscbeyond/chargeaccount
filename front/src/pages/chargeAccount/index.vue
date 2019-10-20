<template>
    <div class="charge-account">
		<div class="modal" v-if="modalShow">
			<div class="modal-content">
				<input class="self-define-name" v-model="selfDefineName" placeholder="请输入自定义名称（最多四个字）" type="text">
				<div class="footer-btns">
					<span class="cancel" @click.stop="cancelBtn">取消</span>
					<span class="confirm" @click.stop="confirmBtn">确认</span>
				</div>
			</div>
		</div>
        <div class="tab">
            <div class="tab-container">
                <span @click="changeTab('spend')" class="btn spend" :class="{'active':activeTab == 'spend'}">
                    支出
                </span><span @click="changeTab('make')" class="btn make" :class="{'active':activeTab == 'make'}">收入</span>
            </div>
        </div>
        <div class="tab-content" :class="{'mb500':keyBoard =='show'?true:false}">
			<!-- 支出 -->
            <div class="tab-plane spend-items" :class="{'active':activeTab == 'spend'}">
                <div class="flex">
					<div @longpress='longTap($event,icon)' @click="addItem(icon)" class="item" v-for="(icon,idx) in iconJson" :key="idx" v-if="icon.type == 1 && icon.openid">
                        <span class="icon-box">
                            <i class="iconfont" :class="[icon.icon,{'bgcblue':selectedItemId == icon.id}]"></i>
                        </span>
                        <span class="des">{{icon.des}}</span>
                    </div>
                    <div @click="addItem(icon)" class="item" v-for="(icon,idx) in iconJson" :key="idx" v-if="icon.type == 1 && !icon.openid">
                        <span class="icon-box">
                            <i class="iconfont" :class="[icon.icon,{'bgcblue':selectedItemId == icon.id}]"></i>
                        </span>
                        <span class="des">{{icon.des}}</span>
                    </div>
					<div @click="selfDefine('spend')" class="item">
                        <span class="icon-box">
                            <i class="iconfont icon-jiahao"></i>
                        </span>
                        <span class="des">自定义</span>
                    </div>
                </div>
            </div>
			<!-- 收入 -->
            <div class="tab-plane make-items" :class="{'active':activeTab == 'make'}">
                <div class="flex">
					<div @longpress='longTap($event,icon)' @click="addItem(icon)" class="item" v-for="(icon,idx) in iconJson" :key="idx" v-if="icon.type == 2 && icon.openid">
                        <span class="icon-box">
                            <i class="iconfont" :class="[icon.icon,{'bgcblue':selectedItemId == icon.id}]"></i>
                        </span>
                        <span class="des">{{icon.des}}</span>
                    </div>
                    <div @click="addItem(icon)" class="item" v-for="(icon,idx) in iconJson" :key="idx" v-if="icon.type == 2 && !icon.openid">
                        <span class="icon-box">
                            <i class="iconfont" :class="[icon.icon,{'bgcblue':selectedItemId == icon.id}]"></i>
                        </span>
                        <span class="des">{{icon.des}}</span>
                    </div>
					<div @click="selfDefine('make')" class="item">
						<span class="icon-box">
							<i class="iconfont icon-jiahao"></i>
						</span>
						<span class="des">自定义</span>
					</div>
                </div>
            </div>
        </div>
		<div v-if="keyBoard == 'show'" style="height: 500rpx;"></div>
        <div class="key-board" :class="keyBoard">
            <div class="key-board-head">
				<div class="des-val-container">
					<label class="label" for="des">备注：<input v-model="des" placeholder="（选填）" type="text" id="des"></label><input disabled v-model="countVal" type="text" name="" id="bill">
				</div>
            </div><div class="key-board-body">
                <div class="btns" @click="inputCount">
                    <div class="btn" data-num="7">7</div>
                    <div class="btn" data-num="8">8</div>
                    <div class="btn" data-num="9">9</div>
                    <div class="btn">今天</div>
                    <div class="btn" data-num="4">4</div>
                    <div class="btn" data-num="5">5</div>
                    <div class="btn" data-num="6">6</div>
                    <div class="btn" data-opt="clear">清空</div>
                    <div class="btn" data-num="1">1</div>
                    <div class="btn" data-num="2">2</div>
                    <div class="btn" data-num="3">3</div>
                    <div class="btn" data-opt="cancel">取消</div>
                    <div class="btn" data-num=".">.</div>
                    <div class="btn" data-num="0">0</div>
                    <div class="btn" data-opt="del">Del</div>
                    <div class="btn" data-opt="finish">完成</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '@/utils/store.js';
    export default {
        data() {
            return {
                activeTab: 'spend',
                iconJson: [],
                keyBoard: 'hide',
                selItem: {},
                selectedItemId: null,
                countVal: '',
                userId: null,
                openid: null,
				type: 'spend',
				des: '',
				modalShow: false, //自定义的弹框
				selfDefineName: '',
				sdType: 'spend', // 自定义的类型 收入还是支出
				touchStartTimeStamp: 0,
				touchEndTimeStamp: 0,
				delIconId: '',
            }
		},
		onShow(){
			this.keyBoard = 'hide'; //隐藏键盘
			// this.keyBoard = 'show'; //显示键盘
			this.countVal = ''; //清空输入
			this.selectedItemId = null; //选中的状态 置空
			this.des = ''; //选中的状态 置空
		},
		onShareAppMessage: function () {
			console.log('分享功能');
		},
		watch: {
			des:function(nv){
				if(nv.length >= 10){
					wx.showToast({
                        title: '最多可输入9个字节',
                        icon: 'none',
                        duration: 1000,
					});
					this.des=nv.slice(0,9);
				}
			}	
		},
        methods: {
			longTap(e,icon){
				console.log(e);
				console.log(icon);
				wx.showModal({
					title: '警告',
					content: '确定删除吗？',
					success:(res)=> {
						if (res.confirm) {
							this.delSelfDefine(icon.id)
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			delSelfDefine(id){
				console.log(id);
				this.cscPost('/delsd/delSelfDefineItems.api', {
                    id: id,
                    openid: wx.getStorageSync('openid'),
                }).then(res => {
                    console.log('--------插入 的返回结果-----');
                    console.log(res);
                    if (res.data.code == 0) {
						wx.showToast({
							title: '删除成功',
							icon: 'none',
							duration: 1500,
						});
            			this.getIcons();
                    }
                }).catch(err => {
                    console.log('-----插入失败 错误是-----');
                    console.log(err);
				})
			},
			selfDefine:function(type){
				if(type == 'spend'){
					this.sdType = 'spend';
					this.modalShow = true;
					this.keyBoard = 'hide'; //隐藏键盘
					this.selItem.id = null;
					
				}else{
					this.sdType = 'make';
					this.modalShow = true;
					this.keyBoard = 'hide'; //隐藏键盘
					this.selItem.id = null;
				}
			},
			cancelBtn(){
				this.modalShow = false;
				this.selfDefineName = '';
			},
			confirmBtn(){
				if(!this.selfDefineName){
					wx.showToast({
                        title: '请输入自定义名称',
                        icon: 'none',
                        duration: 1000,
                    });
					return;
				}
			this.cscPost('/addsd/addSelfDefineItems.api', {
                    type: this.sdType,
                    openid: wx.getStorageSync('openid'),
					name: this.selfDefineName,
					icon: 'icon-xingxing1',
                }).then(res => {
                    console.log('--------插入 的返回结果-----');
                    console.log(res);
                    if (res.data.code == 0) {
						wx.showToast({
							title: '成功，长按图标可删除',
							icon: 'none',
							duration: 1500,
						});
						setTimeout(() => {
							this.modalShow = false;
							this.selfDefineName = '';
							this.getIcons();
						}, 800);
                    }
                }).catch(err => {
                    console.log('-----插入失败 错误是-----');
                    console.log(err);
                })
				console.log(this.selfDefineName);
				console.log(this.sdType);
			},
            inputCount (e) {
                let num;
                if (this.countVal.length <= 9) {
                    if (e.target.dataset.num) {
                        num = e.target.dataset.num;
                        this.countVal = this.countVal + num;
                    }else{
						if (e.target.dataset.opt == 'del') {
							this.countVal = this.countVal.slice(0, (this.countVal.length - 1));
						} else if (e.target.dataset.opt == 'clear') {
							this.countVal = '';
						} else if (e.target.dataset.opt == 'cancel') {
							// 取消
							this.selItem = null;
							this.keyBoard = 'hide'; //隐藏键盘
							this.countVal = ''; //清空输入
							this.selectedItemId = null; //选中的状态 置空
						} else if (e.target.dataset.opt == 'finish') {
							this.insertRecord();
						}
					}
                }else if(e.target.dataset.opt){
					if (e.target.dataset.opt == 'del') {
                        this.countVal = this.countVal.slice(0, (this.countVal.length - 1));
                    } else if (e.target.dataset.opt == 'clear') {
                        this.countVal = '';
                    } else if (e.target.dataset.opt == 'cancel') {
                        // 取消
						this.selItem = null;
                        this.keyBoard = 'hide'; //隐藏键盘
						this.countVal = ''; //清空输入
                        this.selectedItemId = null; //选中的状态 置空
                    } else if (e.target.dataset.opt == 'finish') {
                        this.insertRecord();
                    }
				}else{
					wx.showToast({
                        title: '最多可输入10位数',
                        icon: 'none',
                        duration: 1000,
                    });
					return;
				}
            },
			//插入记账记录
            insertRecord: function () {
                if(!this.selItem.id){
					wx.showToast({
                        title: '请选择账目项',
                        icon: 'none',
                        duration: 1000,
                    });
                    return
				} else if(this.countVal == ''){
                    wx.showToast({
                        title: '金额不能为空',
                        icon: 'none',
                        duration: 1000,
                    });
                    return
                }else if(this.des.length > 8){
					wx.showToast({
                        title: '备注内容最多7个字符',
                        icon: 'none',
                        duration: 1000,
                    });
                    return
				}
				
                this.cscPost('/insert/insertrecord.api', {
                    type: this.type,
                    itemId: this.selItem.id,
                    val: this.countVal,
                    openid: wx.getStorageSync('openid'),
					itemName: this.selItem.des,
					icon: this.selItem.icon,
					itemDes: this.des
                }).then(res => {
                    console.log('--------插入 的返回结果-----');
                    console.log(res);
                    if (res.data.code == 0) {
                        wx.showToast({
                            title: res.data.val,
                            duration: 1000,
                            success: () => {
                                wx.navigateBack({
                                    deltal: 1
                                })
                            }
                        })
                    }
                }).catch(err => {
                    console.log('-----插入失败 错误是-----');
                    console.log(err);
                })
            },
            //添加记账记录
            addItem: function (item) {
				this.$forceUpdate();
				this.selItem = null;
                console.log(this.selItem);
				this.selItem = item;
				this.selectedItemId = item.id;
				this.keyBoard = 'show';
            },
            //拿到这些图标
            getIcons: function () {
                this.cscPost('/icons/getIcon.api',{
                    openid: wx.getStorageSync('openid'),
				}).then(res => {
                    console.log('-----查询图标------');
                    console.log(res);
                    if (res.data.code == 0) {
                        this.iconJson = res.data.val;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            // 收入及支出切换
            changeTab: function (type) {
                if (type == 'spend') {
                    this.activeTab = 'spend';
                    this.type = 1;
                    console.log('支出');
                } else if (type == 'make') {
                    this.activeTab = 'make';
                    this.type = 2;
                    console.log('收入');
                }
            }
        },
        onLoad() {
            wx.setNavigationBarTitle({
                title: '小记一笔'
            });
            wx.setNavigationBarColor({
                frontColor: '#ffffff', //前景颜色值，包括按钮、标题、状态栏的颜色。微信小程序官方规定:仅支持 #ffffff 和 #000000
                backgroundColor: '#2CF2B4' //背景颜色值，有效值为十六进制颜色
            });
            this.getIcons();
        },
        created() {
            // 调用应用实例的方法获取全局数据
        },
    }

</script>

<style lang="less">
    .charge-account {
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
				.self-define-name{
					display: block;
					width: 80%;
					margin: 40rpx auto;
					border: 1px solid #ccc;
					border-radius: 8rpx;
					padding-left: 20rpx;
					font-size: 26rpx;
					height: 80rpx;
					line-height: 80rpx;
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
        .show {
            display: block;
        }

        .hide {
            display: none;
        }

        .key-board {
            position: fixed;
            bottom: 0;
            left: 0;
            border: 1px solid #EFEFEF;
            width: 100%;
            background-color: #fff;

            .key-board-head {
                height: 80rpx;
				line-height: 80rpx;
				box-sizing: content-box;
				padding-left: 10rpx;
				.des-val-container{
					height: 80rpx;
					line-height: 80rpx;
					position: relative;
					.label{
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						height: 60rpx;
						line-height: 60rpx;
						font-size: 26rpx;
						width: 60%;
						color: #828182;
						#des{						
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							height: 60rpx;
							line-height: 60rpx;
							font-size: 32rpx;
							display: inline-block;
							color: #000;
						}
					}
					#bill{
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
						height: 60rpx;
						line-height: 60rpx;
						width: 40%;
						font-weight: 600;
						font-size: 40rpx;
						display: inline-block;
						text-align: right;
						padding-right: 20rpx;
					}
				}
            }

            .key-board-body {
                .btns {
                    .btn {
                        padding: 20rpx;
                        text-align: center;
                        box-sizing: border-box;
                        width: 25%;
                        border: 1px solid #EFEFEF;
						display: inline-block;
						&:active{
							background-color: #2CF2B4;
						}
                    }
                }
            }
        }

        .tab {
            background-color: #2CF2B4;
            padding-bottom: 30rpx;
            padding-top: 30rpx;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;

            .tab-container {
                width: 80%;
                margin: 0 auto;
                .btn {
                    box-sizing: border-box;
                    width: 50%;
                    display: inline-block;
                    border: 1px solid #343233;
                    text-align: center;
                }

                .spend {
                    border-right: none;
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                .make {
                    border-left: none;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                }
                .active {
					transition: all .3s ease;
                    color: #2CF2B4;
                    background-color: #343233;
                }
            }
        }

        .tab-content {
            margin-top: 80rpx;

            .tab-plane {
                display: none;

                .flex {
                    box-sizing: border-box;

                    .item {
                        box-sizing: border-box;
                        width: 25%;
                        display: inline-block;
                        padding: 10rpx;
                        text-align: center;

                        .icon-box {
                            padding: 10rpx;

                            i {
                                width: 40rpx;
                                height: 40rpx;
                                margin: 0 auto;
                                border-radius: 50%;
                                background-color: #F6F6F6;
                                color: #535353;
                                font-size: 40rpx;
								padding: 30rpx;
								line-height: 40rpx;
                            }

                            .bgcblue {
								transition: all .3s ease;
                                background-color: #2CF2B4;
                            }
                        }

                        .des {
                            font-size: 26rpx;
                        }
                    }

                }
            }

            .spend-items.active {
                display: block;
            }

            .make-items.active {
                display: block;
            }
        }
    }

</style>
