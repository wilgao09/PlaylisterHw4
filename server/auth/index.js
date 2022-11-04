const jwt = require("jsonwebtoken");

function authManager() {
    verify = (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized",
                });
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET);
            console.log("verified.userId: " + verified.userId);
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized",
            });
        }
    };

    verifyUser = (req) => {
        try {
            const token = req.cookies.token;
            console.log("got token " + token);
            if (!token) {
                return null;
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            return decodedToken.userId;
        } catch (err) {
            return null;
        }
    };

    /**
     *
     * JWT token is userid only (no ttl)
     */
    signToken = (userId) => {
        return jwt.sign(
            {
                userId: userId,
            },
            process.env.JWT_SECRET
        );
    };

    return this;
}

const auth = authManager();
module.exports = auth;
