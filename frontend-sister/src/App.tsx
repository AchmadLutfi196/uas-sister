import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context'
import { AnimatedBackground, ProtectedRoute } from './components'
import { StudentLayout } from './layouts'
import { LoginPage, RegisterPage } from './pages/auth'
import { StudentDashboard, KRSPage } from './pages/student'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedBackground />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
            <Route element={<StudentLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/krs" element={<KRSPage />} />
              <Route path="/student/schedule" element={<StudentDashboard />} />
              <Route path="/student/absensi" element={<StudentDashboard />} />
              <Route path="/student/grades" element={<StudentDashboard />} />
              <Route path="/student/payment" element={<StudentDashboard />} />
              <Route path="/student/settings" element={<StudentDashboard />} />
            </Route>
          </Route>

          {/* Teacher Routes */}
          <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
            <Route path="/teacher/dashboard" element={<StudentDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin/dashboard" element={<StudentDashboard />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
