const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static(path.join(__dirname, 'public')));
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../public/journals'), (err) => {
            if (err) {
                console.log(err);
            }
        });
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});

const upload = multer({ storage: storage });

router.post('/add-journal', upload.single('file'), postController.addJournal);
router.get('/get-journal', postController.getJournal);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

module.exports = router;