const router = require('express').Router();
const Pokemon = require('./../models/Pokemon');
const Type = require('./../models/Type');


router.get('/', (req,res)=>{
    Pokemon.find({}).populate('types').then(pokemons =>{
        res.render('pokemons/index.html', {pokemons: pokemons });

    });
});

router.get('/new', (req, res)=>{
    Type.find({}).then(types =>{    //Il n'y a rien entre acolade car on dit a mongoDB de recuperer tout
        let pokemon = new Pokemon();
        res.render('pokemons/edit.html',{pokemon: pokemon, types: types, endpoint: '/'  }); 
    });
});

router.get('/edit/:id', (req, res)=>{
    Type.find({}).then(types =>{
        Pokemon.findById(req.params.id).then(pokemon =>{
            res.render('pokemons/edit.html', {pokemon: pokemon, types: types, endpoint : '/'+ pokemon._id.toString() });
      });
    });

});

router.get('/:id', (req, res)=>{
    Pokemon.findById(req.params.id).populate('types').then(pokemon =>{
        res.render('pokemons/show.html', {pokemon: pokemon });
    },
    err => res.status(500).send(err));

});
/* 
    Promise - > est un objet qui va representer une operation qui est  asencronne, 
    un resultat qui peut venir na porte quel moment 
    Dans le parametre de Promise on passe une fonction 
*/
router.post('/:id?', (req, res)=>{ // si il ya ce id il va recuperer le pokemon et on va le modifier 
    new Promise((resolve, reject)=>{
        if(req.params.id){
            Pokemon.findById(req.params.id).then(resolve, reject); // si il ya une erreur on renvoit *reject
        }
        else{
            resolve( new Pokemon() )
        }
    }).then(pokemon =>{
        pokemon.name = req.body.name;
        pokemon.description = req.body.description;
        pokemon.number = req.body.number;
        pokemon.types = req.body.types;

        if(req.file) pokemon.picture = req.file.filename;

        return pokemon.save();
    }).then(()=>{
         res.redirect('/');
    }, err =>console.log(err));
});



module.exports = router;