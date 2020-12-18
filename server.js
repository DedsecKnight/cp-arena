const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));

app.get('/', (req, res) => { 
    res.send("Test route ok");
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/problems', require('./routes/api/problems'));
app.use('/api/submissions', require('./routes/api/submissions'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

