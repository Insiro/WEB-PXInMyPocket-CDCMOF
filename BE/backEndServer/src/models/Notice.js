import Sequelize from "sequelize";

const noticeData = (sequelize, DataTypes) => {
  const notice = sequelize.define("Notice", {
    //notice 번호
    notice_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    readed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  //주문 번호, 주문자 아이디
  notice.associate = function (models) {
    models.User.hasMany(models.Notice, {
      onDelete: "cascade",
      foreignKey: {
        name: "owner_id",
        allowNull: false,
      },
      sourceKey: "email",
    });
    models.Notice.belongsTo(models.Order, {
      onDelete: "cascade",
      foreignKey: {
        name: "order_id",
        allowNull: false,
        type: DataTypes.UUID,
      },
      targetKey: "order_id",
    });
  };
  return notice;
};
export default noticeData;
