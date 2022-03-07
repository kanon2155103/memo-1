'use strict'
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
	'postgres://postgres:postgres@db/memo',
	{
		logging: false
	}
);
const Post = sequelize.define(
	'Post',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING
		},
		content: {
			type: DataTypes.TEXT
		},
		isLocked: {
			type: DataTypes.BOOLEAN
		},
		isDeleted: {
			type: DataTypes.BOOLEAN
		}
	},
	{
		freezeTableName: true,
		timestamps: true
	}
);

postMessage.sync();
module.exports = Post;
