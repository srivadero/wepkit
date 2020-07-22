/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/auth'

Route.on('/').render('welcome')
Route.resource('camara', 'CamarasController')//.middleware({'*': 'auth'})
Route.resource('tipo', 'TiposController')//.middleware({'*': 'auth'})
Route.resource('estado', 'EstadosController')//.middleware({'*': 'auth'})
Route.group(() => {
  Route.get('novedad/', 'NovedadsController.index').as('novedad.index')
  Route.get('novedad/create', 'NovedadsController.create').as('novedad.create')
  Route.post('novedad/create', 'NovedadsController.store').as('novedad.store')
  Route.get('novedad/:id/edit', 'NovedadsController.edit').as('novedad.edit')
  Route.post('novedad/:id/edit', 'NovedadsController.update').as('novedad.update')
  Route.get('novedad/:id', 'NovedadsController.show').as('novedad.show')
  // Route.post('_novedad/filter', 'NovedadsController.filter').as('novedad.filter')
  // Route.get('_novedad/nofilter', 'NovedadsController.removeFilter').as('novedad.removeFilter')
})//.middleware('auth')

// Route.get('test', 'NovedadsController.newindex').as('novedad.index')
