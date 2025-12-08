import api from './api'
import type { ApiResponse, Course, Semester } from '../types'

export interface CreateCourseData {
    name: string
    code: string
    sks: number
    semester: Semester
    programStudi: string
    fakultas: string
}

export const courseService = {
    async getAll(): Promise<ApiResponse<Course[]>> {
        const response = await api.get('/course')
        return response.data
    },

    async getByCode(code: string): Promise<ApiResponse<Course>> {
        const response = await api.get(`/course/detail/${code}`)
        return response.data
    },

    async search(name: string): Promise<ApiResponse<Course[]>> {
        const response = await api.get('/course/search', { params: { name } })
        return response.data
    },

    async create(data: CreateCourseData): Promise<ApiResponse<Course>> {
        const response = await api.post('/course/create', data)
        return response.data
    },

    async update(data: Partial<CreateCourseData> & { code: string }): Promise<ApiResponse<Course>> {
        const response = await api.patch('/course', data)
        return response.data
    },

    async delete(code: string): Promise<ApiResponse<Course>> {
        const response = await api.delete(`/course/${code}`)
        return response.data
    },
}

export default courseService
