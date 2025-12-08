import { useEffect, useState } from 'react'
import {
    Container,
    Title,
    Text,
    Card,
    Group,
    Badge,
    ThemeIcon,
    Stack,
    Table,
    Skeleton,
    Box,
    Button,
    Checkbox,
    Select,
    Alert,
    Paper,
    SimpleGrid,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
    IconBook,
    IconClock,
    IconMapPin,
    IconCheck,
    IconAlertCircle,
} from '@tabler/icons-react'
import { scheduleService, enrollmentService } from '../../services'
import type { Schedule, Enrollment, Day, Semester } from '../../types'
import styles from './StudentDashboard.module.css'

const dayTranslation: Record<Day, string> = {
    MONDAY: 'Senin',
    TUESDAY: 'Selasa',
    WEDNESDAY: 'Rabu',
    THURSDAY: 'Kamis',
    FRIDAY: 'Jumat',
    SATURDAY: 'Sabtu',
}

const semesterOptions = [
    { value: 'semester_1', label: 'Semester 1' },
    { value: 'semester_2', label: 'Semester 2' },
    { value: 'semester_3', label: 'Semester 3' },
    { value: 'semester_4', label: 'Semester 4' },
    { value: 'semester_5', label: 'Semester 5' },
    { value: 'semester_6', label: 'Semester 6' },
    { value: 'semester_7', label: 'Semester 7' },
    { value: 'semester_8', label: 'Semester 8' },
]

