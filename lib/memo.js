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
			// こちらで決めなくても、自動で1ずつIDが足されていく
			autoIncrement: true,
			// これはN予備を確認！(3章23)
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			// nullを許容するかというフィールド！
			// nullはデータが入っていない状態だから、データを入れない場合があるフィールド以外は基本はこれを設定
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		isLocked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		}
	},
	{
		freezeTableName: true,
		timestamps: true
	}
);

Memo.sync();
module.exports = Memo;
