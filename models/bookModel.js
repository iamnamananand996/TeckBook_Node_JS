'use strict';

var mongoose = require('mongoose');

var bookModel = function(){
    var bookSchema = mongoose.Schema({
        title : String,
        category : String,
        description : String,
        author : String,
        publisher : String,
        price : Number,
        cover : String
    });

    // Shorten text
    bookSchema.methods.turncText = function(lenght){
       // return this.description.substring(0, lenght);
    }
    

    return mongoose.model('Book', bookSchema);
};


module.exports = new bookModel();