export function KRSPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [enrollments, setEnrollments] = useState<Enrollment[]>([])
    const [selectedSchedules, setSelectedSchedules] = useState<number[]>([])
    const [semester, setSemester] = useState<Semester>('semester_3')
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        loadData()
    }, [semester])

    const loadData = async () => {
        setIsLoading(true)
        try {
            const [scheduleRes, enrollmentRes] = await Promise.all([
                scheduleService.getBySemester(semester),
                enrollmentService.getAll(),
            ])
            setSchedules(scheduleRes.data || [])
            setEnrollments(enrollmentRes.data || [])

            // Pre-select already enrolled schedules
            const enrolledIds = (enrollmentRes.data || []).map((e: Enrollment) => e.scheduleId)
            setSelectedSchedules(enrolledIds)
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const isEnrolled = (scheduleId: number) => {
        return enrollments.some((e) => e.scheduleId === scheduleId)
    }

    const handleToggleSchedule = (scheduleId: number) => {
        if (isEnrolled(scheduleId)) return // Can't unselect already enrolled

        setSelectedSchedules((prev) =>
            prev.includes(scheduleId)
                ? prev.filter((id) => id !== scheduleId)
                : [...prev, scheduleId]
        )
    }

    const handleSubmitKRS = async () => {
        const newSchedules = selectedSchedules.filter((id) => !isEnrolled(id))

        if (newSchedules.length === 0) {
            notifications.show({
                title: 'Tidak ada perubahan',
                message: 'Pilih mata kuliah baru untuk didaftarkan',
                color: 'yellow',
            })
            return
        }

        setIsSubmitting(true)
        try {
            await enrollmentService.register(newSchedules)
            notifications.show({
                title: 'KRS Berhasil Disimpan',
                message: `${newSchedules.length} mata kuliah berhasil didaftarkan`,
                color: 'green',
            })
            loadData()
        } catch (error: any) {
            notifications.show({
                title: 'Gagal Menyimpan KRS',
                message: error.response?.data?.message || 'Terjadi kesalahan',
                color: 'red',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const selectedSKS = schedules
        .filter((s) => selectedSchedules.includes(s.id))
        .reduce((acc, s) => acc + (s.course?.sks || 0), 0)

    return (
        <Container size="xl" py="xl">
            <Group justify="space-between" mb="xl">
                <div>
                    <Title order={2}>Kartu Rencana Studi (KRS)</Title>
                    <Text c="dimmed" size="sm">Pilih mata kuliah yang akan diambil</Text>
                </div>
                <Select
                    value={semester}
                    onChange={(val) => setSemester(val as Semester)}
                    data={semesterOptions}
                    w={180}
                />
            </Group>

            {/* Summary */}
            <SimpleGrid cols={{ base: 1, sm: 2 }} mb="xl">
                <Paper className={styles.card} p="lg" radius="md">
                    <Group justify="space-between">
                        <div>
                            <Text size="sm" c="dimmed">Total SKS Dipilih</Text>
                            <Title order={2}>{selectedSKS}</Title>
                        </div>
                        <Badge size="lg" color={selectedSKS > 24 ? 'red' : 'green'}>
                            {selectedSKS > 24 ? 'Melebihi Batas' : 'OK'}
                        </Badge>
                    </Group>
                </Paper>
                <Paper className={styles.card} p="lg" radius="md">
                    <Group justify="space-between">
                        <div>
                            <Text size="sm" c="dimmed">Mata Kuliah Dipilih</Text>
                            <Title order={2}>{selectedSchedules.length}</Title>
                        </div>
                        <Button
                            leftSection={<IconCheck size={18} />}
                            variant="gradient"
                            gradient={{ from: 'violet', to: 'grape' }}
                            onClick={handleSubmitKRS}
                            loading={isSubmitting}
                            disabled={selectedSKS > 24}
                        >
                            Simpan KRS
                        </Button>
                    </Group>
                </Paper>
            </SimpleGrid>

            {selectedSKS > 24 && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" mb="xl">
                    Total SKS melebihi batas maksimal 24 SKS. Silakan kurangi mata kuliah yang dipilih.
                </Alert>
            )}

            {/* Available Courses */}
            <Card className={styles.card} padding="xl" radius="lg">
                <Title order={3} mb="xl">Daftar Mata Kuliah Tersedia</Title>

                {isLoading ? (
                    <Stack gap="md">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} height={60} radius="md" />
                        ))}
                    </Stack>
                ) : schedules.length > 0 ? (
                    <Table.ScrollContainer minWidth={600}>
                        <Table verticalSpacing="md" highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th w={50}>Pilih</Table.Th>
                                    <Table.Th>Mata Kuliah</Table.Th>
                                    <Table.Th>Hari</Table.Th>
                                    <Table.Th>Waktu</Table.Th>
                                    <Table.Th>Ruangan</Table.Th>
                                    <Table.Th>SKS</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {schedules.map((schedule) => (
                                    <Table.Tr
                                        key={schedule.id}
                                        style={{
                                            opacity: isEnrolled(schedule.id) ? 0.7 : 1,
                                            cursor: isEnrolled(schedule.id) ? 'not-allowed' : 'pointer',
                                        }}
                                        onClick={() => !isEnrolled(schedule.id) && handleToggleSchedule(schedule.id)}
                                    >
                                        <Table.Td>
                                            <Checkbox
                                                checked={selectedSchedules.includes(schedule.id)}
                                                onChange={() => handleToggleSchedule(schedule.id)}
                                                disabled={isEnrolled(schedule.id)}
                                                color="violet"
                                            />
                                        </Table.Td>
                                        <Table.Td>
                                            <Group gap="sm">
                                                <ThemeIcon size={36} radius="md" variant="light" color="violet">
                                                    <IconBook size={18} />
                                                </ThemeIcon>
                                                <div>
                                                    <Text fw={500}>{schedule.course?.name}</Text>
                                                    <Text size="xs" c="dimmed">{schedule.course?.code}</Text>
                                                </div>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge variant="light" color="blue">
                                                {dayTranslation[schedule.day as Day] || schedule.day}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Group gap={4}>
                                                <IconClock size={14} />
                                                <Text size="sm">{schedule.time}</Text>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>
                                            <Group gap={4}>
                                                <IconMapPin size={14} />
                                                <Text size="sm">{schedule.room}</Text>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge variant="filled" color="violet">
                                                {schedule.course?.sks} SKS
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            {isEnrolled(schedule.id) ? (
                                                <Badge color="green" variant="light">
                                                    Terdaftar
                                                </Badge>
                                            ) : selectedSchedules.includes(schedule.id) ? (
                                                <Badge color="yellow" variant="light">
                                                    Dipilih
                                                </Badge>
                                            ) : (
                                                <Badge color="gray" variant="light">
                                                    Tersedia
                                                </Badge>
                                            )}
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                ) : (
                    <Box ta="center" py="xl">
                        <Text c="dimmed">Tidak ada jadwal kuliah tersedia untuk semester ini</Text>
                    </Box>
                )}
            </Card>
        </Container>
    )
}
