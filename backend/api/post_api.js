var express = require('express');
var postRouter = express();
var multer = require('multer');

var postSQL = require('../models/post');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()  + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/jpg' ) {
    cb(null, true);
  } else {
    cb("File type not supported must be jpg|jpeg|png|gif", false);
  }
};

var upload = multer({storage: storage, fileFilter: fileFilter});

postRouter.post('/savepost', upload.single('image'), (req, res, next) => {
          
    console.log("req file = " + req.file);

    var post = JSON.parse(req.body.post)
    post['imagepath'] = 'uploads/' + req.file.filename;

    console.log("req req.body.post = " + JSON.stringify(post));
    console.log("post title = " + post.title);

    if(post.id == null) {
      
      postSQL.addPost(post, function (err, info) {
        if (err) throw err;
           post['id'] = info['insertId'];
           res.json(post);
      });
  }
  else{
      postSQL.updatePost(post, function (err, info) {
        if (err) throw err;
            res.json(post);
    });
  }
    
});

postRouter.put('/editpost', function (req, res) {
  
    var post = req.body;
    postSQL.updatePost(post, function (err, rows, fields) {
  
      if (err) throw err;
          res.json(post);
    })
});

postRouter.get('/posts', function (req, res) {
  
    postSQL.findAll(function (err, rows, fields) {
  
        if (err) throw err;
        //console.log("Mark Info = " + "err = " + JSON.stringify(err) + "rows = " + JSON.stringify(rows) + "fields = " + JSON.stringify(fields));
        res.json(rows);
    })
  });


  // API Get Post By (:id)
postRouter.get('/post/(:id)', function (req, res) {
  
    var postID = req.params.id;
    postSQL.findByID(postID, function (err, rows, fields) {
  
      if (err) throw err;
  
      console.log("Mark Info = " + "err = " + JSON.stringify(err) + "rows = " + JSON.stringify(rows) + "fields = " + JSON.stringify(fields));
      res.json(rows[0]);
    })
  });


module.exports = postRouter;