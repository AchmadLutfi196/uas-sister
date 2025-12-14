import { useEffect, useState } from 'react'
import { Loader, Text, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { adminService } from '../../services'
import type { AdminUser } from '../../services/admin.service'
import styles from './UsersManagement.module.css'

type RoleFilter = 'ALL' | 'STUDENT' | 'TEACHER'

export function UsersManagement() {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL')
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
    const [opened, { open, close }] = useDisclosure(false)

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        filterUsers()
    }, [users, searchQuery, roleFilter])

    const loadUsers = async () => {
        try {
            setLoading(true)
            const response = await adminService.getUsers()
            setUsers(response.data || [])
        } catch (error) {
            console.error('Error loading users:', error)
        } finally {
            setLoading(false)
        }
    }

    const filterUsers = () => {
        let result = [...users]

        // Filter by role
        if (roleFilter !== 'ALL') {
            result = result.filter(user => user.role === roleFilter)
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(user =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.student?.nim?.toLowerCase().includes(query) ||
                user.teacher?.nip?.toLowerCase().includes(query)
            )
        }

        setFilteredUsers(result)
    }

    const handleViewUser = (user: AdminUser) => {
        setSelectedUser(user)
        open()
    }

    const stats = {
        total: users.length,
        students: users.filter(u => u.role === 'STUDENT').length,
        teachers: users.filter(u => u.role === 'TEACHER').length,
        active: users.length, // Assuming all are active
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h1 className={styles.pageTitle}>Manajemen Pengguna</h1>
                        <p className={styles.pageSubtitle}>Kelola semua pengguna sistem</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button className={styles.addBtn}>
                            <span className="material-symbols-outlined">person_add</span>
                            Tambah Pengguna
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Total Pengguna</p>
                            <h2 className={styles.statValue}>{stats.total}</h2>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.blueIcon}`}>
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Mahasiswa</p>
                            <h2 className={styles.statValue}>{stats.students}</h2>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.greenIcon}`}>
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Dosen</p>
                            <h2 className={styles.statValue}>{stats.teachers}</h2>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.purpleIcon}`}>
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Aktif</p>
                            <h2 className={styles.statValue}>{stats.active}</h2>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className={styles.tableSection}>
                    <div className={styles.tableCard}>
                        <div className={styles.filterBar}>
                            <div className={styles.searchWrapper}>
                                <span className="material-symbols-outlined">search</span>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Cari berdasarkan nama, email, NIM, atau NIP..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className={styles.filterTabs}>
                                <button
                                    className={`${styles.filterTab} ${roleFilter === 'ALL' ? styles.filterActive : ''}`}
                                    onClick={() => setRoleFilter('ALL')}
                                >
                                    Semua
                                </button>
                                <button
                                    className={`${styles.filterTab} ${roleFilter === 'STUDENT' ? styles.filterActive : ''}`}
                                    onClick={() => setRoleFilter('STUDENT')}
                                >
                                    Mahasiswa
                                </button>
                                <button
                                    className={`${styles.filterTab} ${roleFilter === 'TEACHER' ? styles.filterActive : ''}`}
                                    onClick={() => setRoleFilter('TEACHER')}
                                >
                                    Dosen
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.tableLoader}>
                                <Loader color="blue" size="lg" />
                            </div>
                        ) : (
                            <div className={styles.tableWrapper}>
                                {filteredUsers.length > 0 ? (
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Pengguna</th>
                                                <th>ID</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.map((user) => (
                                                <tr key={user.id}>
                                                    <td>
                                                        <div className={styles.userCell}>
                                                            <div className={`${styles.userAvatar} ${user.role === 'STUDENT' ? styles.blueAvatar : styles.greenAvatar}`}>
                                                                {user.name?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className={styles.userName}>{user.name}</p>
                                                                <p className={styles.userEmail}>{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={styles.idCell}>
                                                        {user.role === 'STUDENT' ? user.student?.nim : user.teacher?.nip}
                                                    </td>
                                                    <td>
                                                        <span className={`${styles.roleBadge} ${user.role === 'STUDENT' ? styles.studentBadge : styles.teacherBadge}`}>
                                                            {user.role === 'STUDENT' ? 'Mahasiswa' : 'Dosen'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`${styles.statusBadge} ${styles.activeBadge}`}>
                                                            <span className={styles.statusDot}></span>
                                                            Aktif
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.actionBtns}>
                                                            <button
                                                                className={styles.actionBtn}
                                                                onClick={() => handleViewUser(user)}
                                                            >
                                                                <span className="material-symbols-outlined">visibility</span>
                                                            </button>
                                                            <button className={styles.actionBtn}>
                                                                <span className="material-symbols-outlined">edit</span>
                                                            </button>
                                                            <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                                                                <span className="material-symbols-outlined">delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className={styles.emptyState}>
                                        <span className="material-symbols-outlined">search_off</span>
                                        <Text>Tidak ada pengguna ditemukan</Text>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Pagination */}
                        <div className={styles.pagination}>
                            <p className={styles.paginationInfo}>
                                Menampilkan {filteredUsers.length} dari {users.length} pengguna
                            </p>
                            <div className={styles.paginationBtns}>
                                <button className={styles.paginationBtn} disabled>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className={`${styles.paginationBtn} ${styles.paginationActive}`}>1</button>
                                <button className={styles.paginationBtn}>2</button>
                                <button className={styles.paginationBtn}>3</button>
                                <button className={styles.paginationBtn}>
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Detail Modal */}
            <Modal
                opened={opened}
                onClose={close}
                title={<span className={styles.modalTitle}>Detail Pengguna</span>}
                centered
                classNames={{ content: styles.modalContent }}
            >
                {selectedUser && (
                    <div className={styles.detailContent}>
                        <div className={styles.detailHeader}>
                            <div className={`${styles.detailAvatar} ${selectedUser.role === 'STUDENT' ? styles.blueAvatar : styles.greenAvatar}`}>
                                {selectedUser.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className={styles.detailName}>{selectedUser.name}</h3>
                                <span className={`${styles.roleBadge} ${selectedUser.role === 'STUDENT' ? styles.studentBadge : styles.teacherBadge}`}>
                                    {selectedUser.role === 'STUDENT' ? 'Mahasiswa' : 'Dosen'}
                                </span>
                            </div>
                        </div>

                        <div className={styles.detailInfo}>
                            <div className={styles.detailRow}>
                                <span className="material-symbols-outlined">mail</span>
                                <div>
                                    <p className={styles.detailLabel}>Email</p>
                                    <p className={styles.detailValue}>{selectedUser.email}</p>
                                </div>
                            </div>
                            <div className={styles.detailRow}>
                                <span className="material-symbols-outlined">badge</span>
                                <div>
                                    <p className={styles.detailLabel}>{selectedUser.role === 'STUDENT' ? 'NIM' : 'NIP'}</p>
                                    <p className={styles.detailValue}>
                                        {selectedUser.role === 'STUDENT' ? selectedUser.student?.nim : selectedUser.teacher?.nip}
                                    </p>
                                </div>
                            </div>
                            {selectedUser.role === 'STUDENT' && selectedUser.student?.programStudi && (
                                <div className={styles.detailRow}>
                                    <span className="material-symbols-outlined">school</span>
                                    <div>
                                        <p className={styles.detailLabel}>Program Studi</p>
                                        <p className={styles.detailValue}>{selectedUser.student.programStudi}</p>
                                    </div>
                                </div>
                            )}
                            {selectedUser.role === 'TEACHER' && selectedUser.teacher?.keahlian && (
                                <div className={styles.detailRow}>
                                    <span className="material-symbols-outlined">psychology</span>
                                    <div>
                                        <p className={styles.detailLabel}>Keahlian</p>
                                        <p className={styles.detailValue}>{selectedUser.teacher.keahlian}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.detailActions}>
                            <button className={styles.detailBtn} onClick={close}>
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}
