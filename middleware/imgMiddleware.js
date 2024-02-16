export const imageMiddleware = (req, res, next) => {
    try {
        if (!req.files) {
            return res.status(400).send('No files were chosen.');
        }
        let files = Object.values(req.files).flat();
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};