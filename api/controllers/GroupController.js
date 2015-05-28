/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
 // find : function (req, res) {
 //   Group.findOneById(req.param('id')).exec(function(err, res){
 //     res.send("Hi there! test2");
 //   }
 //  )},
  findAll : function(req, res){
    res.json(group);
  },
  hi : function (req, res) {
    return res.send("Hi there! test");
   }
};
