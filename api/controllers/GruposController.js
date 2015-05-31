/**
 * GruposController
 *
 * @description :: Server-side logic for managing grupos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	todos : function(req, res){
   // return res.json();
    Grupos.find().sort({nombre: 1}).exec(function(err, groups){
      res.view('grupos/todos', {groups : groups});
    });
  },

  sinGenero :function(req, res){
    Grupos.find({genero:"NA"}).sort({nombre: 1}).exec(function(err, groups){
      res.view('grupos/sinGenero', {groups : groups});
    });
    },

  porGenero :function(req, res){
    Grupos.find().sort({genero: 1}).exec(function(err, groups){
      res.view('grupos/porGenero', {groups : groups});
    });
    },

  detalleGrupo : function(req, res){
    Grupos.findOneById(req.param('id')).exec(function(err, groups){
      res.view('grupos/detalleGrupo',{groups : groups, id: req.param('id')});
      });
    },
   nuevo : function(req, res, next){
    res.view();
    },
  crear : function(req, res){
    sails.log("entro");
    Grupos.create(req.body).exec(function(err, grupo){
      if (err){
        sails.log.verbose(err);
        req.flash('message','Error');
        return res.send(err);
        }
      res.json(grupo);
      });
    }

};
