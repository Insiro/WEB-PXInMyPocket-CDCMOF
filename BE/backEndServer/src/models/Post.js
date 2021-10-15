import Sequelize from "sequelize";
const postData = (sequelize, DataTypes) => {
  const post = sequelize.define("Post", {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "글자수는 50글자 이내이어야 합니다.",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    //announcement가 1이면 홈화면에 나오는 공지사항
    announcement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  post.associate = function (models) {
    models.User.hasMany(models.Post, {
      onDelete: "cascade",
      foreignKey: "writer",
      sourceKEy: "email",
    });
  };
  return post;
};
export default postData;
