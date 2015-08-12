/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  // '/event': {
  //   view: 'eventpage'
  //   },
  'get /song/:id': 'songController.find',
//'get /group2/:id': 'groupController.find'

  'get /grupos': 'GruposController.todos',
  'get /grupos/sinGenero': 'GruposController.sinGenero',
  'get /grupos/porGenero': 'GruposController.porGenero',
  'get /grupos/detalle/:id': 'GruposController.detalle',
  'get /grupos/editarDetalle/:id': 'GruposController.editarDetalle',
  'post /grupos/editarDetalle/:id?': 'GruposController.updateDetalle',
  'get /grupos/crear': 'GruposController.nuevo',
  'get /grupos/crear': 'GruposController.crear',
  'post /grupos/crear': 'GruposController.crear',
  'post /grupos/nuevo': 'GruposController.nuevo',
  'get /cues/crear': 'CuesController.nuevo',
  'get /cues/crear': 'CuesController.crear',
  'post /cues/crear': 'CuesController.crear',
  'post /cues/nuevo': 'CuesController.nuevo',
  'get /cues/todos': 'CuesController.todos',
  'get /cues/detalle': 'CuesController.detalle',
  'get /cues/editarDetalle/:id': 'CuesController.editarDetalle',
  'post /cues/editarDetalle/:id?': 'CuesController.updateDetalle',
  'get /cues/editarSet': 'CuesController.editarSet',
  'post /cues/editarSet': 'CuesController.updateSet',
  'get /composition' : 'CompositionController.todos',
  'get /setlist' : 'setlist.todos',
  'get /api/grupos/apariciones' : 'ApiController.apariciones',
  'get /calendar': 'Calendar.totalProfes'


  //'get /group2': 'Group2Controller.findAll',
  //'get /group2/sinGenero': 'Group2Controller.sinGenero'



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
