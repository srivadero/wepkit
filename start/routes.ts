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
Route.resource('camara', 'CamarasController').middleware({'*': 'auth'})
Route.resource('tipo', 'TiposController').middleware({'*': 'auth'})
Route.resource('novedad', 'NovedadsController')
  .middleware({
    index: 'auth',
    create: 'auth',
    store: 'auth',
    edit: ['auth', 'autor'],
    update: ['auth', 'autor'],
    show: 'auth',
    destroy: ['auth', 'autor'],
  })
Route.get('paginate/:id?', 'NovedadsController.paginate').as('novedad.paginate')
