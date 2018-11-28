const router = require('express').Router();
const passport = require('passport');
// auth login
router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});



// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

//callback route for goole to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {

    console.log("user model google  " + req.user.email);

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
     
       
      localStorage.setItem('user', JSON.stringify(req.user));
    //   console.log(localStorage.getItem('user'), "this is local storage!!!!!!!");

   
    //res.send(req.user);
    res.redirect('http://localhost:3000/dashboard');

});

module.exports = router;