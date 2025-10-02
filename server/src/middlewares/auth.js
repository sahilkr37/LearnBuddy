import jwt from 'jsonwebtoken'
const JWT_SECRET = 'my_secret_key'

export function verifyToken(req, res, next) {
    try {
        const token = req.cookies?.token
        if (!token) return res.status(400).json({ error: "Please log in first" })

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(403).json({ error: "Invalid or expired token" })
        }
    } catch (err) {
        res.status(403).json({ error: error.message })
    }
}
