/**
 * SongController
 *
 * @description :: Server-side logic for managing songs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {

   find : function(req, res) {
     song.findOneById(req.param('id')).exec(function(err, taller) {
       res.view('songView',{song: song });
     });
   },
 };
