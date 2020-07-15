
exports.profiles_view = (req, res, next) => {
	res.status(200).json({
		message: 'This is your profile data'
	});	
};