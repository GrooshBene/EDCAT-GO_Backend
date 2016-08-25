/**
 * Created by bene on 2016. 8. 20..
 */

module.exports = init;

function init(app, User, Cat) {
    var randomString = require('randomstring');

    app.post('/catch/newcat', function (req, res) {

        var temp_catArr = [];
        var cat_id = randomString.generate(15);
        User.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log('/catch/newcat db error!');
                throw err;
            }

            console.log('User '+ result.name + "Caught a new Cat!");
            temp_catArr = result.cats;
            temp_catArr.push(cat_id);
            User.update({_id : req.param('id')}, {cats : temp_catArr}, function (err, result_update) {
                if(err){
                    console.log('/catch/newcat Update Error');
                    throw err;
                }
                console.log('Cat '+ req.param('name') + 'added to User '+ result.name);
            });
        });

        var cat = new Cat({
            _id : cat_id,
            name : req.param('catname'),
            cat_type : req.param('type'),
            cat_date : new Date()
        });

        Cat.findOne({_id : cat._id}, function (err, result) {
            if(err){
                console.log('/catch/newcat duplicate check error');
                throw err;
            }
            console.log("Cat Founded : " + result);
            if(!result){
                cat.save(function (err, silence) {
                    if(err){
                        console.log('/catch/newcat cat db add error');
                        throw err;
                    }
                    console.log(cat + ' Was successfully added');
                    res.send(200, cat);
                })
            }
            else if(result){
                console.log(cat + 'is already caught! Report Bug!');
                res.send(401, "Cat has Duplicated! Report Bug!");
            }
        });
    });

    app.post('/catch/free', function (req, res) {
        Cat.findOneAndRemove({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log('/catch/free db error');
                throw err;
            }
            console.log("Cat Id "+ req.param('id')+ "'s info : " + result);
            res.send(200, result);
        });
    });

    app.post('/catch/catinfo', function (req, res) {
        Cat.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log('/catch/catinfo db error');
                throw err;
            }
            console.log("Cat Id "+ req.param('id') + "'s info : "+ result);
            res.send(200, result);
        });
    });




    //function end
}