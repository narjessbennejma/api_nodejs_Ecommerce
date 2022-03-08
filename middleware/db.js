// connection avec base de donnee
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://narjessbennejma:mongo2022@cluster0.irj4y.mongodb.net/eCommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));