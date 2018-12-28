const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		avatar: Object,
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		dob: Date,
		gender: {
			type: String,
			enum: ['male', 'female'],
			required: true,
		},
		country: String,
		phoneNumber: String,
		zipcode: {
			type: Number,
			min: 1000,
			max: 999999,
		},
		username: {
			type: String,
			required: true,
			validate: {
				validator: function(v) {
					return /^[A-Za-z0-9_.-]+$/.test(v);
				},
				message: props => `${props.value} is not a valid username!`,
			},
		},
		email: {
			type: String,
			required: true,
			validate: [
				{
					validator: function(v) {
						return /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(v);
					},
					message: props => `${props.value} is not a valid email!`,
				},
				{
					validator: function(v) {
						return mongoose
							.model('User')
							.countDocuments({ email: v })
							.exec()
							.then(count => count === 0);
					},
					message: props => `${props.value} is duplicated!`,
				},
			],
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ['admin', 'moderator', 'user'],
			required: true,
		},
		dateCreated: {
			type: Date,
			default: Date.now,
		},
	},
	{ toJSON: { virtuals: true } }
);

userSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
