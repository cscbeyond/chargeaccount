let express = require('express');
let router = express.Router();
let { db } = require('../../globalConfig');

router.post('/delItemByOpenidAndItemId.api',(req,res,next)=>{
	let openid = req.body.openid;
	let itemId = req.body.itemId;
	function sendRet(code, val) {
		res.json({
			code: code,
			val: val
		})
	};
	db.query(`DELETE FROM account_record WHERE id='${itemId}' AND openid='${openid}'`,(err,data)=>{
		if(err){
			console.log(err);
			console.log('----------删除数据出现错误-----------');
			sendRet(500,'删除数据出现错误');
		}else{
			console.log('----删除成功-------')
			console.log(data);
			sendRet(0, '成功');
		}
	})
})
module.exports = router;