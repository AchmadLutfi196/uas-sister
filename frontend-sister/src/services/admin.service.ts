import api from './api'
import type { ApiResponse } from '../types'

export interface AdminUser {
    id: number
    email: string
    name: string
    role: 'ADMIN' | 'STUDENT' | 'TEACHER'
    photo?: string
    telephone?: string
    tanggalLahir?: string
    gender?: 'MAN' | 'WOMAN'
    createdAt: string
    updatedAt: string
    student?: {
        id: number
        nim: string
        programStudi: string
        fakultas?: string
        statusStudent: 'ACTIVE' | 'DO' | 'LULUS'
        gpa: number
        sks: number
    }
    teacher?: {
        id: number
        nip: string
        gelar?: string
        keahlian?: string
        fakultas?: string
    }
    Admin?: {
        id: number
    }
}

export interface AdminStats {
    totalStudents: number
    totalTeachers: number
    totalCourses: number
    totalEnrollments: number
}

const adminService = {
    // Get admin profile
    getProfile: async (): Promise<ApiResponse<AdminUser>> => {
        const response = await api.get('/admin')
        return response.data
    },

    // Get all users (students and teachers)
    getUsers: async (): Promise<ApiResponse<AdminUser[]>> => {
        const response = await api.get('/admin/users')
        return response.data
    },

    // Get student by ID
    getStudent: async (id: number): Promise<ApiResponse<AdminUser>> => {
        const response = await api.get(`/admin/students/${id}`)
        return response.data
    },

    // Get teacher by ID
    getTeacher: async (id: number): Promise<ApiResponse<AdminUser>> => {
        const response = await api.get(`/admin/teachers/${id}`)
        return response.data
    },

    // Search students by name
    searchStudents: async (name: string): Promise<ApiResponse<AdminUser[]>> => {
        const response = await api.get('/admin/students', { params: { name } })
        return response.data
    },

    // Search teachers by name
    searchTeachers: async (name: string): Promise<ApiResponse<AdminUser[]>> => {
        const response = await api.get('/admin/teachers', { params: { name } })
        return response.data
    },

    // Update user
    updateUser: async (data: {
        id: number
        role: 'STUDENT' | 'TEACHER'
        name?: string
        email?: string
        password?: string
    }): Promise<ApiResponse<AdminUser>> => {
        const response = await api.patch('/admin/user', data)
        return response.data
    },

    // Delete user
    deleteUser: async (id: number, role: 'STUDENT' | 'TEACHER'): Promise<ApiResponse<AdminUser>> => {
        const response = await api.delete('/admin/user', { data: { id, role } })
        return response.data
    },

    // Register new admin
    registerAdmin: async (data: {
        name: string
        email: string
        password: string
    }): Promise<ApiResponse<AdminUser>> => {
        const response = await api.post('/admin/register', data)
        return response.data
    },
}

export default adminService
