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

    if (type === 'Entry') money = parseInt(money, 10) + parseInt(amount, 10);
    else money = parseInt(money, 10) - parseInt(amount, 10);

    user.update({ money }, { where: { id: userId } });

    res.status(201).send(newOperation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postOperation,
};
