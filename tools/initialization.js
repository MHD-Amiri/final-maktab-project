const User = require("../models/user");

const initialization = async function () {
    try {
        const EXIST_ADMIN = await User.findOne({
            role: 'admin'
        });
        if (EXIST_ADMIN) {
            return console.log('Admin Done!');
        };

        const ADMIN = new User({
            firstName: 'ali',
            lastName: 'kuchulu',
            userName: 'ali',
            email: "alikuchulu@gmail.com",
            password: "123456789",
            gender: 'Male',
            phoneNumber: '09125544712',
            role: 'admin',
            password: '12345678'
        });

        await ADMIN.save();

        console.log('Admin created');
    } catch (err) {
        console.log('Error in intialization function', err);
    };
};

module.exports = initialization;