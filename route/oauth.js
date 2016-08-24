/**
 * Created by bene on 2016. 8. 20..
 */

module.exports = init;

function init(app, User){

    var passport = require('passport');

    app.use(passport.initialize());

    app.use(passport.session());

    var FacebookTokenStrategy = require('passport-facebook-token');

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookTokenStrategy({
        clientID : "671688369646929",
        clientSecret : "f634fd2532169967f4f58e157b16b47e",
        profileFields : ['id', 'displayName', 'photos', 'permissions', 'gender']
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile + " 이 로그인 요청을 보냈습니다 (페이스북).");
        User.findOne({
            '_id' : profile.id
        }, function (err, user) {
            if(err){
                return done(err);
            }

            if(!user){
                user = new User({
                    _id : profile.id,
                    name : profile.displayName,
                    profile : profile.photos,
                    cats : [],
                    gender : profile.gender,
                    exp : 0
                });
                user.save(function (err) {
                    if(err){
                        console.log("신규 유저 db저장 에러 : " + err);
                    }
                    else{
                        done(null, profile);
                    }
                });
            }

            else if(user){
                console.log(profile.displayName + "유저가 접속하였습니다.");
                done(null, profile);
            }
        })
    }));

    app.get('/auth/facebook/token', passport.authenticate('facebook-token'), function (req, res) {
        console.log("유저가 "+ req.param('access_token')+ "토큰을 이용해 로그인 요청을 하였습니다.");
        if(req.user){
            console.log(req.user + "가 로그인에 성공하였습니다.")
            res.send(200, req.user);
        }
        else if(!req.user){
            console.log("잘못된 토큰이 감지되었습니다.");
            res.send(401, req.user);
        }
    });

    app.get('/auth/facebook/callback', passport.authenticate('facebook-token', {
        successRedirect : "/",
        failureRedirect : "/"
    }));

    app.post('/user/addexp', function (req, res) {
        var temp_exp = 0;
        User.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log("/user/addexp Error");
                throw err;
            }

            temp_exp = result.exp;
            console.log('user'+ result.name + "'s exp : " + temp_exp);
            temp_exp = temp_exp + req.param('exp');

            console.log('user'+ result.name + "'s exp added : " + temp_exp);
            User.update({_id : req.param('id')}, {exp : temp_exp}, function (err, result) {
                if(err){
                    console.log("/user/addexp Update Error");
                    throw err;
                }
                res.send(200, result);
                console.log("User Updated : " + result);
            });
        })
    });

    app.post('/user/getrank', function (req, res) {
        User.find({$query : {}, $orderby : {exp : -1}}, function(err, result) {
            if(err){
                console.log('/user/getrank db error');
                throw err;
            }

            console.log("Current Ranking : "+ result);
            res.send(200, result);
        });
    });

    app.post('/user/catinfo', function (req, res) {
        User.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log('/user/catinfo db error');
                throw err;
            }

            console.log('User '+ result.name + "'s cat : "+ result.cats);
            res.send(200, result.cats);
        });
    });

    app.post('/user/userinfo', function (req, res) {
        User.findOne({_id : req.param('id')}, function (err, result) {
            if(err){
                console.log('/user/userinfo db error');
                throw err;
            }

            console.log('User '+ result+ ' founded');
            res.send(200, result);
        });
    });



    //function end
}