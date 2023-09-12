import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user.js';

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes( 32 ).toString( 'hex' );
  return secretKey;
}

const sendVerificationEmail = async ( email, verificationToken ) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'guangxinyu1998@gmail.com',
      pass: 'ygesuqmkrdoxgfqw'
    }
  });

  // Compose the email message
  const mailOptions = {
    from: 'guangxinyu1998@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify you email: http://localhost:5000/api/v1/user/verify/${ verificationToken }`
  };

  // Send the email
  try {
    await transporter.sendMail( mailOptions );
    console.log( 'Verification email sent successfully' );
  } catch (error) {
    console.error( 'Error sending verification email:', error );
  }
}

const registerNewUser = async ( req, res ) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if ( existingUser ) {
      console.log( 'Email already registered: ', email );
      return res.status( 400 ).json( { message: 'Email already registered' } );
    }

    // Create a new user
    const newUser = await User.create({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes( 20 ).toString( 'hex' );

    // Save the user to the database
    await newUser.save();

    // Send verification email to usr
    sendVerificationEmail( newUser.email, newUser.verificationToken );

    res.status( 201 ).json({ message: 'Registration successful. Please check your email for verification.' });
  } catch (error) {
    console.log( 'Register error', error );
    res.status( 500 ).json( { message: 'Registration failed' } );
  }
}

const verifyEmail = async ( req, res ) => {
  try {
    const { token } = req.params;

    // Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if ( !user ) {
      return res.status( 404 ).json({ message: 'Invalid verification token' });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status( 200 ).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.log( 'Email verification error', error );
    res.status( 500 ).json( { message: 'Email verification failed' } );
  }
}

const login = async ( req, res ) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if ( !user ) {
      return res.status( 401 ).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    if ( user.password !== password ) {
      return res.status( 401 ).json({ message: 'Wrong password' });
    }

    // Generate a token
    const secretKey = generateSecretKey();
    const token = jwt.sign( { userId: user._id }, secretKey );

    res.status( 200 ).json({ token });
  } catch (error) {
    console.log( 'Login error', error );
    res.status( 500 ).json({ message: 'Lofin failed' });
  }
}

const fetchAddresses = async ( req, res ) => {
  try {
    const { userId } = req.params;
    const user = await User.findById( userId );
    if ( !user ) return res.status( 404 ).json({ message: 'User not fount' });

    const { addresses } = user;
    res.status( 200 ).json({ addresses });
  } catch (error) {
    console.log( 'Error retrieveing the addresses', error );
    res.status( 500 ).json({ message: 'Error retrieveing the addresses' });
  }
}

const addAddress = async ( req, res ) => {
  try {
    const { userId, address } = req.body;
    const user = await User.findById( userId );
    if ( !user ) return res.status( 404 ).json({ message: 'User not found' });

    user.addresses.push( address );
    await user.save();
    res.status( 200 ).json({ message: 'Address created successsfully' });
  } catch (error) {
    console.log( 'Error adding address', error );
    res.status( 500 ).json({ message: 'Error adding address' });
  }
}

const fetchUserProfile = async ( req, res ) => {
  try {
    const { userId } = req.params;
    const user = await User.findById( userId );
    if ( !user ) return res.status( 404 ).json({ message: 'User not found' });
    res.status( 200 ).json({ user });
  } catch (error) {
    console.log( 'Error retrieving user profile', error );
    res.status( 500 ).json({ message: 'Error retrieving user profile' });
  }
}

export {
  registerNewUser,
  verifyEmail,
  login,
  fetchAddresses,
  addAddress,
  fetchUserProfile,
}
