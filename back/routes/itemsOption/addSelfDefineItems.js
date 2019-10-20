let express = require('express');
let router = express.Router();
let { db } = require('../../globalConfig');

router.post('/addSelfDefineItems.api', function (req, res, next) {
	let reqBody = req.body;
	let openid = reqBody.openid;
	let itemId = reqBody.itemId;
	let count = reqBody.val;
	let type = reqBody.type;
	let icon = reqBody.icon;
	let itemName = reqBody.name;

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
	db.query(`INSERT INTO icons (
			openid,
			type,
			icon,
			des
		)
		VALUES
		(
			'${openid}',
			${type},
			'${icon}',
			'${itemName}'
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