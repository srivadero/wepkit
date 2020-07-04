import Route from '@ioc:Adonis/Core/Route'

Route.get('register', 'AuthController.registerForm').as('auth_register')
Route.post('register', 'AuthController.register')
Route.get('login', 'AuthController.loginForm').as('auth_login')
Route.post('login', 'AuthController.login')
Route.get('logout', 'AuthController.logout').as('auth_logout').middleware('auth')
Route.get('profile', 'AuthController.profile').as('auth_profile').middleware('auth')
