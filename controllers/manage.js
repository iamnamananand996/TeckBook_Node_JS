'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/catogoryModel');


module.exports = function (router) {
    router.get('/books', function (req, res) {
            Book.find({}, function(err, books){
                if (err) {
                    console.log(err+'is here');
                }
                var model = {
                    books : books
                };
                res.render('manage/books/index', model);
            });
    });




    router.get('/', function (req, res) {
        res.render('manage/index');
    });



    router.get('/categories', function (req, res) {
        Category.find({}, function(err, categories){
            if (err) {
                console.log(err);
            }
            var model = {
                categories : categories
            };
            res.render('manage/categories/index', model);
        });
    });



    router.get('/books/add', function (req, res) {
        Category.find({},function(err,categories){
            if (err) {
                console.log(err);
            }
               var model = {
                categories :  categories
            };
        res.render('manage/books/add',model);
        });
    });


    // router.post('/books', function (req, res) {
    //    console.log("checking works")
    // });


    router.post('/books',function(req, res){
        
         var title = req.body.title && req.body.title.trim();
         var category = req.body.category && req.body.category.trim();
         var author = req.body.author && req.body.author.trim();
         var publisher = req.body.publisher && req.body.publisher.trim();
         var price = req.body.price && req.body.price.trim();
         var description = req.body.description && req.body.description.trim();
         var cover = req.body.cover && req.body.cover.trim();

         if (title=='' || price=='') {
             
          //   req.flash('error',"Please fill out req fields");
             res.location('/manage/books/add');
             res.redirect('/manage/books/add');
         }
  
        
        var Booknew = new Book({
            title : title,
            category : category,
            description : description,
            author : author,
            publisher : publisher,
            cover : cover,
            price : price
        });

       Booknew.save(function(err){
           if (err) {
               console.log('save error',err);
           }
           console.log('comes here');
           // req.flash('success',"Book Added");
             res.location('/manage');
             res.redirect('/manage');
       });
     }); 



// to display edit form

router.get('/books/edit/:id', function (req, res) {
    Category.find({},function(err,categories){
        Book.findOne({_id:req.params.id},function(err,book){
            if (err) {
                console.log(err);
            }
               var model = {
                   book : book,
                categories :  categories
            };
        res.render('manage/books/edit',model);
        });
        
    });
});



     router.post('/books/edit/:id',function(req, res){
        
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim(); 

      Book.update({_id:req.params.id},{
        title : title,
        category : category,
        description : description,
        author : author,
        publisher : publisher,
        cover : cover,
        price : price
    },
        
        
        function(err){
          if (err) {
              console.log('update error',err);
          }
          console.log('comes here');
          //req.flash('success',"Book Updated");
            res.location('/manage/books');
            res.redirect('/manage/books');
      });
    }); 

// Delete Books
    router.delete('/books/delete/:id', function(req,res){
        Book.findById( req.params.id,function(err,post){
            post.remove( function ( err, post ){
                if (err) {
                    console.log(err);
                }
                // req.flash('success',"Deleted");
                res.location('/manage/books');
                res.redirect('/manage/books');
            });
            
        });
    });


// Display Add categoires

router.get('/categories/add', function (req, res) {
    res.render('manage/categories/add');
});



    // Add new categories 

    router.post('/categories',function(req, res){
        
        var name = req.body.name && req.body.name.trim();
       

        if (name=='' ) {
            
         //   req.flash('error',"Please fill out req fields");
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }
 
       
       var newCategory = new Category({
           name : name,
           
       });

      newCategory.save(function(err){
          if (err) {
              console.log('save error',err);
          }
          console.log('comes here');
          // req.flash('success',"Book Added");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
      });
    }); 



// get edit form

    router.get('/categories/edit/:id', function (req, res) {
        
            Category.findOne({_id:req.params.id},function(err,category){
                if (err) {
                    console.log(err);
                }
                   var model = {
                       
                    category :  category
                };
            res.render('manage/categories/edit',model);
            });
            
        });






   // update Categories
   
   router.post('/categories/edit/:id',function(req, res){
        
    var name = req.body.name && req.body.name.trim();

  Category.update({_id: req.params.id},{name: name},
    function(err){
      if (err) {
          console.log('update error',err);
      }
      console.log('comes here');
      // req.flash('success',"Book Added");
        res.location('/manage/categories');
        res.redirect('/manage/categories');
  });
}); 


// delete categories 

router.delete('/categories/delete/:id', function(req,res){
    Category.findById( req.params.id,function(err,post){
        post.remove( function ( err, post ){
            if (err) {
                console.log(err);
            }
            // req.flash('success',"Deleted");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
        
    });
});


};

