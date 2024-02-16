export const imageMiddleware = (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};