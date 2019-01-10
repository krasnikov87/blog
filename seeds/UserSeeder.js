const User = require('../models/User');
module.exports = async () => {
    if (await User.countDocuments() == 0) {
        User.create([
            {
                name: 'akrasnikov',
                email: 'krasnikovrs@gmail.com',
                password: process.env.PASSWORD
            }
        ]).then(user => {
            console.log(`${user.length} users created`);
        })
        .catch((err) => {
            console.log(err);
        });
    }
};

