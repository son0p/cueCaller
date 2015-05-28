/**
 * Group2Controller
 *
 * @description :: Server-side logic for managing group2s
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findAll : function(req, res){
    console.log("si entro!");
    return res.view();

  }
};
