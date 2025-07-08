export const authMiddleware = (req, res, next) => {
const role = req.headers["x-user-role"];

if (role === "admin") {
    return next();
}

return res.status(403).json({ status: "error", message: "Unauthorized" });
};