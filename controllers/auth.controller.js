const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    console.log(req.body, req.file)

    if (!login || typeof login !== 'string' || !password || typeof password !== 'string' || !req.file) {
      return res.status(400).send({ message: 'Bad request' });
    }

    const userWithLogin = await User.findOne({ login });

    if (userWithLogin) {
      return res.status(409).send({ message: 'User with this login already exists' });
    }

    const avatarFileType = await getImageFileType(req.file);

    if (avatarFileType !== 'image/png' && avatarFileType !== 'image/jpeg' && avatarFileType !== 'image/gif') {
      return res.status(400).send({ message: 'Invalid image file type' });
    }

    const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename });
    res.status(201).send({ message: 'User created' + user.login });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || typeof login !== 'string' || !password || typeof password !== 'string') {
      return res.status(400).send({ message: 'Bad request' });
    }

    const user = await User.findOne({ login });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({ message: 'Login or password are incorrect' });
    }

    req.session.user = { login: user.login, id: user._id };
    res.status(200).send({ message: 'Login successful' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  if (!req.session.user || !req.session.user.login) {
    return res.status(401).send({ message: 'You are not authorized!' });
  }

  res.send({ login: req.session.user.login });
};


exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};