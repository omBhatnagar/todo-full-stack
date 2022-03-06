"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class todos extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.users, {
				foreignKey: "usernameId",
			});
		}
	}
	todos.init(
		{
			todo: DataTypes.STRING,
			completed: DataTypes.INTEGER,
			usernameId: {
				type: DataTypes.UUID,
				references: {
					model: "users",
					key: "id",
				},
			},
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "todos",
		}
	);
	return todos;
};
