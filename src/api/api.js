import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "4cca9709-ede7-4ae0-850a-2da3e98f37e8"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
        )
            .then(response => response.data)
    },
    follow(id) {
        return (
            instance.post(`follow/${id}`, {})
        )
            .then(response => response.data)
    },
    unfollow(id) {
        return (
            instance.delete(`follow/${id}`)
        )
            .then(response => response.data)
    },
    getProfile(id) {
        return (
            instance.get(`profile/${id}`)
        )
            .then(responce => responce.data)
    }

}

export const profileAPI = {
    getProfile(id) {
        return (
            instance.get(`profile/${id}`)
        )
            .then(responce => responce.data)
    },
    getStatus(id) {
        return (
            instance.get(`profile/status/${id}`)
        )
            .then(responce => responce.data)
    },
    updateStatus(status) {
        return (
            instance.put('profile/status', { status: status })
        )
            .then(responce => responce.data)
    }
}

export const authAPI = {
    me() {
        return (
            instance.get('auth/me')
        )
            .then(response => response.data)
    },
    login(email, password, rememberMe = false) {
        return (
            instance.post('auth/login', { email, password, rememberMe })
        )
            .then(response => response.data)
    },
    logout() {
        return (
            instance.delete('auth/login')
        )
            .then(response => response.data)
    }
}

