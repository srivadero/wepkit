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
Route.resource('camara', 'CamarasController')
Route.resource('camara.novedad', 'NovedadCamarasController')
Route.resource('novedad', 'NovedadsController')
// Route.get('/novedad/create', 'NovedadsController.createMany').as('novedad.createmany')
// Route.post('/novedad/create', 'NovedadsController.storeMany')
// Route.get('/novedad/:id/edit', 'NovedadsController.editMany').as('novedad.edit')
// Route.put('/novedad/:id/edit', 'NovedadsController.updateMany').as('novedad.update')
// .except(['update'])
  // .only(['index', 'create', 'store', 'show', 'edit'])
