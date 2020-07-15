const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const authToken = jwt.verify(token, process.env.JWT_KEY);
		req.userData = authToken;
	} catch (error) {
		return res.status(401).json({
			message: 'Authorization failed'
		});
	}
	next();
}