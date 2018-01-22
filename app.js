const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({
    dest: __dirname + '/uploads'        // __dirname - > pour recuperer le repertoir en cour 
});

mongoose.connect('mongodb://localhost/TEST');

require('./models/Pokemon');
require('./models/Type');

const app = express();

app.use(bodyParser.urlencoded());
app.use(upload.single('file'));  // il va sauvgarder le resultat donc notre file dans le repertoir *Uploads

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

app.use('/uploads', express.static(__dirname + '/uploads'))

nunjucks.configure('views',{
    autoescape:true,
    express: app
});

/*app.get('/', (req, res) => {
    res.send('salut');
});*/

app.listen(3000, ()=>console.log('Pokedex lance sur le port 3000!'));