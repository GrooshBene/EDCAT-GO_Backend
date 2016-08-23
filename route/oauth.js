/**
 * Created by bene on 2016. 8. 20..
 */

module.exports = init;

function init(app, User){

    var passport = require('passport');

    var randomString = require('randomstring');

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
        clientID : "",
        clientSecret : "",
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
                    gender : profile.gender
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

    app.get('/auth/facebook/token', passport.authenticate('facebook-token', function (req, res) {
        console.log("유저가 "+ req.param('access_token')+ "토큰을 이용해 로그인 요청을 하였습니다.");
        if(req.user){
            console.log(req.user + "가 로그인에 성공하였습니다.")
            res.send(200, req.user);
        }
        else if(!req.user){
            console.log("잘못된 토큰이 감지되었습니다.");
            res.send(401, req.user);
        }
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook-token', {
        successRedirect : "/",
        failureRedirect : "/"
    }));

    app.post('/user/addexp', function (req, res) {

    })



    //function end
}