// User types
export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT'
export type Gender = 'MAN' | 'WOMAN'
export type StatusStudent = 'ACTIVE' | 'INACTIVE'
export type StatusPembayaran = 'PENDING' | 'SUCCESS' | 'FAILED'
export type StatusKehadiran = 'HADIR' | 'IZIN' | 'SAKIT' | 'ALPHA'
export type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY'
export type Semester = 'semester_1' | 'semester_2' | 'semester_3' | 'semester_4' | 'semester_5' | 'semester_6' | 'semester_7' | 'semester_8'

export interface User {
    id: number
    name: string
    email: string
    role: Role
    tanggalLahir?: string
    gender?: Gender
    telephone?: string
    createdAt: string
    updatedAt: string
    token: string | null
    recoveryToken: string | null
}

export interface Student {
    id: number
    userId: number
    nim: string
    statusStudent: StatusStudent
    programStudi: string
    academicAdvisorId: number
    fakultas: string
    createdAt: string
    updatedAt: string
}

export interface Teacher {
    id: number
    userId: number
    nip: string
    gelar: string | null
    keahlian: string | null
    fakultas: string
    createdAt: string
    updatedAt: string
}

export interface UserWithStudent extends User {
    student: Student
}

export interface UserWithTeacher extends User {
    teacher: Teacher
}

// Course types
export interface Course {
    id?: number
    name: string
    code: string
    sks: number
    semester: Semester
    programStudi: string
    fakultas: string
    teacherId?: number
    createdAt?: string
    updatedAt?: string
    schedule?: Schedule[]
    teacher?: TeacherWithUser
}

export interface TeacherWithUser {
    nip: string
    gelar: string
    keahlian: string
    user: User
}

// Schedule types
export interface Schedule {
    id: number
    courseId: number
    day: Day
    time: string
    room: string
    teacherId: number
    createdAt: string
    updatedAt: string
    course?: Course
    teacher?: TeacherWithUser
}

// Enrollment types
export interface Enrollment {
    studentId: number
    scheduleId: number
    grade: number
    createdAt: string
    updatedAt: string
    schedule?: Schedule
}

// Absensi types
export interface Absensi {
    studentId: number
    scheduleId: number
    statusKehadiran: StatusKehadiran
    pertemuan: number
    materi: string
    keterangan: string
}

// Pembayaran types
export interface Pembayaran {
    id: number
    studentId: number
    total: number
    jenisPembayaran: string
    tanggal: string
    statusPembayaran: StatusPembayaran
    semester?: Semester
    createdAt: string
    updatedAt: string
}

// Beasiswa types
export interface Beasiswa {
    id: number
    name: string
    mulai: string
    akhir: string
    link: string
}

// Berita types
export interface Berita {
    id: number
    judul: string
    konten: string
    gambar: string
}

// Alumni types
export interface Alumni {
    id: number
    studentId: number
    tanggalLulus: string
    pekerjaan: string | null
    perusahaan: string | null
    createdAt: string
    updatedAt: string
}

// KritikSaran types
export interface KritikSaran {
    id: number
    name: string
    email: string
    pesan: string
    createdAt: string
    updatedAt: string
}

// Announcement types
export interface Announcement {
    id: number
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

// Library types
export interface Library {
    id: number
    title: string
    author: string
    description: string
    file: string
    createdAt: string
    updatedAt: string
}

// API Response types
export interface ApiResponse<T> {
    status: number
    message: string
    data: T
}

// Auth types
export interface LoginCredentials {
    nim?: string
    nip?: string
    email?: string
    password: string
}

export interface RegisterStudentData {
    name: string
    email: string
    password: string
    nim: string
    tanggalLahir: string
    gender: Gender
    programStudi: string
    academicAdvisorId: number
    fakultas: string
}

export interface RegisterTeacherData {
    name: string
    email: string
    password: string
    nip: string
    tanggalLahir?: string
    gender?: Gender
    fakultas: string
}
