const jwt = require("jsonwebtoken");

module.exports = {
    authenticate(req, res, next) {
        console.log(req);
        console.log(req.cookies);

        jwt.verify(
            req.cookies.usertoken,

            "secret",
            (err, payload) => {
                if(err) {
                    res.status(401).json({ verified: false });
                } else {

                    next();
                }
            }
        )
    }
}