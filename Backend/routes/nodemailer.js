const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Function to generate reset token and send it via email
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('User with this email does not exist');
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = Date.now() + 3600000; // Token valid for one hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetExpires;
  
  await user.save();

  // send resetToken to user's email
  const transporter = nodemailer.createTransport({ /* transport options */ });
  const mailOptions = {
    to: user.email,
    from: 'abhy.r010@gmail.com',
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
           Please click on the following link, or paste this into your browser to complete the process:
           http://orcube.xyz/reset/${resetToken}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.`,
  };

  await transporter.sendMail(mailOptions);
  res.send('Check your email for further instructions');
};

// Function to reset the password
exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).send('Password reset token is invalid or has expired.');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  user.password = hash;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  
  res.send('Your password has been successfully updated.');
};
