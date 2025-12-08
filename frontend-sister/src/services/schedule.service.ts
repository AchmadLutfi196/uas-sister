import api from './api'
import type { ApiResponse, Schedule, Semester, Day } from '../types'

export interface CreateScheduleData {
    courseId: number
    day: Day
    time: string
    room: string
    teacherId: number
}

export const scheduleService = {
    async getAll(): Promise<ApiResponse<Schedule[]>> {
        const response = await api.get('/schedule')
        return response.data
    },

    async getById(id: number): Promise<ApiResponse<Schedule>> {
        const response = await api.get(`/schedule/${id}`)
        return response.data
    },

    async getBySemester(semester: Semester): Promise<ApiResponse<Schedule[]>> {
        const response = await api.get(`/schedule/semester/${semester}`)
        return response.data
    },

    async create(data: CreateScheduleData): Promise<ApiResponse<Schedule>> {
        const response = await api.post('/schedule/create', data)
        return response.data
    },

    async update(data: Partial<CreateScheduleData> & { id: number }): Promise<ApiResponse<Schedule>> {
        const response = await api.patch('/schedule', data)
        return response.data
    },

    async delete(id: number): Promise<ApiResponse<Schedule>> {
        const response = await api.delete(`/schedule/${id}`)
        return response.data
    },
}

export default scheduleService
