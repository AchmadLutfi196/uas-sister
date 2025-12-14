import { useAuth } from '../../context'
import { useEffect, useState } from 'react'
import { courseService, enrollmentService, scheduleService } from '../../services'
import type { UserWithStudent, Course, Schedule } from '../../types'
import { Loader, Text } from '@mantine/core'
import styles from './KRSPage.module.css'

interface CartItem {
    course: Course
    schedule: Schedule
}

export function KRSPage() {
    const { user } = useAuth()
    const studentUser = user as UserWithStudent
    const [courses, setCourses] = useState<Course[]>([])
    const [enrolledSchedules, setEnrolledSchedules] = useState<Schedule[]>([])
    const [cart, setCart] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSemester, setSelectedSemester] = useState('semester_5')

    const maxSKS = 24

    useEffect(() => {
        loadData()
    }, [selectedSemester])

    const loadData = async () => {
        try {
            setLoading(true)
            
            const [coursesRes, schedulesRes] = await Promise.all([
                courseService.getCourses(),
                scheduleService.getScheduleByStudent(studentUser?.student?.id)
            ])

            setCourses(coursesRes.data || [])
            setEnrolledSchedules(schedulesRes.data || [])
        } catch (error) {
            console.error('Error loading KRS data:', error)
        } finally {
            setLoading(false)
        }
    }

    const getCurrentSKS = () => {
        const enrolledSKS = enrolledSchedules.reduce((sum, s) => sum + (s.course?.sks || 0), 0)
        const cartSKS = cart.reduce((sum, item) => sum + (item.course.sks || 0), 0)
        return enrolledSKS + cartSKS
    }

    const isEnrolled = (courseId: number) => {
        return enrolledSchedules.some(s => s.course?.id === courseId)
    }

    const isInCart = (courseId: number) => {
        return cart.some(item => item.course.id === courseId)
    }

    const addToCart = (course: Course) => {
        if (isEnrolled(course.id!) || isInCart(course.id!)) return
        if (getCurrentSKS() + course.sks > maxSKS) {
            alert('SKS melebihi batas maksimum!')
            return
        }
        
        // Find a schedule for this course
        const schedule = course.schedule?.[0]
        if (schedule) {
            setCart([...cart, { course, schedule }])
        }
    }

    const removeFromCart = (courseId: number) => {
        setCart(cart.filter(item => item.course.id !== courseId))
    }

    const handleSubmit = async () => {
        if (cart.length === 0) return

        try {
            setSubmitting(true)
            
            // Enroll in each selected schedule
            for (const item of cart) {
                await enrollmentService.enrollCourse({
                    studentId: studentUser.student.id,
                    scheduleId: item.schedule.id
                })
            }

            // Reload data
            await loadData()
            setCart([])
            alert('KRS berhasil disimpan!')
        } catch (error) {
            console.error('Error submitting KRS:', error)
            alert('Gagal menyimpan KRS')
        } finally {
            setSubmitting(false)
        }
    }

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className={styles.pageWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Loader color="blue" size="lg" />
            </div>
        )
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.pageTitle}>Kartu Rencana Studi (KRS)</h1>
                        <p className={styles.pageSubtitle}>Pilih mata kuliah untuk semester ini</p>
                    </div>
                    <div className={styles.headerActions}>
                        <select 
                            className={styles.semesterSelect}
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                        >
                            <option value="semester_1">Semester 1</option>
                            <option value="semester_2">Semester 2</option>
                            <option value="semester_3">Semester 3</option>
                            <option value="semester_4">Semester 4</option>
                            <option value="semester_5">Semester 5</option>
                            <option value="semester_6">Semester 6</option>
                            <option value="semester_7">Semester 7</option>
                            <option value="semester_8">Semester 8</option>
                        </select>
                        <button className={styles.downloadBtn}>
                            <span className="material-symbols-outlined">download</span>
                            Download KRS
                        </button>
                    </div>
                </div>

                {/* Info Cards */}
                <div className={styles.infoCards}>
                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div>
                            <p className={styles.infoLabel}>Total SKS</p>
                            <p className={styles.infoValue}>
                                {getCurrentSKS()} <span className={styles.infoMax}>/ {maxSKS}</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={`${styles.infoIcon} ${styles.greenIcon}`}>
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <div>
                            <p className={styles.infoLabel}>Mata Kuliah Terdaftar</p>
                            <p className={styles.infoValue}>{enrolledSchedules.length}</p>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={`${styles.infoIcon} ${styles.purpleIcon}`}>
                            <span className="material-symbols-outlined">pending</span>
                        </div>
                        <div>
                            <p className={styles.infoLabel}>Status KRS</p>
                            <p className={`${styles.infoStatus} ${getCurrentSKS() <= maxSKS ? styles.statusOk : styles.statusError}`}>
                                {getCurrentSKS() <= maxSKS ? 'Valid' : 'Melebihi Batas'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className={styles.mainContent}>
                    {/* Course Section */}
                    <div className={styles.courseSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Daftar Mata Kuliah</h2>
                            <div className={styles.searchWrapper}>
                                <span className="material-symbols-outlined">search</span>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Cari mata kuliah..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.courseList}>
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map(course => {
                                    const enrolled = isEnrolled(course.id!)
                                    const inCart = isInCart(course.id!)
                                    
                                    return (
                                        <div 
                                            key={course.id} 
                                            className={`${styles.courseCard} ${inCart ? styles.courseSelected : ''} ${enrolled ? styles.courseEnrolled : ''}`}
                                            onClick={() => !enrolled && !inCart && addToCart(course)}
                                        >
                                            <div className={styles.courseIcon}>
                                                <span className="material-symbols-outlined">menu_book</span>
                                            </div>
                                            <div className={styles.courseInfo}>
                                                <div className={styles.courseHeader}>
                                                    <h3 className={styles.courseName}>{course.name}</h3>
                                                    <span className={styles.sksBadge}>{course.sks} SKS</span>
                                                </div>
                                                <p className={styles.courseCode}>{course.code}</p>
                                                <div className={styles.courseMeta}>
                                                    <span className={styles.metaItem}>
                                                        <span className="material-symbols-outlined">person</span>
                                                        {course.teacher?.user?.name || 'TBA'}
                                                    </span>
                                                    {course.schedule?.[0] && (
                                                        <span className={styles.metaItem}>
                                                            <span className="material-symbols-outlined">schedule</span>
                                                            {course.schedule[0].day} {course.schedule[0].time}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={styles.courseAction}>
                                                {enrolled ? (
                                                    <span className={styles.enrolledBadge}>
                                                        <span className="material-symbols-outlined">check</span>
                                                        Terdaftar
                                                    </span>
                                                ) : inCart ? (
                                                    <button 
                                                        className={styles.removeBtn}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeFromCart(course.id!)
                                                        }}
                                                    >
                                                        <span className="material-symbols-outlined">close</span>
                                                    </button>
                                                ) : (
                                                    <button className={styles.addBtn}>
                                                        <span className="material-symbols-outlined">add</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className={styles.emptyState}>
                                    <span className="material-symbols-outlined">search_off</span>
                                    <Text>Tidak ada mata kuliah ditemukan</Text>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div className={styles.cartSection}>
                        <div className={styles.cartCard}>
                            <div className={styles.cartHeader}>
                                <h3 className={styles.cartTitle}>Keranjang KRS</h3>
                                <span className={styles.cartCount}>{cart.length}</span>
                            </div>
                            
                            <div className={styles.cartList}>
                                {cart.length > 0 ? (
                                    cart.map(item => (
                                        <div key={item.course.id} className={styles.cartItem}>
                                            <div className={styles.cartItemInfo}>
                                                <h4 className={styles.cartItemName}>{item.course.name}</h4>
                                                <div className={styles.cartItemMeta}>
                                                    <span>{item.course.code}</span>
                                                    <span>•</span>
                                                    <span>{item.course.sks} SKS</span>
                                                </div>
                                            </div>
                                            <button 
                                                className={styles.cartRemoveBtn}
                                                onClick={() => removeFromCart(item.course.id!)}
                                            >
                                                <span className="material-symbols-outlined">close</span>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.cartEmpty}>
                                        <span className="material-symbols-outlined">shopping_cart</span>
                                        <p>Belum ada mata kuliah dipilih</p>
                                    </div>
                                )}
                            </div>

                            <div className={styles.cartSummary}>
                                <div className={styles.summaryRow}>
                                    <span>Total SKS Dipilih</span>
                                    <span className={styles.summaryValue}>
                                        {cart.reduce((sum, item) => sum + item.course.sks, 0)}
                                    </span>
                                </div>
                            </div>

                            <button 
                                className={`${styles.submitBtn} ${cart.length === 0 ? styles.submitDisabled : ''}`}
                                onClick={handleSubmit}
                                disabled={cart.length === 0 || submitting}
                            >
                                {submitting ? (
                                    <Loader size="sm" color="white" />
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">save</span>
                                        Simpan KRS
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
