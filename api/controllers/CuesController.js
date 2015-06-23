/**
 * CuesController
 *
 * @description :: Server-side logic for managing cues
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	todos : function(req, res){
   // return res.json();
    Cues.find().where({talent:"fonseca"}).sort({setList: 1}).exec(function(err, cue){
       if (err) {
           sails.log.verbose("No se encontraron Cues de ese talento");
           return res.send(err);
         } // TODO: no me está mostrando este error
      res.view('cues/todos', {cues : cue});
    });
  },
   detalle : function(req, res){
    Cues.findOneById(req.param('id')).exec(function(err, cue){
       sails.log.verbose(cue);
      res.view('cues/detalle',{cues : cue});
      });
    },
   editarDetalle : function(req, res){
     Cues.findOneById(req.param('id')).exec(function(err, cue){
      res.render('cues/editarDetalle',{cues : cue});
      });
    },
   updateDetalle : function(req, res){
     sails.log('entro UUpdate');
     sails.log.verbose(req.body);
     var cueOb ={
       id : req.param('id'), // el req.param viene del name en la forma
       talent : req.param('talent'),
       setList : req.param('setList')
        }
// la anatomia de esto es findOne es la funcion, exec es el callback, los parametros de la funcion de callback son objetos, el uno es error, sino hubo un error el monta todo lo logrado por la funcion en el segundo parametro del callback
       Cues.findOneById(req.param('id')).exec(function(err, cue){
         if (err) {
           sails.log.verbose("No se logró actualizar");
           return res.send(err);
         }
          // underscore funciones comunes, voy al api de lodash.com que me hace merge de los dos objetos
         _.assign(cue, cueOb);

         sails.log(cue);
      //   cue.setList=req.param('setList');
       cue.save(sails.log.verbose);
        return res.view('todos');
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
