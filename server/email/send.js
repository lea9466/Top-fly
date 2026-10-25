const nodemailer = require('nodemailer');
require('dotenv').config();
let transporter = nodemailer.createTransport({
    service: 'gmail', // או ספק אחר: Outlook, Yahoo וכו'
    auth: {
        user: process.env.EMAIL_USE,
        pass: process.env.EMAIL_PASS // עדיף להשתמש בסיסמה לאפליקציה (app password)
    }
});

// הגדרת תוכן ההודעה
async function sendContactEmail(contactData) {
    const mailOptions = {
        from: contactData.from,
        to: contactData.to,
        subject: contactData.subject,
        html: contactData.html,
        replyTo: contactData.from
    };
    if (contactData.imageBase64) {
        mailOptions.attachments = [
            {
                filename: contactData.imageName || 'image.jpg',
                content: contactData.imageBase64,
                encoding: 'base64',
                cid: 'img1' // זה צריך להתאים ל־<img src="cid:img1"> בצד הלקוח
            }
        ];
    }
    return transporter.sendMail(mailOptions);
}


module.exports = {
    sendContactEmail
};

// הגדרת תיקיית יעד לקבצים
// const storage = multer.diskStorage({
//     destination: './img',
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// טופס HTML שולח תמונה עם שם השדה "image"
// app.post('/img', upload.single('image'), (req, res) => {
//     res.send('התמונה נשמרה בהצלחה: ' + req.file.filename);
// });