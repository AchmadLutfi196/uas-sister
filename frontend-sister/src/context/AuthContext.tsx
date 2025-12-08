import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { authService } from '../services'
import type { User, UserWithStudent, UserWithTeacher, Role } from '../types'

type AuthUser = User | UserWithStudent | UserWithTeacher | null

interface AuthContextType {
    user: AuthUser
    role: Role | null
    token: string | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (credentials: { type: Role; identifier: string; password: string }) => Promise<void>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser>(null)
    const [role, setRole] = useState<Role | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for existing session
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        const storedRole = localStorage.getItem('role') as Role | null

        if (storedToken && storedUser && storedRole) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
            setRole(storedRole)
        }
        setIsLoading(false)
    }, [])

    const login = async ({ type, identifier, password }: { type: Role; identifier: string; password: string }) => {
        setIsLoading(true)
        try {
            let response
            switch (type) {
                case 'STUDENT':
                    response = await authService.loginStudent(identifier, password)
                    break
                case 'TEACHER':
                    response = await authService.loginTeacher(identifier, password)
                    break
                case 'ADMIN':
                    response = await authService.loginAdmin(identifier, password)
                    break
            }

            const userData = response.data
            const userToken = userData.token!

            localStorage.setItem('token', userToken)
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('role', type)

            setUser(userData)
            setToken(userToken)
            setRole(type)
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setIsLoading(true)
        try {
            if (role === 'STUDENT') {
                await authService.logoutStudent()
            } else if (role === 'TEACHER') {
                await authService.logoutTeacher()
            } else if (role === 'ADMIN') {
                await authService.logoutAdmin()
            }
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('role')
            setUser(null)
            setToken(null)
            setRole(null)
            setIsLoading(false)
        }
    }

    const refreshUser = async () => {
        if (!role) return

        try {
            let response
            switch (role) {
                case 'STUDENT':
                    response = await authService.getStudentDetail()
                    break
                case 'TEACHER':
                    response = await authService.getTeacherDetail()
                    break
                case 'ADMIN':
                    response = await authService.getAdminDetail()
                    break
            }
            setUser(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
        } catch (error) {
            console.error('Refresh user error:', error)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                token,
                isLoading,
                isAuthenticated: !!token,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
