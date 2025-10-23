exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role.name)) {
      return res.status(403).json({
        status_code: 403,
        message: `Access denied`
      });
    }
    next(); // If the role is authorized, continue to the next middleware or route handler
  };
};
