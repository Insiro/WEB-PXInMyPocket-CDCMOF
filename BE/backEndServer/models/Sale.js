import sequelize from 'sequelize';
const saleData = (sequelize, DataTypes) => {
	const sale = sequelize.define('Sale',{
		monthly_sale: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		weekly_sale: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	});

	sale.associate = function (models) {
		sale.belongsTo(models.Product, {
			onDelete: 'cascade',
			foreignKey: 'product_id',
			sourceKEy: 'product_id'
		})
	}
	return sale;
}

export default saleData;
