import axios from 'axios'
const urlBase = '/api/persons'

const allPhones = () => axios.get(urlBase).then(resp => resp.data)

const createPhone = newPhoneObj => axios.post(urlBase, newPhoneObj).then(resp => resp.data)

const updatePhone = (id, newPhoneObj) => axios.put(`${urlBase}/${id}`, newPhoneObj).then(resp => resp.data)

const deletePhone = id => axios.delete(`${urlBase}/${id}`).then(resp => resp.data)

const backend = { allPhones, createPhone, deletePhone, updatePhone }

export default backend
