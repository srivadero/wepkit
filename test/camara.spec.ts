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

  test('ensure show page works', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/camara/1').expect(200)
    const { document } = new JSDOM(text).window
    const title = document.querySelector('h1')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'Camara IP_01')
  })

  test.skip('ensure validator works', async (_assert) =>  { })
  test.skip('ensure save method works', async (_assert) =>  { })
  test.skip('ensure update method works', async (_assert) =>  { })
  test.skip('ensure delete method works', async (_assert) =>  { })
})
