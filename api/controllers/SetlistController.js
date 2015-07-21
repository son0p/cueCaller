/**
 * SetlistController
 *
 * @description :: Server-side logic for managing setlists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	todos : function(req, res){
   // return res.json();
    Cues.find().where({talent:"mvlm"}).sort({setList: 1}).exec(function(err, item){
       if (err) {
           sails.log.verbose("No se encontraron composiciones");
           return res.send(err);
         } // TODO: no me está mostrando este error
      res.view('setlist/todos', {cues : item});
    });
  },

  	agruparTempo : function(req, res){
   // return res.json();
    Cues.find().where({talent:"mvlm"}).sort({bpm: 1}).exec(function(err, item){
       if (err) {
           sails.log.verbose("No se encontraron composiciones");
           return res.send(err);
         } // TODO: no me está mostrando este error
      res.view('setlist/todos', {cues : item});
    });
  },
  	agruparTonalidad : function(req, res){
   // return res.json();
    Cues.find().where({talent:"mvlm"}).sort({key: 1}).exec(function(err, item){
       if (err) {
           sails.log.verbose("No se encontraron composiciones");
           return res.send(err);
         } // TODO: no me está mostrando este error
      res.view('setlist/todos', {cues : item});
    });
  }
};
