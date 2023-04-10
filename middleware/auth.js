function tokenErr(msg) {
	throw new global.err({
		code: 401,
		data: {},
		msg: msg || 'token不合法~'
	})
}

const auth = async (ctx, next) => {
	/**
	 * 效验流程
	 * 1、获取前端传递过来的token
	 * 2、如果没有报错
	 * 3、解析token（非对称加密）
	 * 4、如果没有报错
	 * 5、去redis中查询token
	 * 6、如果存在
	 * 7、判断时间是否超过一天
	 * 8、如果不存在
	 * 9、直接报错
	 */

	const token = ctx.req.headers.authorization
	if (!token) {
		tokenErr('token是必填参数~')
	}

	let decryptToken = global.config.decrypt(token)
	decryptToken = JSON.parse(decryptToken)

	const isExistence = await global.client.SISMEMBER('token', token)

	console.log('isExistence', isExistence);

	if (isExistence) {
		const curTime = new Date().getTime()
		const time = curTime - decryptToken.t
		if (time > 1 * 1000 * 60 * 60 * 24) {
			tokenErr('token以过期，请重新登录')
		}
	} else {
		tokenErr('token不存在！')
	}

	ctx.auth = {
		uid: decryptToken.u
	}

	await next()
}

module.exports = auth
