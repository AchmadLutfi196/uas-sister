import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context'
import { LoadingOverlay, Box } from '@mantine/core'
import type { Role } from '../types'

interface ProtectedRouteProps {
    allowedRoles?: Role[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, role } = useAuth()

    if (isLoading) {
        return (
            <Box pos="relative" h="100vh">
                <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
            </Box>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && role && !allowedRoles.includes(role)) {
        // Redirect to appropriate dashboard based on role
        switch (role) {
            case 'STUDENT':
                return <Navigate to="/student/dashboard" replace />
            case 'TEACHER':
                return <Navigate to="/teacher/dashboard" replace />
            case 'ADMIN':
                return <Navigate to="/admin/dashboard" replace />
            default:
                return <Navigate to="/login" replace />
        }
    }

    return <Outlet />
}
