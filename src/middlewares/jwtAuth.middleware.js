import passport from "passport";

export const jwtAuthMiddleware = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Token inválido o no provisto"
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};
