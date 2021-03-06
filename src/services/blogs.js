import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type':'application/json' }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blog) => {
  const config = { 
    headers: { 'Authorization': token , 'Content-Type':'application/json'}
  }
  const response = await axios
    .put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (blog) => {
  const config = { 
    headers: { 'Authorization': token , 'Content-Type':'application/json'}
  }
  const response = await axios
    .delete(`${baseUrl}/${blog.id}`, config);
  return response.data
}

export default { getAll, create, setToken, update, remove }