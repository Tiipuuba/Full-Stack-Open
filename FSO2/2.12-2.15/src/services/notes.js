import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deletePerson = deleteObject => {
  return axios.delete(`${baseUrl}/${deleteObject}`)
}

const updatePerson = updateObject => {
  return axios.put(`${baseUrl}/${updateObject.id}`, updateObject)
}

export default { getAll, create, deletePerson, updatePerson }