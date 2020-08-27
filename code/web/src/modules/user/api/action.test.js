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

    // console.log(fetchcall)
    // await expect(actions.login(userCredentials)).resolves.toEqual(data)
  })

  // it('fetches erroneously data from an API', async () => {
  //   const errorMessage = 'Network Error';
 
  //   axios.get.mockImplementationOnce(() =>
  //     Promise.reject(new Error(errorMessage)),
  //   );
 
  //   await expect(fetchData('react')).rejects.toThrow(errorMessage);
  // });


  // it('fetches successfully data from an API', async () => {
  //   const data = {
  //     data: {
  //       hits: [
  //         {
  //           objectID: '1',
  //           title: 'a',
  //         },
  //         {
  //           objectID: '2',
  //           title: 'b',
  //         },
  //       ],
  //     },
  //   };
 
  //   axios.get.mockImplementationOnce(() => Promise.resolve(data));
  // });

  it.skip('Should process user logout', () => {
    // on user logout
    // state should change for user.details to undefined/null\
    // need to mock store? 
  })
})