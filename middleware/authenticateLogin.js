module.exports = async (req, res, next) => {
    if (loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}