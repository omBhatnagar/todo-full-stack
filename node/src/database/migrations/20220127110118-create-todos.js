"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("todos", {
			todo: {
				type: Sequelize.STRING,
			},
			completed: {
				type: Sequelize.INTEGER,
			},
			usernameId: {
				type: Sequelize.UUID,
				references: {
					model: "users",
					key: "id",
				},
			},
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("todos");
	},
};
