const { object, string, ref } = require('yup');

const registerValidation = async (req, res, next) => {
  const schema = object().shape({
    email: string().required(),
    password: string().min(8).required(),
    confirmPassword: string()
      .oneOf([ref('password'), null], 'Passwords must match')
      .required(),
    firstName: string().required(),
    lastName: string().required(),
    role: string().required(),
  });
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ statusCode: 400, message: error.errors[0] });
    } else {
      next(error);
    }
  }
};

module.exports = { registerValidation };
