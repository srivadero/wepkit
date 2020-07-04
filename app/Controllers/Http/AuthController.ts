import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/user/CreateValidator'

export default class AuthController {
  async registerForm({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  async register({ auth, request, response }: HttpContextContract) {
    const userDetails = await request.validate(UserCreateValidator)
    const user = new User()
    user.merge(userDetails)
    await user.save()

    await auth.login(user)
    response.redirect('/')
  }

  async loginForm({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('uid')
    const password = request.input('password')
    await auth.attempt(email, password)

    response.redirect('/')
  }

  async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/')
  }

  async profile({ auth, view }: HttpContextContract) {
    return view.render('auth/profile', { user: auth.user })
  }
}
