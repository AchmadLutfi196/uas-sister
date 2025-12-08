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
} from '@mantine/core'
import {
    IconBook,
    IconCalendar,
    IconCreditCard,
    IconChartBar,
    IconClock,
    IconMapPin,
    IconTrendingUp,
} from '@tabler/icons-react'
import { useAuth } from '../../context'
import { enrollmentService } from '../../services'
import type { UserWithStudent, Enrollment, Day } from '../../types'
import styles from './StudentDashboard.module.css'

const dayTranslation: Record<Day, string> = {
    MONDAY: 'Senin',
    TUESDAY: 'Selasa',
    WEDNESDAY: 'Rabu',
    THURSDAY: 'Kamis',
    FRIDAY: 'Jumat',
    SATURDAY: 'Sabtu',
}

export function StudentDashboard() {
    const { user } = useAuth()
    const studentUser = user as UserWithStudent
    const [enrollments, setEnrollments] = useState<Enrollment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        loadEnrollments()
    }, [])

    const loadEnrollments = async () => {
        try {
            const response = await enrollmentService.getAll()
            setEnrollments(response.data || [])
        } catch (error) {
            console.error('Error loading enrollments:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const totalSKS = enrollments.reduce((acc, e) => acc + (e.schedule?.course?.sks || 0), 0)

    const statCards = [
        {
            title: 'Total SKS',
            value: totalSKS.toString(),
            icon: IconBook,
            gradient: { from: 'violet', to: 'grape' },
            description: 'SKS aktif semester ini',
        },
        {
            title: 'Mata Kuliah',
            value: enrollments.length.toString(),
            icon: IconCalendar,
            gradient: { from: 'cyan', to: 'blue' },
            description: 'Kelas terdaftar',
        },
        {
            title: 'Semester',
            value: '3',
            icon: IconChartBar,
            gradient: { from: 'pink', to: 'grape' },
            description: 'Semester berjalan',
        },
        {
            title: 'Pembayaran',
            value: 'Lunas',
            valueColor: 'green',
            icon: IconCreditCard,
            gradient: { from: 'teal', to: 'green' },
            description: 'Status SPP',
        },
    ]

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
                                    color="violet"
                                    style={{
                                        border: '3px solid rgba(139, 92, 246, 0.3)',
                                        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
                                    }}
                                >
                                    {studentUser?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                                <div>
                                    <Text size="sm" c="dimmed" mb={4}>Selamat datang,</Text>
                                    <Title order={2} style={{ lineHeight: 1.2 }}>{studentUser?.name}</Title>
                                    <Group gap="xs" mt={8}>
                                        <Badge color="violet" variant="light" size="md">
                                            {studentUser?.student?.nim}
                                        </Badge>
                                        <Badge color="cyan" variant="light" size="md">
                                            {studentUser?.student?.programStudi}
                                        </Badge>
                                        <Badge
                                            color={studentUser?.student?.statusStudent === 'ACTIVE' ? 'green' : 'red'}
                                            variant="light"
                                            size="md"
                                        >
                                            {studentUser?.student?.statusStudent === 'ACTIVE' ? 'Aktif' : 'Tidak Aktif'}
                                        </Badge>
                                    </Group>
                                </div>
                            </Group>
                            <Box visibleFrom="sm">
                                <Group gap="xs">
                                    <ThemeIcon size={40} radius="xl" variant="light" color="violet">
                                        <IconTrendingUp size={22} />
                                    </ThemeIcon>
                                    <div>
                                        <Text size="xs" c="dimmed">IPK Sementara</Text>
                                        <Text size="lg" fw={700}>3.75</Text>
                                    </div>
                                </Group>
                            </Box>
                        </Group>
                    </Paper>
                )}
            </Transition>

            {/* Quick Stats */}
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="lg" mb="xl">
                {statCards.map((stat, index) => (
                    <Transition
                        key={stat.title}
                        mounted={mounted}
                        transition="slide-up"
                        duration={400}
                        timingFunction="ease"
                        enterDelay={index * 100}
                    >
                        {(transitionStyles) => (
                            <Card className={styles.statCard} padding="lg" radius="lg" style={transitionStyles}>
                                <Group justify="space-between">
                                    <div>
                                        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                            {stat.title}
                                        </Text>
                                        <Text
                                            size="xl"
                                            fw={700}
                                            mt={3}
                                            c={stat.valueColor}
                                        >
                                            {stat.value}
                                        </Text>
                                        <Text size="xs" c="dimmed" mt={4}>
                                            {stat.description}
                                        </Text>
                                    </div>
                                    <ThemeIcon
                                        size={56}
                                        radius="xl"
                                        variant="gradient"
                                        gradient={stat.gradient}
                                        style={{
                                            boxShadow: `0 4px 15px rgba(139, 92, 246, 0.25)`,
                                        }}
                                    >
                                        <stat.icon size={28} stroke={1.5} />
                                    </ThemeIcon>
                                </Group>
                            </Card>
                        )}
                    </Transition>
                ))}
            </SimpleGrid>

            {/* Schedule Section */}
            <Transition mounted={mounted} transition="fade-up" duration={500} enterDelay={400}>
                {(transitionStyles) => (
                    <Card className={styles.card} padding="xl" radius="lg" style={transitionStyles}>
                        <Group justify="space-between" mb="xl">
                            <Title order={3}>Jadwal Kuliah Hari Ini</Title>
                            <Badge variant="light" color="violet" size="lg">
                                {enrollments.length} Kelas
                            </Badge>
                        </Group>

                        {isLoading ? (
                            <Stack gap="md">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} height={80} radius="md" />
                                ))}
                            </Stack>
                        ) : enrollments.length > 0 ? (
                            <Table.ScrollContainer minWidth={500}>
                                <Table verticalSpacing="md" highlightOnHover className={styles.table}>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Mata Kuliah</Table.Th>
                                            <Table.Th>Hari</Table.Th>
                                            <Table.Th>Waktu</Table.Th>
                                            <Table.Th>Ruangan</Table.Th>
                                            <Table.Th>SKS</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {enrollments.map((enrollment) => (
                                            <Table.Tr key={enrollment.scheduleId} className={styles.tableRow}>
                                                <Table.Td>
                                                    <Group gap="sm">
                                                        <ThemeIcon size={40} radius="md" variant="light" color="violet">
                                                            <IconBook size={20} />
                                                        </ThemeIcon>
                                                        <div>
                                                            <Text fw={600} size="sm">{enrollment.schedule?.course?.name}</Text>
                                                            <Text size="xs" c="dimmed">{enrollment.schedule?.course?.code}</Text>
                                                        </div>
                                                    </Group>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Badge variant="light" color="blue" size="md">
                                                        {dayTranslation[enrollment.schedule?.day as Day] || enrollment.schedule?.day}
                                                    </Badge>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Group gap={6}>
                                                        <IconClock size={16} style={{ opacity: 0.6 }} />
                                                        <Text size="sm" fw={500}>{enrollment.schedule?.time}</Text>
                                                    </Group>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Group gap={6}>
                                                        <IconMapPin size={16} style={{ opacity: 0.6 }} />
                                                        <Text size="sm" fw={500}>{enrollment.schedule?.room}</Text>
                                                    </Group>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Badge variant="filled" color="violet" size="md">
                                                        {enrollment.schedule?.course?.sks} SKS
                                                    </Badge>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </Table.ScrollContainer>
                        ) : (
                            <Box ta="center" py="xl">
                                <ThemeIcon size={60} radius="xl" variant="light" color="gray" mb="md">
                                    <IconCalendar size={30} />
                                </ThemeIcon>
                                <Text c="dimmed" size="lg">Belum ada jadwal kuliah yang terdaftar</Text>
                                <Text c="dimmed" size="sm" mt={4}>Silakan daftarkan mata kuliah di menu KRS</Text>
                            </Box>
                        )}
                    </Card>
                )}
            </Transition>
        </Container>
    )
}
