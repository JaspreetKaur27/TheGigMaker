require('dotenv').config()
const axios = require('axios')
const api = {
    createProject: (userInput) => {
            return axios.post('projects/create', userInput);
    },

    getdbProjects: () => {
        return axios.get('projects/all')
    },

    collabProject: (projectId) => {
        return axios.post('/api/project-collab-pending', projectId )
    },

    googleLogin: () => {
        return axios.get('/api/auth/google/redirect');
    },

    getProfile: () => {
        return axios.get('/api/get-dbuser');
    }
}

export default api
