require('dotenv').config()
const axios = require('axios')
const api = {
    createProject: (userInput) => {
            return axios.post('/projects/create', userInput);
    },

    getdbProjects: () => {
        return axios.get('/projects/all')
    },

    getUserProjects: (userId) => {
        return axios.get(`/users/all/${userId}`)
    },

    getUserObject: () => {
        return axios.get('/users/user-object')
    },

    collabProject: (gigster) => {
        return axios.post('/collaborators/collab-pending', gigster)
    }, 

    approveProject: (gigsterId)  =>
    {
        return axios.post(`/collaborators/collab-approval/${gigsterId}`);
    }, 

    deleteProject: (projectId) => {
        return axios.post(`/projects/delete/${projectId}`);
    }
}

export default api
