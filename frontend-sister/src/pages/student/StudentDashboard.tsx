import { useAuth } from '../../context'
import { useEffect, useState } from 'react'
import { enrollmentService } from '../../services'
import type { UserWithStudent, Schedule, Enrollment } from '../../types'
import { Loader, Text } from '@mantine/core'
import styles from './StudentDashboard.module.css'

interface DashboardStats {
    totalSKS: number
    maxSKS: number
    enrolledCourses: number
    todaySchedule: Schedule[]
    upcomingDeadlines: { title: string; dueDate: string; priority: 'high' | 'medium' }[]
    ipk: number
}

export function StudentDashboard() {
    const { user } = useAuth()
    const studentUser = user as UserWithStudent
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        try {
            setLoading(true)
            
            // Fetch enrollments for the student
            const enrollmentsRes = studentUser?.student?.id 
                ? await enrollmentService.getByStudentId(studentUser.student.id)
                : { data: [] }

            const enrollmentsData: Enrollment[] = enrollmentsRes.data || []
            
            // Extract schedules from enrollments
            const schedulesData: Schedule[] = enrollmentsData
                .map((e: any) => e.schedule)
                .filter(Boolean)

            // Get today's day
            const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
            const today = days[new Date().getDay()]

            // Filter today's schedule
            const todaySchedule = schedulesData.filter((s: Schedule) => s.day === today)

            // Calculate total SKS
            const totalSKS = schedulesData.reduce((sum: number, s: Schedule) => sum + (s.course?.sks || 0), 0)

            // Calculate IPK (mock calculation based on grades)
            const gradesWithValue = enrollmentsData.filter((e: Enrollment) => e.grade > 0)
            const ipk = gradesWithValue.length > 0 
                ? gradesWithValue.reduce((sum: number, e: Enrollment) => sum + e.grade, 0) / gradesWithValue.length / 25
                : 0

            setStats({
                totalSKS,
                maxSKS: 24,
                enrolledCourses: schedulesData.length,
                todaySchedule,
                upcomingDeadlines: [
                    { title: 'Tugas Algoritma', dueDate: 'Besok', priority: 'high' },
                    { title: 'Quiz Basis Data', dueDate: '3 Hari Lagi', priority: 'medium' },
                ],
                ipk: Math.min(ipk, 4.0)
            })
        } catch (error) {
            console.error('Error loading dashboard:', error)
            // Set default stats on error
            setStats({
                totalSKS: 0,
                maxSKS: 24,
                enrolledCourses: 0,
                todaySchedule: [],
                upcomingDeadlines: [],
                ipk: 0
            })
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className={styles.dashboardWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Loader color="blue" size="lg" />
            </div>
        )
    }

    const getSemesterText = () => {
        // Calculate semester based on enrollment or default
        return 'Semester 5'
    }

    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.container}>
                {/* Profile Header */}
                <div className={styles.profileHeader}>
                    <div className={styles.profileInfo}>
                        <div className={styles.avatarWrapper}>
                            <div className={styles.avatar} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontSize: '2rem',
                                fontWeight: 700,
                                color: '#3b82f6'
                            }}>
                                {studentUser?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className={styles.avatarBadge}></div>
                        </div>
                        <div className={styles.profileText}>
                            <h1 className={styles.greeting}>Halo, {studentUser?.name?.split(' ')[0]}! 👋</h1>
                            <div className={styles.profileMeta}>
                                <span className={styles.semesterBadge}>{getSemesterText()}</span>
                                <span className={styles.programStudi}>{studentUser?.student?.programStudi}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.profileActions}>
                        <button className={styles.primaryBtn}>
                            <span className="material-symbols-outlined">school</span>
                            Lihat KRS
                        </button>
                        <button className={styles.secondaryBtn}>
                            <span className="material-symbols-outlined">calendar_month</span>
                            Jadwal
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={`${styles.statGlow}`}></div>
                        <div className={styles.statContent}>
                            <div className={styles.statHeader}>
                                <p className={styles.statLabel}>Total SKS</p>
                            </div>
                            <div className={styles.statValueRow}>
                                <h2 className={styles.statValue}>{stats?.totalSKS || 0}</h2>
                                <span className={styles.statMax}>/ {stats?.maxSKS || 24}</span>
                            </div>
                            <p className={styles.statNote}>Semester ini</p>
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill} 
                                    style={{ width: `${((stats?.totalSKS || 0) / (stats?.maxSKS || 24)) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statGlow} ${styles.cyanGlow}`}></div>
                        <div className={styles.statContent}>
                            <div className={styles.statHeader}>
                                <p className={styles.statLabel}>IPK</p>
                            </div>
                            <h2 className={styles.statValue}>{(stats?.ipk || 0).toFixed(2)}</h2>
                            <p className={styles.statChange}>Cumlaude Target: 3.50</p>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statGlow} ${styles.indigoGlow}`}></div>
                        <div className={styles.statContent}>
                            <div className={styles.statHeader}>
                                <p className={styles.statLabel}>Mata Kuliah</p>
                            </div>
                            <h2 className={styles.statValue}>{stats?.enrolledCourses || 0}</h2>
                            <p className={styles.statNote}>Terdaftar semester ini</p>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className={styles.mainGrid}>
                    {/* Left Column - Chart & Deadlines */}
                    <div className={styles.leftColumn}>
                        {/* Upcoming Deadlines */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.cardTitle}>Deadline Mendatang</h3>
                                    <p className={styles.cardSubtitle}>Tugas yang harus diselesaikan</p>
                                </div>
                                <a href="#" className={styles.viewAllLink}>Lihat Semua</a>
                            </div>
                            <div className={styles.deadlineList}>
                                {stats?.upcomingDeadlines?.length ? (
                                    stats.upcomingDeadlines.map((deadline, index) => (
                                        <div key={index} className={styles.deadlineItem}>
                                            <div className={styles.deadlineCheckbox}>
                                                <div className={styles.checkboxInner}></div>
                                            </div>
                                            <div className={styles.deadlineContent}>
                                                <h4 className={styles.deadlineTitle}>{deadline.title}</h4>
                                                <p className={styles.deadlineDue}>{deadline.dueDate}</p>
                                            </div>
                                            <span className={`${styles.priorityBadge} ${deadline.priority === 'high' ? styles.highPriority : styles.mediumPriority}`}>
                                                {deadline.priority === 'high' ? 'Urgent' : 'Medium'}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <Text c="dimmed" ta="center" py="xl">Tidak ada deadline mendatang</Text>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Today's Schedule */}
                    <div className={styles.rightColumn}>
                        <div className={styles.scheduleCard}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.cardTitle}>📅 Jadwal Hari Ini</h3>
                                    <p className={styles.cardSubtitle}>
                                        {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.timeline}>
                                {stats?.todaySchedule?.length ? (
                                    stats.todaySchedule.map((schedule, index) => (
                                        <div key={schedule.id} className={styles.timelineItem}>
                                            <div className={styles.timelineMarker}>
                                                <div className={`${styles.markerIcon} ${index === 0 ? styles.activeMarker : ''}`}>
                                                    <span className="material-symbols-outlined">school</span>
                                                </div>
                                                {index < stats.todaySchedule.length - 1 && <div className={styles.markerLine}></div>}
                                            </div>
                                            <div className={styles.timelineContent}>
                                                <div className={`${styles.scheduleItem} ${index === 0 ? styles.activeSchedule : ''}`}>
                                                    <h4 className={styles.scheduleName}>{schedule.course?.name}</h4>
                                                    <div className={styles.scheduleTime}>
                                                        <span className="material-symbols-outlined">schedule</span>
                                                        {schedule.time}
                                                    </div>
                                                    <div className={styles.scheduleRoom}>
                                                        <span className="material-symbols-outlined">location_on</span>
                                                        {schedule.room}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <Text c="dimmed" ta="center" py="xl">Tidak ada jadwal hari ini 🎉</Text>
                                )}
                            </div>
                            <button className={styles.calendarBtn}>
                                <span className="material-symbols-outlined">calendar_month</span>
                                Lihat Kalender Lengkap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
