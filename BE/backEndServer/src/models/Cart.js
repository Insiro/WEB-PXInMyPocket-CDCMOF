import Sequelize from "sequelize";

const cartData = (sequelize, DataTypes) => {
  const cart = sequelize.define("Cart", {
    //주문번호
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  cart.associate = function (models) {
    models.User.hasMany(cart, {
      onDelete: "cascade",
      foreignKey: {
        name: "owner_email",
        allowNull: false,
      },
      sourceKEy: "email",
    });

    models.Product.belongsTo(cart, {
      foreignKey: {
        name: "added_product_id",
        allowNull: false,
      },
      sourceKEy: "product_id",
    });
  };
  return cart;
};
export default cartData;
