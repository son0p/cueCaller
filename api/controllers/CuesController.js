/**
 * CuesController
 *
 * @description :: Server-side logic for managing cues
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	todos : function(req, res){
   // return res.json();
    Cues.find().sort({setList: 1}).exec(function(err, cue){
      res.view('cues/todos', {cues : cue});
    });
  },
   detalle : function(req, res){
    Cues.findOneById(req.param('id')).exec(function(err, cue){
      res.view('cues/detalle',{cues : cue});
      });
    },
   editarDetalle : function(req, res){
    Cues.findOneById(req.param('id')).exec(function(err, cue){
      res.view('cues/editarDetalle',{cues : cue});
      });
    },
  editarSet : function(req, res){
    Cues.find().sort({setList: 1}).exec(function(err, cue){
      res.view('cues/editarSet', {cues: cue});
    });
    },
  updateSet : function(req, res){
    sails.log('=>UpdateSet')
    Cues.update(req.body).exec(function(err, cue){
      res.view('cues/detalle/', {cues: cue});
    });
    },

  destruir : function(req, res){
    Cues.destroy(req.param('id'));
    sails.log(req.param('id')+" destruido");
    },

  sinGenero :function(req, res){
    Cues.find({genero:"NA"}).sort({nombre: 1}).exec(function(err, cues){
      res.view('cues/sinGenero', {cues : cues});
    });
    },

  porGenero :function(req, res){
    Cues.find().sort({genero: 1}).exec(function(err, cues){
      res.view('cues/porGenero', {cues : cues});
    });
  },
  nuevo : function(req, res){
    res.view('cues/nuevo');
    sails.log("nuevo");
    },
  crear : function(req, res){
    sails.log("entro");
    Cues.create(req.body).exec(function(err, grupo){
      if (err){
        sails.log.verbose(err);
        req.flash('message','Error');
        return res.send(err);
      }
      res.json(grupo);
      });
    }

};
