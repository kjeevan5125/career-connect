const authorizeEmployer = (req, res, next) => {
    if(req.user.role!=="employer"){
        return res.status(403).json({
            message: "Access denied. Only employers are allowed to perform this action."
        });
    }
    next();
};

export { authorizeEmployer };