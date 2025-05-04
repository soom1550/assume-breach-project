const express = require('express');
const multer = require('multer');
const clamav = require('clamav.js');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// إعداد multer لتحميل الملفات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // مجلد رفع الملفات
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // اسم الملف
  }
});

const upload = multer({ storage: storage });

// نقطة API لفحص الملف
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('لم يتم رفع أي ملف');
  }

  const filePath = req.file.path;

  // فحص الملف باستخدام ClamAV
  clamav.ping(3310, 'localhost', (err) => {
    if (err) {
      return res.status(500).send('خطأ في الاتصال بـ ClamAV');
    }

    clamav.scan(filePath, 3310, 'localhost', (err, result) => {

        return res.status(500).send('خطأ في فحص الملف');
      }

      if (result === 'OK') {
        res.send('الملف آمن');
      } else {
        res.status(400).send('الملف يحتوي على فيروس');
      }
    });
  });
});

// بدء السيرفر
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
