const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.INTEGER, allowNull: false },
        from: { type: DataTypes.STRING, allowNull: false },
        to: { type: DataTypes.STRING, allowNull: false },
        sendAmount: { type: DataTypes.DECIMAL(10, 4), allowNull: false },
        pricePerUnit: { type: DataTypes.DECIMAL(10, 4), allowNull: false },
        conversionBetweenUSDPHP: { type: DataTypes.DECIMAL(10, 4), allowNull: false },
        amount: { type: DataTypes.DECIMAL(10, 4), allowNull: false },
        status: { type: DataTypes.ENUM('Completed', 'Canceled', 'Refunded', 'Processing') },
        image: { type: DataTypes.STRING }
    };

    const options = {};

    return sequelize.define('Transaction', attributes, options);
}