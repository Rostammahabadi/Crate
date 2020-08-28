import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import bcrypt from 'bcrypt';
import db from '../../setup/database';

describe('user queries',  () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false,
      })
    )
  })

  beforeEach(async() => {
   const dracoMalfoy = {
     id: 1,
     name: "Draco Malfoy",
     email: "malfoy@hogwarts.com",
     password: bcrypt.hashSync('slytherin', 10),
     role: "USER",
     createdAt: new Date(),
     updatedAt: new Date(),
   };

   const rubeusHagrid = {
     id: 2,
     name: "Rubeus Hagrid",
     email: "grounds@hogwarts.com",
     password: bcrypt.hashSync('buckbeak', 10),
     role: "USER",
     createdAt: new Date(),
     updatedAt: new Date(),
   };

   await models.User.create(rubeusHagrid);
   await models.User.create(dracoMalfoy);
 })

 afterEach(async() => {
   await models.User.destroy({ where: {}})
 })

 afterAll(() => {
   db.close()
 })

  it('it returns all users', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ users { name email }}'})
      .expect(200)

    expect(response.body.data.users.length).toEqual(2)
    expect(response.body.data.users[0].email).toBe('grounds@hogwarts.com')
    expect(response.body.data.users[0].name).toBe('Rubeus Hagrid')
  })

  it('it returns user by id', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: '{user(id: 1) {email name} }'})
    .expect(200)

  expect(response.body.data.user.name).toBe('Draco Malfoy')
  expect(response.body.data.user.email).toBe('malfoy@hogwarts.com')
  })

  it('it can authorize a user', async () => {
  const response = await request(server)
    .get('/')
    .send({ query: '{ userLogin(email: "malfoy@hogwarts.com", password: "slytherin") { user { id name role email } } }'})
    .expect(200)

    expect(response.body.data.userLogin.user.name).toEqual("Draco Malfoy")
  })
})
