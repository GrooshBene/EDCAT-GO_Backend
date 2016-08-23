# EDCAT-GO_Backend
Backend Server of EDCAT-GO

================

##Database Schema
----------------

###User Schema

> _id : 유저의 고유 번호입니다. 데이터베이스에서 인덱싱하는데 사용됩니다. String

> name : 유저의 실명 이름입니다. 페이스북에서 제공되는 디스플레이 네임을 사용합니다. String

> profile : 유저의 프로필 사진입니다. 페이스북에서 제공되는 프로필 사진경로를 사용합니다. String

> gender : 유저의 성별입니다. 페이스북에서 제공되는 성별을 사용합니다. String

> cats : 유저의 고양이 목록입니다. /catch/newcat 을 통해 받은 파라미터를 기준으로 저장됩니다. 고양이의 정보는 id만 저장하게 됩니다. Array

> exp : 유저의 점수입니다. /user/addexp를 통해 추가할 수 있습니다. Number

###Cat Schema

> _id : 고양이의 고유 id입니다. 데이터베이스 및 유저에게 귀속/인덱싱 하는데 사용됩니다. String

> name : 고양이의 이름입니다. String

> cat_type : 고양이의 종류입니다. Number

> cat_date : 고양이를 잡은 시점의 날짜입니다. Date



##API Docs
--------------

* /auth/facebook/token : facebook token auth - GET

> Requiring Params

>> access_token : fb oauth token. String

> Response

>> fb user data json



* /user/addexp : 유저의 점수를 업데이트합니다. - POST

> Requiring Params

>> exp : 추가할 경험치

> Response

>> User Schema




* /user/getrank : 전체 유저의 랭킹을 가져옵니다. - POST

> Requiring Params

>> 입력은 받지 않습니다.

> Response

>> User Schema Array Sorted by exp



* /user/catinfo : 유저의 고양이 보유 현황을 가져옵니다. - POST

> Requiring Params

>> id : 유저의 고유 번호

> Response

>> Cat Array of User



* /user/userinfo : 유저의 정보를 가져옵니다.

> Requiring Params

>> id : 유저의 고유 번호

> Response

>> User Schema



* /catch/newcat : 새로운 고양이를 db에 등록합니다.

> Requiring Params

>> id : 유저의 고유 번호

>> catname : 고양이의 이름

>> type : 고양이의 종류. 0부터 20까지 존재하고, 각 인덱스에 따른 종류는 하단 참조





==================

## Cat Type 

* 0 에드캣
* 1 길쭉캣
* 2 네모캣
* 3 샴드캣
* 4 우솝캣
* 5 귀없캣
* 6 장님캣
* 7 정장캣
* 8 솔져캣
* 9 분홍캣
* 10 초록캣
* 11 마타캣
* 12 이족캣
* 13 외팔캣
* 14 듀라캣
* 15 발화캣
* 16 호랑캣
* 17 에드랫
* 18 중2캣
* 19 종이캣
* 20 블랙캣