import { instance, APIResponseType } from "./api"
import { PhotosType, ProfileType } from '../types/types'

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(id: number) {
        return (
            instance.get<ProfileType>(`profile/${id}`)
        )
            .then(responce => responce.data)
    },
    getStatus(id: number) {
        return (
            instance.get<string>(`profile/status/${id}`)
        )
            .then(responce => responce.data)
    },
    updateStatus(status: string) {
        return (
            instance.put<APIResponseType>('profile/status', { status: status })
        )
            .then(responce => responce.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return (
            instance.put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        )
            .then(responce => responce.data)
    },
    saveProfile(profile: ProfileType) {
        return (
            instance.put<APIResponseType>('profile', profile)
        )
            .then(responce => responce.data)
    }
}