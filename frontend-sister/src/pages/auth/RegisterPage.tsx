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
    Select,
    SimpleGrid,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import Swal from 'sweetalert2'
import {
    IconUser,
    IconLock,
    IconId,
    IconMail,
    IconAlertCircle,
    IconCalendar,
    IconSchool,
    IconBuilding,
} from '@tabler/icons-react'
import { authService } from '../../services'
import type { Gender } from '../../types'
import styles from './LoginPage.module.css'

type RegisterType = 'STUDENT' | 'TEACHER'

export function RegisterPage() {
    const navigate = useNavigate()
    const [userType, setUserType] = useState<RegisterType>('STUDENT')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const studentForm = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            nim: '',
            tanggalLahir: null as Date | null,
            gender: '' as Gender | '',
            programStudi: '',
            fakultas: '',
            academicAdvisorId: 1,
        },
        validate: {
            name: (value) => (!value ? 'Nama wajib diisi' : null),
            email: (value) => (!value ? 'Email wajib diisi' : !/^\S+@\S+$/.test(value) ? 'Email tidak valid' : null),
            password: (value) => (!value ? 'Password wajib diisi' : value.length < 6 ? 'Password minimal 6 karakter' : null),
            nim: (value) => (!value ? 'NIM wajib diisi' : null),
            tanggalLahir: (value) => (!value ? 'Tanggal lahir wajib diisi' : null),
            gender: (value) => (!value ? 'Jenis kelamin wajib dipilih' : null),
            programStudi: (value) => (!value ? 'Program studi wajib diisi' : null),
            fakultas: (value) => (!value ? 'Fakultas wajib diisi' : null),
        },
    })

    const teacherForm = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            nip: '',
            tanggalLahir: null as Date | null,
            gender: '' as Gender | '',
            fakultas: '',
        },
        validate: {
            name: (value) => (!value ? 'Nama wajib diisi' : null),
            email: (value) => (!value ? 'Email wajib diisi' : !/^\S+@\S+$/.test(value) ? 'Email tidak valid' : null),
            password: (value) => (!value ? 'Password wajib diisi' : value.length < 6 ? 'Password minimal 6 karakter' : null),
            nip: (value) => (!value ? 'NIP wajib diisi' : null),
            fakultas: (value) => (!value ? 'Fakultas wajib diisi' : null),
        },
    })

    const handleStudentSubmit = async (values: typeof studentForm.values) => {
        setError(null)
        setIsLoading(true)
        try {
            // Format tanggal lahir
            let formattedDate = ''
            if (values.tanggalLahir) {
                if (values.tanggalLahir instanceof Date) {
                    formattedDate = values.tanggalLahir.toISOString().split('T')[0]
                } else {
                    formattedDate = String(values.tanggalLahir).split('T')[0]
                }
            }

            await authService.registerStudent({
                ...values,
                tanggalLahir: formattedDate,
                gender: values.gender as Gender,
            })

            await Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil!',
                text: 'Akun mahasiswa berhasil dibuat. Silakan login dengan akun baru Anda.',
                confirmButtonText: 'Login Sekarang',
                confirmButtonColor: '#8b5cf6',
            })

            navigate('/login')
        } catch (err: any) {
            const message = err.response?.data?.errors || err.response?.data?.message || err.message || 'Registrasi gagal. Silakan coba lagi.'
            setError(message)

            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: message,
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#8b5cf6',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleTeacherSubmit = async (values: typeof teacherForm.values) => {
        setError(null)
        setIsLoading(true)
        try {
            // Format tanggal lahir
            let formattedDate: string | undefined = undefined
            if (values.tanggalLahir) {
                if (values.tanggalLahir instanceof Date) {
                    formattedDate = values.tanggalLahir.toISOString().split('T')[0]
                } else {
                    formattedDate = String(values.tanggalLahir).split('T')[0]
                }
            }

            await authService.registerTeacher({
                ...values,
                tanggalLahir: formattedDate,
                gender: values.gender as Gender | undefined,
            })

            await Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil!',
                text: 'Akun dosen berhasil dibuat. Silakan login dengan akun baru Anda.',
                confirmButtonText: 'Login Sekarang',
                confirmButtonColor: '#8b5cf6',
            })

            navigate('/login')
        } catch (err: any) {
            const message = err.response?.data?.errors || err.response?.data?.message || err.message || 'Registrasi gagal. Silakan coba lagi.'
            setError(message)

            Swal.fire({
                icon: 'error',
                title: 'Registrasi Gagal',
                text: message,
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#8b5cf6',
            })
        } finally {
            setIsLoading(false)
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
                            src="/register.svg"
                            alt="Register Illustration"
                            className={styles.illustrationImage}
                        />
                        <h2 className={styles.illustrationTitle}>Bergabung Sekarang</h2>
                        <p className={styles.illustrationSubtitle}>
                            Daftarkan diri Anda untuk mengakses layanan
                            akademik lengkap dalam satu platform
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.formSide}>
                    <div className={styles.formContainer} style={{ maxWidth: '480px' }}>
                        <div className={styles.logoSection}>
                            <h1 className={styles.logoTitle}>SISTER</h1>
                            <p className={styles.logoSubtitle}>Sistem Informasi Akademik</p>
                        </div>

                        <div className={styles.formCard}>
                            <LoadingOverlay visible={isLoading} overlayProps={{ blur: 2 }} />

                            <h2 className={styles.formTitle}>Daftar Akun Baru</h2>

                            <SegmentedControl
                                fullWidth
                                value={userType}
                                onChange={(value) => {
                                    setUserType(value as RegisterType)
                                    setError(null)
                                }}
                                data={[
                                    { label: 'Mahasiswa', value: 'STUDENT' },
                                    { label: 'Dosen', value: 'TEACHER' },
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

                            {userType === 'STUDENT' ? (
                                <form onSubmit={studentForm.onSubmit(handleStudentSubmit)}>
                                    <Stack gap="sm">
                                        <TextInput
                                            label="Nama Lengkap"
                                            placeholder="Masukkan nama lengkap"
                                            leftSection={<IconUser size={18} />}
                                            {...studentForm.getInputProps('name')}
                                            radius="xl"
                                            styles={inputStyles}
                                        />

                                        <SimpleGrid cols={2}>
                                            <TextInput
                                                label="NIM"
                                                placeholder="Masukkan NIM"
                                                leftSection={<IconId size={18} />}
                                                {...studentForm.getInputProps('nim')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                            <TextInput
                                                label="Email"
                                                placeholder="email@example.com"
                                                leftSection={<IconMail size={18} />}
                                                {...studentForm.getInputProps('email')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                        </SimpleGrid>

                                        <SimpleGrid cols={2}>
                                            <DateInput
                                                label="Tanggal Lahir"
                                                placeholder="Pilih tanggal"
                                                leftSection={<IconCalendar size={18} />}
                                                {...studentForm.getInputProps('tanggalLahir')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                            <Select
                                                label="Jenis Kelamin"
                                                placeholder="Pilih"
                                                data={[
                                                    { value: 'MAN', label: 'Laki-laki' },
                                                    { value: 'WOMAN', label: 'Perempuan' },
                                                ]}
                                                {...studentForm.getInputProps('gender')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                        </SimpleGrid>

                                        <SimpleGrid cols={2}>
                                            <TextInput
                                                label="Program Studi"
                                                placeholder="Teknik Informatika"
                                                leftSection={<IconSchool size={18} />}
                                                {...studentForm.getInputProps('programStudi')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                            <TextInput
                                                label="Fakultas"
                                                placeholder="Fakultas Teknik"
                                                leftSection={<IconBuilding size={18} />}
                                                {...studentForm.getInputProps('fakultas')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                        </SimpleGrid>

                                        <PasswordInput
                                            label="Password"
                                            placeholder="Minimal 6 karakter"
                                            leftSection={<IconLock size={18} />}
                                            {...studentForm.getInputProps('password')}
                                            radius="xl"
                                            styles={inputStyles}
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            size="md"
                                            radius="xl"
                                            className={styles.submitButton}
                                            mt="xs"
                                        >
                                            Daftar sebagai Mahasiswa
                                        </Button>
                                    </Stack>
                                </form>
                            ) : (
                                <form onSubmit={teacherForm.onSubmit(handleTeacherSubmit)}>
                                    <Stack gap="sm">
                                        <TextInput
                                            label="Nama Lengkap"
                                            placeholder="Masukkan nama lengkap"
                                            leftSection={<IconUser size={18} />}
                                            {...teacherForm.getInputProps('name')}
                                            radius="xl"
                                            styles={inputStyles}
                                        />

                                        <SimpleGrid cols={2}>
                                            <TextInput
                                                label="NIP"
                                                placeholder="Masukkan NIP"
                                                leftSection={<IconId size={18} />}
                                                {...teacherForm.getInputProps('nip')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                            <TextInput
                                                label="Email"
                                                placeholder="email@example.com"
                                                leftSection={<IconMail size={18} />}
                                                {...teacherForm.getInputProps('email')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                        </SimpleGrid>

                                        <SimpleGrid cols={2}>
                                            <DateInput
                                                label="Tanggal Lahir"
                                                placeholder="Pilih tanggal"
                                                leftSection={<IconCalendar size={18} />}
                                                {...teacherForm.getInputProps('tanggalLahir')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                            <Select
                                                label="Jenis Kelamin"
                                                placeholder="Pilih"
                                                data={[
                                                    { value: 'MAN', label: 'Laki-laki' },
                                                    { value: 'WOMAN', label: 'Perempuan' },
                                                ]}
                                                {...teacherForm.getInputProps('gender')}
                                                radius="xl"
                                                styles={inputStyles}
                                            />
                                        </SimpleGrid>

                                        <TextInput
                                            label="Fakultas"
                                            placeholder="Fakultas Teknik"
                                            leftSection={<IconBuilding size={18} />}
                                            {...teacherForm.getInputProps('fakultas')}
                                            radius="xl"
                                            styles={inputStyles}
                                        />

                                        <PasswordInput
                                            label="Password"
                                            placeholder="Minimal 6 karakter"
                                            leftSection={<IconLock size={18} />}
                                            {...teacherForm.getInputProps('password')}
                                            radius="xl"
                                            styles={inputStyles}
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            size="md"
                                            radius="xl"
                                            className={styles.submitButton}
                                            mt="xs"
                                        >
                                            Daftar sebagai Dosen
                                        </Button>
                                    </Stack>
                                </form>
                            )}

                            <Text ta="center" mt="lg" size="sm" c="dimmed">
                                Sudah punya akun?{' '}
                                <Anchor
                                    component="button"
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    c="violet"
                                    fw={600}
                                >
                                    Masuk sekarang
                                </Anchor>
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}
