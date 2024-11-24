// const bcrypt = require('bcrypt');
// const User = require("../../models/User");
// const generateToken = require('../utils/token');
// const jwt = require('jsonwebtoken');

// const saltRounds = 10; 




// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(saltRounds);
//   const hash = await bcrypt.hash(password, salt);
//   return hash;
// };

// const generateToken = (user) => {
//   return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });
// };

// exports.signup = async (req, res, next ) => {
//   try {
//     if (req.body.password) {
//       req.body.password = await hashPassword(req.body.password);
//     }
//     const newUser = await User.create(req.body);
//     // res.status(201).json(newUser);
//     res.status(201).json({ message: 'Registration successful', user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//     next(err);
//   }
// };

// exports.signin = async (req, res, next ) => {
//   try {
//     const { username, password } = req.body; 
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//   //   res.status(200).json({ message: 'Signin successful', user });
//   // } catch (err) {
//   //   res.status(500).json("Server Error");
//   //   next(err);
//   // }
//   const token = generateToken(user); 
//    res.status(200).json({ message: 'Signin successful', token }); 
 
//    } catch (err) { 
//     res.status(500).json({ message: 'Server error', error: err.message });
//      next(err);
//      } 
// };
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().populate("urls");
//     res.status(201).json(users);
//   } catch (err) {
//     next(err);
//   }
// };



// module.exports = generateToken;

// // module.exports = { hashPassword };
// // module.exports = {  signup, signin, getUsers };

// module.exports = { signup, signin, getUsers };


const bcrypt = require('bcrypt');
const User = require("../../models/User");
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const signup = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    const newUser = await User.create(req.body);
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Signin successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin, getUsers };
