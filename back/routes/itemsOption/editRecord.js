const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');
let { db } = require('../../globalConfig');

router.post('/editRecord.api', (req, res) => {
	let reqBody = req.body;
	let itemId = reqBody.itemId;
	let itemName = reqBody.editName;
	let itemCount = reqBody.editCount;
	console.log(itemCount)
	function sendResult(code, val) {
		res.json({
			code: code,
			val: val
		});
	};
	db.query(`UPDATE account_record SET item_name='${itemName}', count=${itemCount} WHERE id=${itemId}`,(err,data)=>{
		if(err){
			sendResult(503, '编辑失败');
			console.log(err);
		}else{
			sendResult(0, '成功');
		}
	})
})
module.exports = router;