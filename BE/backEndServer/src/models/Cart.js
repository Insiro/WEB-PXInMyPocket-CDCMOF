import Sequelize from "sequelize";

const cartData = (sequelize, DataTypes) => {
  const cart = sequelize.define("Cart", {
    cart_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  cart.associate = function (models) {
    models.User.hasMany(models.Cart, {
      onDelete: "cascade",
      foreignKey: {
        name: "owner_email",
        allowNull: false,
      },
      sourceKey: "email",
    });

    models.Cart.belongsTo(models.Product, {
      foreignKey: {
        name: "added_product_id",
        allowNull: false,
      },
      targetKey: "product_id",
    });
  };
  return cart;
};
export default cartData;
