const Role = require('./models/Role');
const User = require('./models/User');
const Note = require('./models/Note')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
  async registration(req, res) {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({message: "Registration error", errors})
        }
        const {username, password} = req.body
        const candidate = await User.findOne({username})
        if(candidate) {
            return res.status(400).json({message: "Such user exists"})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: 'USER'})
        const user = new User({username, password: hashPassword, roles: [userRole.value]})
        await user.save()
        return res.json({message: 'User created'})
    } catch (e) {
        res.status(400).json({message: "Registration error"})
    }
  }

  async login(req, res) {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user) {
            return res.status(400).json({ message: "Such user does not exist"})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({message: "Input wront password"})
        }
        const token = generateAccessToken((await user)._id, user.roles);
        return res.json({token})
    } catch (e) {
        res.status(400).json({message: "Login error"})
    }
  }
}

module.exports = new authController();
