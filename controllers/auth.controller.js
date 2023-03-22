const User = require('../models/User.model')
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {

    const { login, password, phone, avatar } = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res.status(409).send({ message: 'User with this login already exists' });
      }

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), phone, avatar });
      res.status(201).send({ message: 'User created' + user.login })
    } else {
      res.status(400).send({ message: 'Bad request' });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.login = async (req, res) => {

}