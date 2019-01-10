const bcrypt = require('bcryptjs');
const User = require('mongoose').model('User');

const login = {
    form: function (req, res) {
        if (req.session.user) {
            res.redirect('/dashboard/category');
            return;
        }
        res.render('dashboard/login')
    },
    signin: function (req, res) {
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user;
                res.redirect('/dashboard/category');
            } else {
                res.redirect('/dashboard/signin')
            }
        });
    }
};

module.exports = login;


