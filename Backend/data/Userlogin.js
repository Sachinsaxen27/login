const express = require('express')
const User = require('../Schema/UserSchema')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')

// ROUTE 1 FOR USER CREATION
router.post('/usersignup', [
    body('name').isLength({ min: 3, max: 15 }),
    body("email").isEmail(),
    body('password').isLength({ min: 6 }),
    body('mobile').isLength({ min: 10, max: 12 })], async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, errors: errors.array() });
            }
    
            const salt = await bcrypt.genSalt(10)
            const secpass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email,
                code: req.body.code,
                password: secpass,
                // address: req.body.address
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const jwt_Sign = "SachinSAXENA"
            const jwttoken = jwt.sign(data, jwt_Sign)
            success = true
            res.json({ success, jwttoken })
        } catch (error) {
            console.log(error)
            res.status(500).json(error, "Some Error Occurred")
        }
    })
// ROUTER 2 FOR USER LOGIN
router.post("/ulogin", [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    // For Checking the error or not in your send data
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
    // Defactoring the password or email from the database as password or email
    const { password, email } = req.body
    let success = false
    console.log(password, email)
    try {
        // finding the email
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({ success, error: "Incorrect information" })
        }
        // Comparing the given password and database password
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(500).json({ error: "Incorrect information" })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const jwt_Sign = "SachinSAXENA"
        const authtoken = jwt.sign(payload, jwt_Sign)

        res.json({ success: true, authtoken })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
// ROUTER 2 FOR USER DATA
router.get('/getuserdata',fetchuser, async (req, res) => {
    try {
        const userId = req.user;
        console.log(userId)
        const user = await User.findById(userId).select('-password -_id -__v')
        res.json(user)
    } catch (error) {
        res.status(500).send("Some Error Occurred")
    }
})
module.exports = router
