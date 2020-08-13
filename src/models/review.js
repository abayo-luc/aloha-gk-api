"use strict";

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      body: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Reviews",
    }
  );

  Review.afterCreate(async (review, _options) => {
    const product = await sequelize.models.Product.findByPk(review.productId);
    const avRating = parseFloat(
      (product.avRating * product.totalReviews + review.rating) /
        (product.totalReviews + 1)
    );
    await product.update({ avRating, totalReviews: product.totalReviews + 1 });
  });
  Review.afterUpdate(async (review, _options) => {
    const currentRating = review.rating;
    const previousRating = review["_previousDataValues"]?.rating || 0;
    const product = await sequelize.models.Product.findByPk(review.productId);

    const avRating = parseFloat(
      (product.avRating * product.totalReviews +
        currentRating -
        previousRating) /
        product.totalReviews
    );
    await product.update({ avRating });
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Product, {
      foreignKey: "productId",
    });
    Review.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return Review;
};
