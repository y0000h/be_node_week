var express = require('express');
var router = express.Router();
let datas = require('../model/db.json');
// datas 자동으로 배열로 변환해서 사용함 
const { format } = require('date-fns');

/* GET home page. */
// node  => localhost:4000/board => method get, post, put, delete 
// react => localhost:3000/board
router.get('/', function(req, res, next) {
     res.send( datas );
    // res.json( JSON.stringify( datas, null, "   "))
});

// react 글쓰기 
router.post('/', function(req, res, next) {
     const { title, body } = req.body;

     const newPost = {
          id : datas[datas.length-1].id + 1,
          title ,
          body ,
          datetime : format(new Date(), 'yyyy-MM-dd')
     }

     datas.push( newPost );
     res.send( {method :"post", datas : JSON.stringify(datas)} ); 
});

router.delete('/', function(req, res, next) {
     const { id } = req.body;
     const deleteDatas = datas.filter(data=>data.id !==  +id);
     datas = [...deleteDatas ];

     res.send( {method :"delete", datas : JSON.stringify(datas)}); 
});

router.put('/', function(req, res, next) {
     const { id, title, body } = req.body; 

     const findData = datas.find( data=> data.id === +id );
     findData.title = title; 
     findData.body = body; 

     const updateDatas = datas.filter(data=>data.id !==  +id);
     updateDatas.push(findData);

     datas = [...updateDatas ];
     res.send( {method :"update", datas : JSON.stringify(datas)}); 
});

module.exports = router;


