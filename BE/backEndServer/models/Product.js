import sequelize from 'sequelize';
const productData = (sequelize, DataTypes) => {
	return sequelize.define('Product',{
		product_id: {
			type:DataTypes.UUID,
			defaultValue: sequelize.UUIDV4,
			unique: true,
			primaryKey: true,
		},
		product_name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		remaining: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique:true,
		},
		limit_item: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING(10),
			allowNull: false,
		},
		createdAt: {
		    type: DataTypes.DATE,
		    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
		},
		updatedAt: {
		    type: DataTypes.DATE,
		    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
		}
	});
}
export default productData;