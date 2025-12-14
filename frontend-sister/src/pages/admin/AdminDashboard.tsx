import { useEffect, useState } from 'react'
import { Loader, Text } from '@mantine/core'
import { adminService } from '../../services'
import type { AdminUser } from '../../services/admin.service'
import styles from './AdminDashboard.module.css'

interface DashboardStats {
    totalStudents: number
    totalTeachers: number
    totalCourses: number
    totalEnrollments: number
}

export function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalStudents: 0,
        totalTeachers: 0,
        totalCourses: 0,
        totalEnrollments: 0,
    })
    const [recentUsers, setRecentUsers] = useState<AdminUser[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        try {
            setLoading(true)
            
            // Try to fetch users for stats
            const usersRes = await adminService.getUsers().catch(() => ({ data: [] }))
            const allUsersData = usersRes.data || []

            const students = allUsersData.filter((u: AdminUser) => u.role === 'STUDENT')
            const teachers = allUsersData.filter((u: AdminUser) => u.role === 'TEACHER')

            setStats({
                totalStudents: students.length,
                totalTeachers: teachers.length,
                totalCourses: 24, // Mock data
                totalEnrollments: 156, // Mock data
            })

            // Recent users (take first 5)
            setRecentUsers(allUsersData.slice(0, 5))
        } catch (error) {
            console.error('Error loading dashboard:', error)
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

    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h1 className={styles.pageTitle}>Dashboard Admin</h1>
                        <p className={styles.pageSubtitle}>Ringkasan data sistem akademik</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button className={styles.filterBtn}>
                            <span className="material-symbols-outlined">filter_list</span>
                            Filter
                        </button>
                        <button className={styles.exportBtn}>
                            <span className="material-symbols-outlined">download</span>
                            Export
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Total Mahasiswa</p>
                            <h2 className={styles.statValue}>{stats.totalStudents}</h2>
                            <div className={styles.statChange}>
                                <span className={`material-symbols-outlined ${styles.changeUp}`}>trending_up</span>
                                <span className={styles.changeUp}>+12%</span>
                                <span className={styles.changeText}>dari bulan lalu</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.greenIcon}`}>
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Total Dosen</p>
                            <h2 className={styles.statValue}>{stats.totalTeachers}</h2>
                            <div className={styles.statChange}>
                                <span className={`material-symbols-outlined ${styles.changeUp}`}>trending_up</span>
                                <span className={styles.changeUp}>+5%</span>
                                <span className={styles.changeText}>dari bulan lalu</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.purpleIcon}`}>
                            <span className="material-symbols-outlined">menu_book</span>
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Mata Kuliah</p>
                            <h2 className={styles.statValue}>{stats.totalCourses}</h2>
                            <div className={styles.statChange}>
                                <span className={`material-symbols-outlined ${styles.changeUp}`}>trending_up</span>
                                <span className={styles.changeUp}>+3%</span>
                                <span className={styles.changeText}>dari bulan lalu</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.orangeIcon}`}>
                            <span className="material-symbols-outlined">assignment</span>
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Enrollments</p>
                            <h2 className={styles.statValue}>{stats.totalEnrollments}</h2>
                            <div className={styles.statChange}>
                                <span className={`material-symbols-outlined ${styles.changeUp}`}>trending_up</span>
                                <span className={styles.changeUp}>+18%</span>
                                <span className={styles.changeText}>dari bulan lalu</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className={styles.analyticsSection}>
                    <div className={styles.chartCard}>
                        <div className={styles.cardHeader}>
                            <div>
                                <h3 className={styles.cardTitle}>Statistik Pengguna</h3>
                                <p className={styles.cardSubtitle}>Perbandingan pengguna per bulan</p>
                            </div>
                            <div className={styles.chartLegend}>
                                <div className={styles.legendItem}>
                                    <span className={styles.legendDot}></span>
                                    <span>Mahasiswa</span>
                                </div>
                                <div className={styles.legendItem}>
                                    <span className={`${styles.legendDot} ${styles.legendCyan}`}></span>
                                    <span>Dosen</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.chartContainer}>
                            <div className={styles.chart} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                background: 'rgba(15, 23, 42, 0.5)',
                                borderRadius: '0.5rem'
                            }}>
                                <Text c="dimmed">Chart visualization akan ditampilkan di sini</Text>
                            </div>
                        </div>
                        <div className={styles.chartLabels}>
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                        </div>
                    </div>
                </div>

                {/* Recent Users Table */}
                <div className={styles.tableSection}>
                    <div className={styles.tableCard}>
                        <div className={styles.cardHeader}>
                            <div>
                                <h3 className={styles.cardTitle}>Pengguna Terbaru</h3>
                                <p className={styles.cardSubtitle}>Daftar pengguna yang baru terdaftar</p>
                            </div>
                            <a href="/admin/users" className={styles.viewAllLink}>
                                Lihat Semua
                                <span className="material-symbols-outlined">chevron_right</span>
                            </a>
                        </div>
                        <div className={styles.tableWrapper}>
                            {recentUsers.length > 0 ? (
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentUsers.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    <div className={styles.userCell}>
                                                        <div className={`${styles.userAvatar} ${user.role === 'STUDENT' ? styles.blueAvatar : styles.greenAvatar}`}>
                                                            {user.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span>{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className={styles.emailCell}>{user.email}</td>
                                                <td>
                                                    <span className={`${styles.roleBadge} ${user.role === 'STUDENT' ? styles.studentBadge : styles.teacherBadge}`}>
                                                        {user.role === 'STUDENT' ? 'Mahasiswa' : 'Dosen'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={styles.statusBadge}>
                                                        <span className={styles.statusDot}></span>
                                                        Aktif
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className={styles.actionBtn}>
                                                        <span className="material-symbols-outlined">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className={styles.emptyState}>
                                    <span className="material-symbols-outlined">group</span>
                                    <Text>Belum ada pengguna terdaftar</Text>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
