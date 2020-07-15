const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.users_sign_up = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'Email address is already in use'
				});
			} else {
				bcrypt.hash(req.body.password, 12, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash
						});
						user
							.save()
							.then(result => {
								res.status(201).json({
									message: 'Successfully created new user'
								});
							})
							.catch(error => {
								res.status(500).json({
									error: error
								});
							});
					}
				});
			}
		});	
};

exports.users_log_in = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: 'Authorization failed'
				});
			}
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (err) {
					return result.status(401).json({
						message: 'Authorization failed'
					})
				} else if (result) {
					const token = jwt.sign(
						{
							email: user.email,
							userId: user._id
						},
						process.env.JWT_KEY,
						{
							expiresIn: '1h'
						}
					);
					return res.status(200).json({
						message: 'Authorization succeeded',
						token: token
					});
				} else {
					res.status(401).json({
						message: 'Authorization failed'
					});
				}
			});
		})
		.catch(err => {
			res.status(401).json({
				message: 'Authorization failed'
			});
		});
};

exports.users_delete = (req, res, next) => {
	User.find({ _id: req.params.userId })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				User.remove({ _id: req.params.userId })
					.exec()
					.then(result => {
						res.status(200).json({
							message: 'Deleted user'
						});
					})
					.catch(err => {
						res.status(500).json({
							error: err
						});
					});
			} else {
				res.status(409).json({
					message: 'Nothing to delete. The user does not exist'
				});
			}		
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};