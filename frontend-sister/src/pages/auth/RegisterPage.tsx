import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    TextInput,
    PasswordInput,
    LoadingOverlay,
    Alert,
    Select,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import Swal from 'sweetalert2'
import { IconAlertCircle } from '@tabler/icons-react'
import { authService } from '../../services'
import type { Gender } from '../../types'
import styles from './LoginPage.module.css'

type RegisterType = 'STUDENT' | 'TEACHER'

const inputStyles = {
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
}

const selectStyles = {
    input: {
        background: '#1e293b',
        border: '1px solid #334155',
        color: 'white',
    },
    dropdown: {
        background: '#1e293b',
        border: '1px solid #334155',
    },
    option: {
        color: 'white',
        '&[data-selected]': {
            background: '#3b82f6',
        },
        '&:hover': {
            background: '#334155',
        },
    },
}

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
                confirmButtonColor: '#3b82f6',
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
                confirmButtonColor: '#3b82f6',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleTeacherSubmit = async (values: typeof teacherForm.values) => {
        setError(null)
        setIsLoading(true)
        try {
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
                confirmButtonColor: '#3b82f6',
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
                confirmButtonColor: '#3b82f6',
            })
        } finally {
            setIsLoading(false)
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
                            <span>Pendaftaran Dibuka</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            Bergabung dengan <span className={styles.primaryText}>Komunitas Akademik</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Daftarkan diri Anda untuk mengakses layanan akademik lengkap dalam satu platform terpadu.
                        </p>
                        <div className={styles.socialProof}>
                            <div className={styles.avatarStack}>
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=4)' }}></div>
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=5)' }}></div>
                                <div className={styles.avatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=6)' }}></div>
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
                                <h2 className={styles.formTitle}>Buat Akun Baru</h2>
                                <p className={styles.formSubtitle}>Lengkapi data diri Anda untuk mendaftar.</p>
                            </div>

                            {/* Role Toggle */}
                            <div className={styles.roleToggle}>
                                <label className={styles.roleOption}>
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="STUDENT" 
                                        checked={userType === 'STUDENT'}
                                        onChange={() => { setUserType('STUDENT'); setError(null) }}
                                    />
                                    <div className={styles.roleLabel}>Mahasiswa</div>
                                </label>
                                <label className={styles.roleOption}>
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="TEACHER" 
                                        checked={userType === 'TEACHER'}
                                        onChange={() => { setUserType('TEACHER'); setError(null) }}
                                    />
                                    <div className={styles.roleLabel}>Dosen</div>
                                </label>
                            </div>

                            {/* Tab Navigation */}
                            <div className={styles.tabNav}>
                                <button 
                                    className={styles.tabButton}
                                    onClick={() => navigate('/login')}
                                >
                                    Masuk
                                </button>
                                <button 
                                    className={`${styles.tabButton} ${styles.tabActive}`}
                                >
                                    Daftar
                                </button>
                            </div>

                            {error && (
                                <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md" variant="light" radius="md">
                                    {error}
                                </Alert>
                            )}

                            {userType === 'STUDENT' ? (
                                <form onSubmit={studentForm.onSubmit(handleStudentSubmit)} className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Nama Lengkap</label>
                                        <TextInput
                                            placeholder="Masukkan nama lengkap"
                                            {...studentForm.getInputProps('name')}
                                            radius="xl"
                                            size="md"
                                            styles={inputStyles}
                                        />
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>NIM</label>
                                            <TextInput
                                                placeholder="12345678"
                                                {...studentForm.getInputProps('nim')}
                                                radius="xl"
                                                size="md"
                                                styles={inputStyles}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>Email</label>
                                            <TextInput
                                                placeholder="email@example.com"
                                                {...studentForm.getInputProps('email')}
                                                radius="xl"
                                                size="md"
                                                styles={inputStyles}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>Tanggal Lahir</label>
                                            <DateInput
                                                placeholder="Pilih tanggal"
                                                {...studentForm.getInputProps('tanggalLahir')}
                                                radius="xl"
                                                size="md"
                                                styles={inputStyles}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>Jenis Kelamin</label>
                                            <Select
                                                placeholder="Pilih"
                                                data={[
                                                    { value: 'MAN', label: 'Laki-laki' },
                                                    { value: 'WOMAN', label: 'Perempuan' },
                                                ]}
                                                {...studentForm.getInputProps('gender')}
                                                radius="xl"
                                                size="md"
                                                styles={selectStyles}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>Program Studi</label>
                                            <TextInput
                                                placeholder="Teknik Informatika"
                                                {...studentForm.getInputProps('programStudi')}
                                                radius="xl"
                                                size="md"
                                                styles={inputStyles}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>Fakultas</label>
                                            <TextInput
                                                placeholder="Fakultas Teknik"
                                                {...studentForm.getInputProps('fakultas')}
                                                radius="xl"
                                                size="md"
                                                styles={inputStyles}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Kata Sandi</label>
                                        <PasswordInput
                                            placeholder="Minimal 6 karakter"
                                            {...studentForm.getInputProps('password')}
                                            radius="xl"
                                            size="md"
                                            styles={{
                                                ...inputStyles,
                                                innerInput: {
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                    </div>

                                    <button type="submit" className={styles.submitButton}>
                                        Daftar sebagai Mahasiswa
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={teacherForm.onSubmit(handleTeacherSubmit)} className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Nama Lengkap</label>
                                        <TextInput
                                            placeholder="Masukkan nama lengkap"
                                            {...teacherForm.getInputProps('name')}
                                            radius="xl"
                                            size="md"
                                            styles={inputStyles}
                                        />
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>NIP</label>
                                            <TextInput
                                                placeholder="Masukkan NIP"
                                                {...teacherForm.getInputProps('nip')}
                                                radius="xl"
                                                size="md"
                                                styles={inputStyles}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>Email</label>
                                            <TextInput
                                                placeholder="email@example.com"
                                                {...teacherForm.getInputProps('email')}
                                                radius="xl"
                                                size="md"
                                                styles={inputStyles}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>Tanggal Lahir</label>
                                            <DateInput
                                                placeholder="Pilih tanggal"
                                                {...teacherForm.getInputProps('tanggalLahir')}
                                                radius="xl"
                                                size="md"
                                                styles={inputStyles}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.inputLabel}>Jenis Kelamin</label>
                                            <Select
                                                placeholder="Pilih"
                                                data={[
                                                    { value: 'MAN', label: 'Laki-laki' },
                                                    { value: 'WOMAN', label: 'Perempuan' },
                                                ]}
                                                {...teacherForm.getInputProps('gender')}
                                                radius="xl"
                                                size="md"
                                                styles={selectStyles}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Fakultas</label>
                                        <TextInput
                                            placeholder="Fakultas Teknik"
                                            {...teacherForm.getInputProps('fakultas')}
                                            radius="xl"
                                            size="md"
                                            styles={inputStyles}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Kata Sandi</label>
                                        <PasswordInput
                                            placeholder="Minimal 6 karakter"
                                            {...teacherForm.getInputProps('password')}
                                            radius="xl"
                                            size="md"
                                            styles={{
                                                ...inputStyles,
                                                innerInput: {
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                    </div>

                                    <button type="submit" className={styles.submitButton}>
                                        Daftar sebagai Dosen
                                    </button>
                                </form>
                            )}

                            <p className={styles.registerText}>
                                Sudah punya akun?
                                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login') }} className={styles.registerLink}>
                                    Masuk sekarang
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
