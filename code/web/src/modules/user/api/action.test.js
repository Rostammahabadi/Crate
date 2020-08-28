import * as actions from './actions.js'
import axios from 'axios'
import mockAxios from 'jest-mock-axios';
jest.mock('axios');

describe('Actions', () => {
  let user, token;
  beforeEach(() => {
    user = {
      details: {
        name: "The User",
        email: "user@crate.com",
        role: "USER"
      },
      error: null,
      isLoading: false,
      isAuthenticated: true
    }

    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlRoZSBVc2VyIiwiZW1haWwiOiJ1c2VyQGNyYXRlLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNTk4MzMzMTQwfQ.EodZNLw5drqn7FzMTTt4EHujMoAkOeqJaJ5qZXidjho"
  })

  it('Should set user', () => {
    const expectedAction = {
      type: 'AUTH/SET_USER',
      user
    }
    const result = actions.setUser(token, user)
    expect(result).toEqual(expectedAction)
  })

  it.skip('Should process user login', async () => {
    const userCredentials = {
      email: "user@crate.com",
      password: "123456"
    }
  
    const data = {
      user: {
        details: {
          name: "The User",
          email: "user@crate.com",
          role: "USER"
        },
        error: null,
        isLoading: false,
        isAuthenticated: true
      }
    }
    axios.post.mockImplementationOnce(() => Promise.resolve(data))
    axios.mockResponse(data)
    // expect(mockAxios).toHaveBeenCalledWith(data)
    // await expect(actions.login(userCredentials)).resolves.toEqual(data)
  })

  it.skip('Should process user logout', () => {

  })
})