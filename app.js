const express = require('express');
const cors = require('cors');
const path = require('path');  // إضافة هذا للاستفادة من مسارات الملفات
const resultsRouter = require('./routes/results');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// تقديم صفحة HTML عندما يصل المستخدم إلى المسار الرئيسي "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // تأكد من وجود index.html في مجلد public
});

app.use('/api/results', resultsRouter);  // هذا هو المسار الحالي لAPI

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
