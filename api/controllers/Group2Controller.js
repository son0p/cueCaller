/**
 * Group2Controller
 *
 * @description :: Server-side logic for managing group2s
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findAll : function(req, res){
   // return res.json();
    Group2.find().sort({nombre: 1}).exec(function(err, groups){
      res.view('group2/findall', {groups : groups});
    });
  },

  sinGenero :function(req, res){
    Group2.find({genero:"NA"}).sort({nombre: 1}).exec(function(err, groups){
      res.view('group2/sinGenero', {groups : groups});
    });
    }
};
