import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Auth', () => {
  test('ensure login page works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/login').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('h1')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'Iniciar sesion')
  })

  test('ensure register page works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/register').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('h1')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'Crear cuenta')
  })


  test.only('ensure can login', async (assert) => {
    const { text } = await supertest(BASE_URL)
      .post('/login')
      .field({
        'uid': 'admin@example.com',
        'password': 'admin',
      })
      .redirects(5)
      // .expect(200)
    assert.equal(text, 'AAA')
    // const { document } = new JSDOM(text).window
    // const title = document.querySelector('h1')
    // assert.exists(title)
    // assert.equal(title!.textContent!.trim(), 'Crear cuenta')
  })

})
