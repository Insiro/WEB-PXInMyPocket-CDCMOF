import Sequelize from "sequelize";

const orderData = (sequelize, DataTypes) => {
  const order = sequelize.define("Order", {
    //주문번호
    order_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    product_name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  order.associate = function (models) {
    models.User.hasMany(order, {
      onDelete: "cascade",
      foreignKey: {
        name: "orderer_id",
        allowNull: false,
      },
      sourceKEy: "id",
    });
  };
  return order;
};
export default orderData;
