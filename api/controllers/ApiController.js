/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  apariciones : function(req, res){
   // Grupos.find().where({apariciones: {$in :"venue"}}).sort({nombre: 1}).exec(function(err, groups){
    Grupos.find().exec(function(err, groups){
      //Grupos.find().sort({nombre: 1}).exec(function(err, groups){
     // groups = _.pick(groups, 'apariciones');
      sails.log(groups);
      return res.json(groups);
    });

    }
};
