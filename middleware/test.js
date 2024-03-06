module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.render('g2'); // redirects to index page if user is already logged in
    }
    next()
}