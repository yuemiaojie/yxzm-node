const catchError = async (ctx, next) => {
	try {
		await next()
	} catch (error) {
		console.log('catchError ------------------>', error)

		const { code, data, message } = error
		// 返回检测
		ctx.body = {
			code: code || 500,
			data: data || {},
			msg: message || 'error'
		}
	}
}

module.exports = catchError
