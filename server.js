const express = require('express');
const connect_database = require('./config/database');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use(cors());
connect_database();

app.get('/', (req, res) => { 
    res.send("Test route ok");
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/problems', require('./routes/api/problems'));
app.use('/api/submissions', require('./routes/api/submissions'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

