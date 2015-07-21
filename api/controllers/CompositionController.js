/**
 * CompositionController
 *
 * @description :: Server-side logic for managing compositions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
		todos : function(req, res){
   // return res.json();
    Cues.find().where({talent:"bigband"}).sort({setList: 1}).exec(function(err, item){
       if (err) {
           sails.log.verbose("No se encontraron composiciones");
           return res.send(err);
         } // TODO: no me está mostrando este error
      res.view('cues/todos', {cues : item});
    });
  }
};
