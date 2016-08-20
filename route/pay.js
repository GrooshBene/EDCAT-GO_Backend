/**
 * Created by bene on 2016. 8. 20..
 */

module.exports = init;

function init(app, User) {
    var Iamport = require('iamport');

    var iamport = new Iamport({
        impKey : '2907976359420871',
        impSecret : '33iOvoZLm0vhJaCha6zeXilxhFuyheHkiZ9Nn8yK842SeF9pLJDJ1ZgjFKRWZyhhxq5VyEGHIIzXnJm9'
    });

    app.get('/pay', function (req, res) {
        res.send(__dirname + '/pay.html');
    })
    iamport.payment.getByImpUid({
        imp_uid : 'imp59392671'
    }).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
    });

    //function end
}
