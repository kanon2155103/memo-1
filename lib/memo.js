'use strict'
const { Sequelize, DataTypes } = require('sequelize');
const dialectOptions = {
	ssl: {
		require: true,
		rejectUnauthorized: false
	}
};
const sequelize = process.env.DATABASE_URL ?
	// 本番環境
	new Sequelize(
		process.env.DATABASE_URL,
		{
			logging: false,
			dialectOptionns
		}
	)
	:
	// 開発環境
	new Sequelize(
		'postgres://postgres:postgres@db/memo',
		{
			logging: false
		}
	);

const Memo = sequelize.define(
	'Memo',
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

Memo.sync();
module.exports = Memo;
