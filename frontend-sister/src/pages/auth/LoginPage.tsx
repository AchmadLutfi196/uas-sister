import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    TextInput,
    PasswordInput,
    LoadingOverlay,
    Alert,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Swal from 'sweetalert2'
import { IconAlertCircle } from '@tabler/icons-react'
import { useAuth } from '../../context'
import type { Role } from '../../types'
import styles from './LoginPage.module.css'

type LoginType = 'STUDENT' | 'TEACHER' | 'ADMIN'

export function LoginPage() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [userType, setUserType] = useState<LoginType>('STUDENT')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm({
        initialValues: {
            identifier: '',
            password: '',
        },
        validate: {
            identifier: (value) => (!value ? 'Field ini wajib diisi' : null),
            password: (value) => (!value ? 'Password wajib diisi' : null),
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        setError(null)
        setIsLoading(true)
        try {
            await login({
                type: userType as Role,
                identifier: values.identifier,
                password: values.password,
            })

            await Swal.fire({
                icon: 'success',
                title: 'Login Berhasil!',
                text: 'Selamat datang kembali.',
                timer: 1500,
                showConfirmButton: false,
            })

            // Navigate based on role
            switch (userType) {
                case 'STUDENT':
                    navigate('/student/dashboard')
                    break
                case 'TEACHER':
                    navigate('/teacher/dashboard')
                    break
                case 'ADMIN':
                    navigate('/admin/dashboard')
                    break
            }
        } catch (err: any) {
            const message = err.response?.data?.errors || err.response?.data?.message || err.message || 'Login gagal. Silakan coba lagi.'
            setError(message)

            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: message,
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#3b82f6',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const getIdentifierLabel = () => {
        switch (userType) {
            case 'STUDENT':
                return 'NIM'
            case 'TEACHER':
                return 'NIP'
            case 'ADMIN':
                return 'Email'
        }
    }

    const getIdentifierPlaceholder = () => {
        switch (userType) {
            case 'STUDENT':
                return 'Masukkan NIM Anda'
            case 'TEACHER':
                return 'Masukkan NIP Anda'
            case 'ADMIN':
                return 'Masukkan email Anda'
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.splitContainer}>
                {/* Left Side - Hero Image */}
                <div className={styles.heroSide}>
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <div className={styles.statusBadge}>
                            <span className={styles.statusDot}></span>
                            <span>Portal Akademik Online</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            Sistem Informasi <span className={styles.primaryText}>Akademik Terpadu</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Akses jadwal kuliah, nilai, KRS, dan layanan akademik lainnya dalam satu platform.
                        </p>
                        <div className={styles.socialProof}>
                            <div className={styles.avatarStack}>
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=1)' }}></div>
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=2)' }}></div>
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=3)' }}></div>
                                <div className={styles.avatarCount}>+5K</div>
                            </div>
                            <span className={styles.socialText}>
                                <span className={styles.highlight}>5,000+</span> pengguna aktif
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.formSide}>
                    {/* Mobile Logo */}
                    <div className={styles.mobileLogo}>
                        SISTER<span className={styles.primaryText}>.</span>
                    </div>

                    <div className={styles.formContainer}>
                        <div className={styles.formContent}>
                            <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />
                            
                            <div className={styles.formHeader}>
                                <h2 className={styles.formTitle}>Selamat Datang!</h2>
                                <p className={styles.formSubtitle}>Masuk untuk mengakses portal akademik.</p>
                            </div>

                            {/* Role Toggle */}
                            <div className={styles.roleToggle}>
                                <label className={styles.roleOption}>
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="STUDENT" 
                                        checked={userType === 'STUDENT'}
                                        onChange={() => { setUserType('STUDENT'); setError(null); form.reset() }}
                                    />
                                    <div className={styles.roleLabel}>Mahasiswa</div>
                                </label>
                                <label className={styles.roleOption}>
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="TEACHER" 
                                        checked={userType === 'TEACHER'}
                                        onChange={() => { setUserType('TEACHER'); setError(null); form.reset() }}
                                    />
                                    <div className={styles.roleLabel}>Dosen</div>
                                </label>
                                <label className={styles.roleOption}>
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="ADMIN" 
                                        checked={userType === 'ADMIN'}
                                        onChange={() => { setUserType('ADMIN'); setError(null); form.reset() }}
                                    />
                                    <div className={styles.roleLabel}>Admin</div>
                                </label>
                            </div>

                            {/* Tab Navigation */}
                            <div className={styles.tabNav}>
                                <button 
                                    className={`${styles.tabButton} ${styles.tabActive}`}
                                >
                                    Masuk
                                </button>
                                <button 
                                    className={styles.tabButton}
                                    onClick={() => navigate('/register')}
                                >
                                    Daftar
                                </button>
                            </div>

                            {error && (
                                <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md" variant="light" radius="md">
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel}>{getIdentifierLabel()}</label>
                                    <TextInput
                                        placeholder={getIdentifierPlaceholder()}
                                        {...form.getInputProps('identifier')}
                                        radius="xl"
                                        size="md"
                                        styles={{
                                            input: {
                                                background: '#1e293b',
                                                border: '1px solid #334155',
                                                color: 'white',
                                                '&::placeholder': {
                                                    color: '#64748b',
                                                },
                                                '&:focus': {
                                                    borderColor: '#3b82f6',
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <div className={styles.labelRow}>
                                        <label className={styles.inputLabel}>Kata Sandi</label>
                                        <a href="#" className={styles.forgotLink}>Lupa kata sandi?</a>
                                    </div>
                                    <PasswordInput
                                        placeholder="Masukkan kata sandi"
                                        {...form.getInputProps('password')}
                                        radius="xl"
                                        size="md"
                                        styles={{
                                            input: {
                                                background: '#1e293b',
                                                border: '1px solid #334155',
                                                color: 'white',
                                                '&::placeholder': {
                                                    color: '#64748b',
                                                },
                                                '&:focus': {
                                                    borderColor: '#3b82f6',
                                                },
                                            },
                                            innerInput: {
                                                color: 'white',
                                            },
                                        }}
                                    />
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    Masuk
                                </button>
                            </form>

                            <div className={styles.divider}>
                                <span>atau</span>
                            </div>

                            <div className={styles.socialButtons}>
                                <button className={styles.socialBtn}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Google
                                </button>
                                <button className={styles.socialBtn}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                    </svg>
                                    GitHub
                                </button>
                            </div>

                            <p className={styles.registerText}>
                                Belum punya akun?
                                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register') }} className={styles.registerLink}>
                                    Daftar sekarang
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={styles.footer}>
                        © 2024 Portal Akademik Inc. <a href="#">Privasi</a> • <a href="#">Syarat & Ketentuan</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
