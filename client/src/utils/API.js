require('dotenv').config()
const axios = require('axios')
const api = {
    createProject: (userInput) => {
            return axios.post('projects/create', userInput)
    },

    getdbProjects: () => {
        return axios.get('projects/all');
    },

    collabProject: (projectId) => {
        return axios.post('/api/project-collab-pending', projectId );
    },

    getProfile: () =>
    {
        return axios.get('/users/all');
    },

    googleLogin: () => {
        return axios.get('/users/auth/google');
    }
}

export default api
