const express = require('express');
const router = express.Router();
const moment = require('moment');
let { db } = require('../../globalConfig');


router.post('/searchRecord.api', (req, res) => {
	let reqBody = req.body;
	let openid = reqBody.openid;
	let startTime = reqBody.startTime + '-01 ' + '00:00:00';
	let endTime;
	let now = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
	let thisYear = new Date(startTime).getFullYear();
	let thisMonth = new Date(startTime).getMonth() + 1; //正常的月份，最大值 12
	if(thisMonth + 1 > 12){
		thisYear = thisYear + 1;
		endTime = thisYear + '-' + '01-01 00:00:00';
	}else{
		endTime = thisYear + '-' + (thisMonth + 1) + '-01 00:00:00';
	}
	function sendResult(code, val) {
		res.json({
			code: code,
			val: val
		});
	};
	db.query(`UPDATE user SET last_login_time='${now}' WHERE openid='${openid}'`,(err,data)=>{
		if(err){
			sendResult(503, 'searchRecord.api: openid已经存在，更新最后登录日期出现问题');
			console.log(err);
		}else{
			db.query(`SELECT * FROM account_record WHERE create_time BETWEEN '${startTime}' AND '${endTime}' AND openid = '${openid}'`, function (er, queryRes) {
				if (er) {
					console.log(er);
					sendResult(503, 'searchRecord.api: openid已经存在，去查记录的时候出了问题');
				} else {
					let resJson = {};
					// console.log('-------------查出来的记账记录-----------');
					// console.log(queryRes);
					for(let i = 0; i < queryRes.length; i++){
						let item = queryRes[i];
						item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
					}
					resJson.recordList = queryRes;
					sendResult(0, resJson);
				}
			});
		}
	})
})
module.exports = router;