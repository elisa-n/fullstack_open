import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => axios.get(baseUrl)

const create = newPerson => axios.post(baseUrl, newPerson)

const deletePerson = id => axios.delete(`${baseUrl}/${id}`)

const updatePerson = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)


export default {
  getAll: getAll,
  create: create,
  deletePerson: deletePerson,
  updatePerson: updatePerson
}