/**
 * Group2Controller
 *
 * @description :: Server-side logic for managing group2s
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findAll : function(req, res){
//    console.log("si entro!");
    //return res.view();
   // return res.json();
    Group2.find().exec(function(err, groups){
      res.view('group2/findall', {groups : groups});
    });
  }
};
