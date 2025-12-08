import { useEffect, useState } from 'react'
import {
    Container,
    Title,
    Text,
    SimpleGrid,
    Card,
    Group,
    Badge,
    ThemeIcon,
    Stack,
    Paper,
    Avatar,
    Box,
    Table,
    Skeleton,
    Transition,
    RingProgress,
    Progress,
} from '@mantine/core'
import {
    IconUsers,
    IconSchool,
    IconUser,
    IconBook,
    IconTrendingUp,
    IconCalendar,
    IconCoin,
    IconCheck,
    IconClock,
} from '@tabler/icons-react'
import { useAuth } from '../../context'
import adminService, { type AdminUser } from '../../services/admin.service'
import courseService from '../../services/course.service'
import styles from './AdminDashboard.module.css'

export function AdminDashboard() {
    const { user } = useAuth()
    const [users, setUsers] = useState<AdminUser[]>([])
    const [courses, setCourses] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const [usersRes, coursesRes] = await Promise.all([
                adminService.getUsers().catch(() => ({ data: [] })),
                courseService.getAll().catch(() => ({ data: [] })),
            ])
            setUsers(usersRes.data || [])
            setCourses(coursesRes.data || [])
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const students = users.filter(u => u.role === 'STUDENT')
    const teachers = users.filter(u => u.role === 'TEACHER')

    const statCards = [
        {
            title: 'Total Mahasiswa',
            value: students.length.toString(),
            icon: IconSchool,
            color: 'blue',
            gradient: { from: 'blue', to: 'cyan' },
            change: '+12%',
        },
        {
            title: 'Total Dosen',
            value: teachers.length.toString(),
            icon: IconUser,
            color: 'green',
            gradient: { from: 'green', to: 'teal' },
            change: '+5%',
        },
        {
            title: 'Mata Kuliah',
            value: courses.length.toString(),
            icon: IconBook,
            color: 'violet',
            gradient: { from: 'violet', to: 'grape' },
            change: '+8%',
        },
        {
            title: 'Total Pengguna',
            value: users.length.toString(),
            icon: IconUsers,
            color: 'orange',
            gradient: { from: 'orange', to: 'red' },
            change: '+15%',
        },
    ]

    const recentUsers = users.slice(0, 5)

    return (
        <Container size="xl" py="xl">
            {/* Welcome Section */}
            <Transition mounted={mounted} transition="slide-down" duration={400}>
                {(transitionStyles) => (
                    <Paper className={styles.welcomeCard} p="xl" radius="lg" mb="xl" style={transitionStyles}>
                        <Group justify="space-between" wrap="nowrap">
                            <Group>
                                <Avatar
                                    size={80}
                                    radius="xl"
                                    color="red"
                                    style={{
                                        border: '3px solid rgba(239, 68, 68, 0.3)',
                                        boxShadow: '0 4px 20px rgba(239, 68, 68, 0.2)',
                                    }}
                                >
                                    {user?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                                <div>
                                    <Text size="sm" c="dimmed" mb={4}>Selamat datang,</Text>
                                    <Title order={2} style={{ lineHeight: 1.2 }}>{user?.name}</Title>
                                    <Group gap="xs" mt={8}>
                                        <Badge color="red" variant="filled" size="md">
                                            Administrator
                                        </Badge>
                                        <Badge color="green" variant="light" size="md">
                                            Online
                                        </Badge>
                                    </Group>
                                </div>
                            </Group>
                            <Box visibleFrom="md">
                                <Group gap="xl">
                                    <div style={{ textAlign: 'center' }}>
                                        <Text size="xs" c="dimmed">Sistem Status</Text>
                                        <RingProgress
                                            size={80}
                                            thickness={8}
                                            sections={[{ value: 100, color: 'green' }]}
                                            label={
                                                <ThemeIcon color="green" variant="light" radius="xl" size="lg">
                                                    <IconCheck size={18} />
                                                </ThemeIcon>
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Text size="xs" c="dimmed">Server Uptime</Text>
                                        <Text size="lg" fw={700}>99.9%</Text>
                                        <Progress value={99.9} color="green" size="sm" mt={4} style={{ width: 100 }} />
                                    </div>
                                </Group>
                            </Box>
                        </Group>
                    </Paper>
                )}
            </Transition>

            {/* Stats Cards */}
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="lg" mb="xl">
                {statCards.map((stat, index) => (
                    <Transition
                        key={stat.title}
                        mounted={mounted}
                        transition="slide-up"
                        duration={400}
                        enterDelay={index * 100}
                    >
                        {(transitionStyles) => (
                            <Card className={styles.statCard} padding="lg" radius="lg" style={transitionStyles}>
                                <Group justify="space-between">
                                    <div>
                                        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                            {stat.title}
                                        </Text>
                                        <Text size="xl" fw={700} mt={3}>
                                            {isLoading ? <Skeleton width={40} height={28} /> : stat.value}
                                        </Text>
                                        <Group gap={4} mt={4}>
                                            <IconTrendingUp size={14} color="green" />
                                            <Text size="xs" c="green">{stat.change}</Text>
                                            <Text size="xs" c="dimmed">bulan ini</Text>
                                        </Group>
                                    </div>
                                    <ThemeIcon
                                        size={56}
                                        radius="xl"
                                        variant="gradient"
                                        gradient={stat.gradient}
                                    >
                                        <stat.icon size={28} stroke={1.5} />
                                    </ThemeIcon>
                                </Group>
                            </Card>
                        )}
                    </Transition>
                ))}
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                {/* Recent Users */}
                <Transition mounted={mounted} transition="fade-up" duration={500} enterDelay={400}>
                    {(transitionStyles) => (
                        <Card className={styles.card} padding="xl" radius="lg" style={transitionStyles}>
                            <Group justify="space-between" mb="xl">
                                <Title order={4}>Pengguna Terbaru</Title>
                                <Badge variant="light" color="blue">
                                    {users.length} total
                                </Badge>
                            </Group>

                            {isLoading ? (
                                <Stack gap="md">
                                    {[1, 2, 3].map((i) => (
                                        <Skeleton key={i} height={60} radius="md" />
                                    ))}
                                </Stack>
                            ) : recentUsers.length > 0 ? (
                                <Stack gap="sm">
                                    {recentUsers.map((u) => (
                                        <Paper key={u.id} p="sm" radius="md" className={styles.userItem}>
                                            <Group>
                                                <Avatar color={u.role === 'STUDENT' ? 'blue' : 'green'} radius="xl">
                                                    {u.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <div style={{ flex: 1 }}>
                                                    <Text size="sm" fw={500}>{u.name}</Text>
                                                    <Text size="xs" c="dimmed">{u.email}</Text>
                                                </div>
                                                <Badge
                                                    variant="light"
                                                    color={u.role === 'STUDENT' ? 'blue' : 'green'}
                                                    size="sm"
                                                >
                                                    {u.role === 'STUDENT' ? 'Mahasiswa' : 'Dosen'}
                                                </Badge>
                                            </Group>
                                        </Paper>
                                    ))}
                                </Stack>
                            ) : (
                                <Box ta="center" py="xl">
                                    <Text c="dimmed">Belum ada pengguna</Text>
                                </Box>
                            )}
                        </Card>
                    )}
                </Transition>

                {/* Quick Actions */}
                <Transition mounted={mounted} transition="fade-up" duration={500} enterDelay={500}>
                    {(transitionStyles) => (
                        <Card className={styles.card} padding="xl" radius="lg" style={transitionStyles}>
                            <Title order={4} mb="xl">Ringkasan Aktivitas</Title>

                            <Stack gap="md">
                                <Paper p="md" radius="md" className={styles.activityItem}>
                                    <Group>
                                        <ThemeIcon size={40} radius="md" variant="light" color="blue">
                                            <IconSchool size={20} />
                                        </ThemeIcon>
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>Pendaftaran Mahasiswa Baru</Text>
                                            <Text size="xs" c="dimmed">Semester aktif</Text>
                                        </div>
                                        <Badge color="blue" variant="filled">{students.length}</Badge>
                                    </Group>
                                </Paper>

                                <Paper p="md" radius="md" className={styles.activityItem}>
                                    <Group>
                                        <ThemeIcon size={40} radius="md" variant="light" color="green">
                                            <IconCalendar size={20} />
                                        </ThemeIcon>
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>Jadwal Kuliah Aktif</Text>
                                            <Text size="xs" c="dimmed">Semester ini</Text>
                                        </div>
                                        <Badge color="green" variant="filled">24</Badge>
                                    </Group>
                                </Paper>

                                <Paper p="md" radius="md" className={styles.activityItem}>
                                    <Group>
                                        <ThemeIcon size={40} radius="md" variant="light" color="orange">
                                            <IconCoin size={20} />
                                        </ThemeIcon>
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>Pembayaran Pending</Text>
                                            <Text size="xs" c="dimmed">Menunggu verifikasi</Text>
                                        </div>
                                        <Badge color="orange" variant="filled">5</Badge>
                                    </Group>
                                </Paper>

                                <Paper p="md" radius="md" className={styles.activityItem}>
                                    <Group>
                                        <ThemeIcon size={40} radius="md" variant="light" color="violet">
                                            <IconClock size={20} />
                                        </ThemeIcon>
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>KRS Pending Approval</Text>
                                            <Text size="xs" c="dimmed">Menunggu validasi</Text>
                                        </div>
                                        <Badge color="violet" variant="filled">12</Badge>
                                    </Group>
                                </Paper>
                            </Stack>
                        </Card>
                    )}
                </Transition>
            </SimpleGrid>
        </Container>
    )
}
