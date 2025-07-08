export const validateBody = (requiredFields = []) => {
return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !(field in req.body));
    if (missingFields.length > 0) {
    return res.status(400).json({
        status: "error",
        message: `Missing required fields: ${missingFields.join(", ")}`
    });
    }
    next();
};
};

export const validateEmailBody = (req, res, next) => {
const { email } = req.body;
if (!email) {
    return res.status(400).json({ status: "error", message: "Email is required" });
}
next();
};