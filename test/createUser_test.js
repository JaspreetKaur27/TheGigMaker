
const assert = require('assert');

const mongoose = require('mongoose');

const User = require('../app/models/projects/users');



describe("Adding a project to the User model", function() {


    beforeEach(function(done){
        mongoose.connection.collection.drop(function(){
            done();
        });
    });

    it("Create a User with sub documents", function(done){
        

        var pat = new User({
            username: 'Patrick Ruffus',
            googleId: 1123,
            projects:[{title:'node master'}]
        });

        pat.save().then(function(){
            User.findOne({username:'Patrick Ruffus'}).then(function(record){
                assert(record.projects.length === 1);

                done();
            });
        });
    });

    it('Adds a project to a User', function(done) {

        var pat = new User({
            username: 'Patrick Ruffus',
            googleId: 1123,
            projects:[{title:'name of the wind'}]
        });

        pat.save().then(function(){

            User.findOne({username:'Patrick Ruffus'}).then(function(record){

            // add a book to the books array 
                record.projects.push({title: "Wise man fears"})

                record.save().then(function(){
                    User.findOne({username: 'Patrick Ruffus'}).then(function(result) {

                        assert(result.projects.length === 2);
                        done();
                    });
                });
    
            });
        });
    });
});