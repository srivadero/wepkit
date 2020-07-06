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
Route.resource('camara.novedad', 'NovedadsController')
Route.resource('novedad', 'NovedadsController').only(['index'])
Route.get('/novedad/create', 'NovedadsController.createMany').as('novedad.createmany')
Route.post('/novedad/create', 'NovedadsController.storeMany')
// .except(['update'])
  // .only(['index', 'create', 'store', 'show', 'edit'])
