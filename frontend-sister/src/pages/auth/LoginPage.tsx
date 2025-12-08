import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Text,
    TextInput,
    PasswordInput,
    Button,
    Stack,
    SegmentedControl,
    Box,
    Anchor,
    LoadingOverlay,
    Alert,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Swal from 'sweetalert2'
import {
    IconLock,
    IconId,
    IconMail,
    IconAlertCircle,
} from '@tabler/icons-react'
import { useAuth } from '../../context'
import type { Role } from '../../types'
import styles from './LoginPage.module.css'

export function LoginPage() {
    const navigate = useNavigate()
    const { login, isLoading } = useAuth()
    const [userType, setUserType] = useState<Role>('STUDENT')
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
        try {
            await login({
                type: userType,
                identifier: values.identifier,
                password: values.password,
            })

            await Swal.fire({
                icon: 'success',
                title: 'Login Berhasil!',
                text: 'Selamat datang kembali!',
                timer: 1500,
                showConfirmButton: false,
            })

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
            const message = err.response?.data?.errors || err.response?.data?.message || err.message || 'Login gagal. Silakan cek kredensial Anda.'
            setError(message)

            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: message,
                confirmButtonText: 'Coba Lagi',
                confirmButtonColor: '#8b5cf6',
            })
        }
    }

    const getIdentifierLabel = () => {
        switch (userType) {
            case 'STUDENT': return 'NIM / Email'
            case 'TEACHER': return 'NIP'
            case 'ADMIN': return 'Email'
        }
    }

    const getIdentifierIcon = () => {
        switch (userType) {
            case 'STUDENT':
            case 'TEACHER': return <IconId size={18} />
            case 'ADMIN': return <IconMail size={18} />
        }
    }

    const getIdentifierPlaceholder = () => {
        switch (userType) {
            case 'STUDENT': return 'Masukkan NIM atau Email'
            case 'TEACHER': return 'Masukkan NIP Anda'
            case 'ADMIN': return 'Masukkan email Anda'
        }
    }

    // Theme-aware input styles
    const inputStyles = {
        input: {
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
            transition: 'all 0.2s ease',
            '&::placeholder': {
                color: 'var(--text-muted)',
            },
            '&:focus': {
                borderColor: '#8b5cf6',
                boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)',
            },
        },
        label: {
            color: 'var(--text-primary)',
            fontWeight: 500,
        },
    }

    return (
        <Box className={styles.pageWrapper}>
            <div className={styles.splitContainer}>
                {/* Left Side - Illustration */}
                <div className={styles.illustrationSide}>
                    <div className={styles.illustrationContent}>
                        <img
                            src="/Tablet login-amico.svg"
                            alt="Login Illustration"
                            className={styles.illustrationImage}
                        />
                        <h2 className={styles.illustrationTitle}>Selamat Datang</h2>
                        <p className={styles.illustrationSubtitle}>
                            Sistem Informasi Akademik terintegrasi untuk
                            mengelola data akademik dengan mudah
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.formSide}>
                    <div className={styles.formContainer}>
                        <div className={styles.logoSection}>
                            <h1 className={styles.logoTitle}>SISTER</h1>
                            <p className={styles.logoSubtitle}>Sistem Informasi Akademik</p>
                        </div>

                        <div className={styles.formCard}>
                            <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />

                            <h2 className={styles.formTitle}>Masuk ke Akun</h2>

                            <SegmentedControl
                                fullWidth
                                value={userType}
                                onChange={(value) => {
                                    setUserType(value as Role)
                                    form.reset()
                                    setError(null)
                                }}
                                data={[
                                    { label: 'Mahasiswa', value: 'STUDENT' },
                                    { label: 'Dosen', value: 'TEACHER' },
                                    { label: 'Admin', value: 'ADMIN' },
                                ]}
                                mb="lg"
                                radius="xl"
                                styles={{
                                    root: {
                                        backgroundColor: 'var(--glass-bg)',
                                        border: '1px solid var(--border-color)',
                                    },
                                    label: {
                                        color: 'var(--text-primary)',
                                        fontWeight: 500,
                                        transition: 'color 0.2s ease',
                                    },
                                    indicator: {
                                        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                                        boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                                    },
                                }}
                            />

                            {error && (
                                <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md" variant="light" radius="md">
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <Stack gap="md">
                                    <TextInput
                                        label={getIdentifierLabel()}
                                        placeholder={getIdentifierPlaceholder()}
                                        leftSection={getIdentifierIcon()}
                                        {...form.getInputProps('identifier')}
                                        size="md"
                                        radius="xl"
                                        styles={inputStyles}
                                    />

                                    <PasswordInput
                                        label="Password"
                                        placeholder="Masukkan password"
                                        leftSection={<IconLock size={18} />}
                                        {...form.getInputProps('password')}
                                        size="md"
                                        radius="xl"
                                        styles={inputStyles}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="md"
                                        radius="xl"
                                        className={styles.submitButton}
                                        mt="sm"
                                    >
                                        Masuk
                                    </Button>
                                </Stack>
                            </form>

                            {userType !== 'ADMIN' && (
                                <Text ta="center" mt="lg" size="sm" c="dimmed">
                                    Belum punya akun?{' '}
                                    <Anchor
                                        component="button"
                                        type="button"
                                        onClick={() => navigate('/register')}
                                        c="violet"
                                        fw={600}
                                    >
                                        Daftar sekarang
                                    </Anchor>
                                </Text>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}
