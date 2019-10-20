let express = require('express');
let router = express.Router();
let { db } = require('../../globalConfig');
router.post('/getIcon.api',function(req,res,next){
	console.log('--------查询icons-----------');
	let openid = req.body.openid;
	console.log(openid)
	function sendResult(code, val) {
		res.json({
			code: code,
			val: val
		});
	}
	db.query(`SELECT * FROM icons WHERE openid= '${openid}' OR (openid is NULL)`,(iconErr,iconData)=>{
		if(iconErr){
			console.log(iconErr);
			sendResult(500,'查询失败');
		}else{
			console.log('查询成功了');
			sendResult(0,iconData);
		}
	})
});
module.exports = router;