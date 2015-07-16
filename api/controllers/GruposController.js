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
    Grupos.count().exec(function countCB(error, found) {
      console.log('Hay ' + found + ' Grupos"');
      });
  },
   detalle : function(req, res){
    Grupos.findOneById(req.param('id')).exec(function(err, groups){
      res.view('grupos/detalle',{groups : groups});
      });
    },


   editarDetalle : function(req, res){
     Grupos.findOneById(req.param('id')).exec(function(err, item){
      res.render('grupos/editarDetalle',{grupos : item});
      });
    },

   updateDetalle : function(req, res){
     sails.log('entro UUpdate');
     sails.log.verbose(req.body);
     var itemOb ={
       id : req.param('id'), // el req.param viene del name en la forma
       nombre : req.param('nombre'),
       genero : req.param('genero'),
       subgenero : req.param('subgenero'),
       subgenero2 : req.param('subgenero2'),
       tags : req.param('tags')
     };
       Grupos.findOneById(req.param('id')).exec(function(err, item){
         if (err) {
           sails.log.verbose("No se logró actualizar");
           return res.send(err);
         }
          // underscore funciones comunes, voy al api de lodash.com que me hace merge de los dos objetos
         _.assign(item, itemOb);

         sails.log(item);
         item.save(sails.log.verbose);
         return res.view('todos');
       });
   },

  destruir : function(req, res){
    Grupos.destroy(req.param('id')).exec(function(err, groups){
      if (err){
        sails.log.verbose(err);
        req.flash('message','Error');
        return res.send(err);
      }
       sails.log(req.param('id')+" destruido");
      //req.flash('message', 'success');
      res.view('grupos/todos',{groups : groups});

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
  nuevo : function(req, res){
    res.view('grupos/nuevo');
    sails.log("nuevo");
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
