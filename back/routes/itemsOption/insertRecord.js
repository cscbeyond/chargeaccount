let express = require('express');
let router = express.Router();
let { db } = require('../../globalConfig');

router.post('/insertrecord.api', function (req, res) {
	let now = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
	let week = new Date().getDay() + 1;
	let reqBody = req.body;
	let openid = reqBody.openid;
	let itemId = reqBody.itemId;
	let count = reqBody.val;
	let type = reqBody.type;
	let icon = reqBody.icon;
	let itemName = reqBody.itemName;
	let des = reqBody.itemDes;

	function sendRet(code, val) {
		res.json({
			code: code,
			val: val
		})
	}
	if (type == 'spend') {
		type = 1
	} else if (type == 'make') {
		type = 2;
	}
	db.query(`INSERT INTO account_record (
			openid,
			create_time,
			count,
			type,
			item_name,
			icon,
			week,
			des
		)
		VALUES
		(
			'${openid}',
			'${now}',
			${count},
			${type},
			'${itemName}',
			'${icon}',
			'${week}',
			'${des}'
		)`, function (err, data) {
		if (err) {
			console.log('--------插入时候发生错误--------')
			console.log(err);
			sendRet(500, '发生错误');
		} else {
			console.log('----记账成功-------')
			console.log(data);
			sendRet(0, '成功');
		}
	})
})
module.exports = router;