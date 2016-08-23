/**
 * Created by bene on 2016. 8. 20..
 */

module.exports = init;

function init(app, User, Cat) {
    var randomString = require('randomstring');

    app.post('/catch/newcat', function (req, res) {

        var temp_catArr = [];
        User.findOne({_id : id}, function (err, result) {
            if(err){
                console.log('/catch/newcat db error!');
                throw err;
            }

            console.log('User '+ result.name + "Caught a new Cat!");
            temp_catArr = result.cats;
            temp_catArr.push(req.param('id'));
            User.update({_id : id}, {cats : temp_catArr}, function (err, result_update) {
                if(err){
                    console.log('/catch/newcat Update Error');
                    throw err;
                }
                console.log('Cat '+ req.param('name') + 'added to User '+ result.name);
            });
        });

        var cat = new Cat();
        cat._id = req.param('id');
        cat.name = req.param('catname');
        cat.type = req.param('type');
        cat.date = new Date();

        cat.save(function (err, silence) {
            if(err){
                console.log('/catch/newcat cat db add error');
                throw err;
            }
            console.log(cat + ' Was successfully added');
            res.send(200, cat);
        })
    });



    //function end
}