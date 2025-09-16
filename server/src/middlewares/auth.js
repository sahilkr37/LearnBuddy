export function adminAuth(req, res, next) {
    try {
        if (req.params.id === 'admin') {
            console.log("Admin authenticated")
            next()
        } else {
            res.status(403).send("Not authorized")
        }
    } catch (error) {
        console.log("Something happened in auth")
        res.status(500).send("Internal server error");
    }
}
