module.exports = (req, res) => {
    req.session.destroy(() => {
        console.log('User logged out.')
        res.redirect('/')
    })
}