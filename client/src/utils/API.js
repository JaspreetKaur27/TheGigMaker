require('dotenv').config()
const axios = require('axios')
const api = {
    createProject: (userInput) => {
            return axios.post('/projects/create', userInput);
    },

    getdbProjects: () => {
        return axios.get('/projects/all')
    },

    getUserProjects: (UserId) => {
        return axios.get('/users/all/' + UserId)
    },

    

    getUserObject: () => {
        return axios.get('users/user-object')
    },


    collabProject: (gigster) => {
        return axios.post('/projects/collab-pending', gigster)
    },

    googleLogin: () => {
        return axios.get('/api/auth/google/redirect');
    },

    getProfile: () => {
        return axios.get('/api/get-dbuser');
    }
}

export default api
