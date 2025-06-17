const AuthService = require("../service/auth.service");

exports.register = async (req, res) => {
    try {
        const result = await AuthService.register(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        res.json(result);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
