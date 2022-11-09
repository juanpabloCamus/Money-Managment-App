const { user, operation } = require('../database');

const postOperation = async (req, res, next) => {
  const { type, amount, concept } = req.body;
  const { userId } = req.params;

  const findUser = await user.findByPk(userId);

  if (findUser === null) {
    return res.status(400).send({ error: 'User not found' });
  }

  if (!(type === 'Entry' || type === 'Withdraw')) {
    return res
      .status(400)
      .send({ error: 'Type must be an Entry or a Withdraw' });
  }

  let { money } = findUser.dataValues;

  try {
    const newOperation = await operation.create({
      type,
      amount,
      concept,
      userId,
    });

    type === 'Entry'
      ? (money = parseInt(money, 10) + parseInt(amount, 10))
      : (money = parseInt(money, 10) - parseInt(amount, 10));

    user.update({ money }, { where: { id: userId } });

    res.status(201).send(newOperation);
  } catch (error) {
    next(error);
  }
};

const putOperation = async (req, res, next) => {
  const { opId } = req.params;
  const { amount } = req.body;

  try {
    const {
      dataValues: { amount: previousAmount },
    } = await operation.findByPk(opId);

    const updateOperation = await operation.update(
      { amount },
      { where: { id: opId } },
    );

    const findOpereation = await operation.findByPk(opId);
    const { type } = findOpereation.dataValues;

    const {
      dataValues: { userId },
    } = findOpereation;

    const {
      dataValues: { money: previousMoney },
    } = await user.findByPk(userId);

    const updateMoney =
      type === 'Entry'
        ? parseInt(previousMoney, 10) -
          parseInt(previousAmount, 10) +
          parseInt(amount, 10)
        : parseInt(previousMoney, 10) +
          parseInt(previousAmount, 10) -
          parseInt(amount, 10);

    user.update({ money: updateMoney }, { where: { id: userId } });

    res.send(findOpereation);
  } catch (error) {
    next(error);
  }
};

const getUserOperations = async (req, res, next) => {
  const { userId, offset } = req.params;
  const findUser = await user.findByPk(userId);

  if (findUser === null) {
    return res.status(404).send({ error: 'User not found' });
  }

  try {
    const operations = await operation.findAndCountAll({
      where: { userId },
      limit: 10,
      offset,
    });

    return res.status(200).send(operations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postOperation,
  getUserOperations,
  putOperation,
};
