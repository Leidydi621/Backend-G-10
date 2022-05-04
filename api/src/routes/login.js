const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { User } = require('../db'); // traer mi modelo
const router = Router();
const loginVerification = require('../middlewares/loginVerification');
//Validators
const loginValidator = [
  body('userOrEmail').not().isEmpty().withMessage('Este campo es obligatorio.'),
  body('password').not().isEmpty().withMessage('Este campo es obligatorio.'),
];

const successLogin = user => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  return {
    msg: 'Login Completo.',
    userName: user.userName,
    token,
  };
};

router.post('/', loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ type: 'validators', errors: errors.array() });
  }

  const { userOrEmail, password } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: userOrEmail }, { userName: userOrEmail }],
    },
  });

  if (!user)
    return res
      .status(401)
      .send({
        type: 'noLogin',
        msg: 'No se pudieron comprobar sus credenciales.',
      });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res
      .status(401)
      .json({
        type: 'noLogin',
        msg: 'No se pudieron comprobar sus credenciales.',
      });

  res.send(successLogin(user));
});

router.post('/google', async (req, res, next) => {
  try {
    const userData = req.body;

    const user = await User.findOne({ where: { email: userData.email } });

    if (user) return res.send(successLogin(user));

    const newUser = await User.create({
      userName: userData.name,
      firstName: userData.givenName,
      lastName: userData.familyName,
      email: userData.email,
      password: '',
      address: '',
      idPersonal: '',
      roleId: 2,
    });

    res.send(successLogin(newUser));
  } catch (error) {
    next(error);
  }
});


module.exports = router;