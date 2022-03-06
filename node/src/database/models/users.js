"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.todos, {
				foreignKey: "usernameId",
			});
		}

		validatePassword = async (password) => {
			const isValid = await bcrypt.compare(password, this.password);
			return isValid;
		};
	}
	users.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "users",
		}
	);
	return users;
};
