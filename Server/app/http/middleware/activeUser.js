const User = require('app/models/user');
const middleware = require('./middleware');

class activeUser extends middleware {
  handle(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.active) return next();

      this.alert(req, {
        title: 'توجه کنید',
        message: 'دقت کنید اکانت شما فعال نیست برای فعال کردن اکانت خود لطفا از طریق فرم ورود اقدام به ورود کنید',
        type: 'error',
        button: 'بسیار خوب'
      });

      req.logout();
      // Custom Code - Arya
      res.clearCookie('remember_token');
      req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
      });
      // Custom Code End

      // res.redirect('/');
    } else next();
  }
}

module.exports = new activeUser();