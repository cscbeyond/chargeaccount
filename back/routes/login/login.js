var express = require('express');
var router = express.Router();
var axios = require('axios');
const wxAppid = 'wxd88cc086f1912291';
const wxSecret = '0051d10207e1bb7309a7e5b2e47dfb78';
let { db } = require('../../globalConfig');

global.timeStamp = Date.now();
router.post('/updateUserInfo.api',(req,res,next)=>{
	let reqBody = req.body;
	let openid = reqBody.openid;
	let userInfo = reqBody.userInfo;
	function sendResult(code, val) {
		res.json({
			code: code,
			val: val
		});
	}
	db.query(`UPDATE user SET avatarUrl='${userInfo.avatarUrl}',nickname='${userInfo.nickName}' WHERE openid='${openid}'`,(err,data)=>{
		if(err){
			console.log(err)
			console.log('------更新userinfo出问题');
			sendResult(500,'出现问题');
		}else{
			sendResult(0,'更新成功');
		}
	})
})
router.post('/getUserInfoByOpenId.api',(req,res,next)=>{
	let reqBody = req.body;
	let openid = reqBody.openid;
	function sendResult(code, val) {
		res.json({
			code: code,
			val: val
		});
	}
	db.query(`SELECT * FROM user WHERE openid='${openid}'`,(err,data)=>{
		if(err){
			console.log(err)
			console.log('------更新userinfo出问题');
			sendResult(500,'出现问题');
		}else{
			sendResult(0,data);
		}
	})
})
router.post('/getOpenIdByJscode.api',  (req, res, next)=> {
	let jscode = req.body.jscode;
	let now = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
	console.log('=============now==============')
	console.log(now);
	function sendResult(code, val) {
		res.json({
			code: code,
			val: val
		});
	}
	const code2sessUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wxAppid + '&secret=' + wxSecret + '&js_code=' + jscode + '&grant_type=authorization_code';
	axios.get(code2sessUrl).then((res1) => {
		console.log('-------------code2sessUrl--------res----------------------');
		console.log(res1.data);
		let openid = res1.data.openid;
		db.query(`SELECT * FROM user WHERE openid='${openid}'`, function (error, results) {
			if (error) {
				console.log('--getOpenIdByJscode----------查询数据库出错------------')
				console.log(error);
				sendResult(501, '去数据库查询openid失败');
			} else {
				console.log('---getOpenIdByJscode----根据openid查出来的数据-------------')
				console.log(results);
				if (results.length == 0) { // 新用户
					console.log("用户不存在，插入");
					db.query(`
						INSERT INTO user 
						(
							create_time,
							openid,
							last_login_time
						) 
						VALUES
						(
							'${now}',
							'${openid}',
							'${now}'
						)
						`, function (insertErr, insertRet) {
						if (insertErr) {
							console.log('---getOpenIdByJscode----插入失败---------')
							sendResult(502, '插入用户信息失败');
							console.log(insertErr)
						} else {
							console.log('----getOpenIdByJscode---插入成功---------')
							console.log(insertRet);
							sendResult(0, openid);
						}
					});
				} else { //用户已经存在
					sendResult(0, openid);
				}
			}
		});
		//查询数据库
	}).catch((err1) => {
		console.log('--------getOpenIdByJscode---------error-------');
		console.log(err1);
		sendResult(500, err1);
	});
});

module.exports = router;