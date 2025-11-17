import { feathers } from '@feathersjs/feathers'
import rest  from '@feathersjs/rest-client'
import axios from 'axios'

const restClient = rest('http://localhost:3030')

export const api = feathers().configure(
  restClient.axios(axios)
)

// Add JWT automatically
api.hooks({
  before: {
    all: [
      async context => {
        const token = localStorage.getItem("accessToken")
        if (token) {
          context.params.headers = {
            ...context.params.headers,
            Authorization: `Bearer ${token}`
          }
        }
        return context
      }
    ]
  }
})
