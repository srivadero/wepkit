import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Camara', () => {
  test('ensure index page works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/camara').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('h1')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'Gestion de camaras')
  })

  test('ensure create page works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/camara/create').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('h1')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'Nueva camara')
  })

  test('ensure edit page works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/camara/1/edit').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('h1')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'Edicion de camara')
  })

  test.skip('ensure show page works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/camara/1').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('h1')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'Camara IP 01')
  })

  test.skip('ensure add novedad works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/camara/1/novedad/create').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('h1')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'Novedad')
  })

  test.skip('ensure edit novedad works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/camara/1').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelectorAll('table a')
    assert.exists(title)
    console.log(title)
    title.forEach((element) => {
      console.log(element)
      assert.equal(element!.textContent!.trim(), 'Novedad')
    });
  })

  test.skip('ensure validator works', async (_assert) => { })
  test.skip('ensure save method works', async (_assert) => { })
  test.skip('ensure update method works', async (_assert) => { })
  test.skip('ensure delete method works', async (_assert) => { })

  test.skip('USER CAN LOGIN', async (assert) => {
    const { text } = await supertest(BASE_URL)
      .post('/register')
      .field('username', 'TEST_01')
      .field('email', 'TEST_01')
      .field('password', 'TEST_01')
      .field('password_confirmed', 'TEST_01')
      .expect(200)
    assert.equal(text, 'Hello')
  })
})
