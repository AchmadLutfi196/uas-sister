import { useState, useEffect } from 'react'
import {
    Container,
    Title,
    Text,
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
    TextInput,
    ActionIcon,
    Modal,
    Button,
    SegmentedControl,
    Tabs,
    Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconSearch,
    IconEdit,
    IconTrash,
    IconUser,
    IconSchool,
    IconMail,
    IconEye,
} from '@tabler/icons-react'
import adminService, { type AdminUser } from '../../services/admin.service'
import Swal from 'sweetalert2'
import styles from './UsersManagement.module.css'

export function UsersManagement() {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterRole, setFilterRole] = useState<'all' | 'STUDENT' | 'TEACHER'>('all')
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
    const [detailOpened, { open: openDetail, close: closeDetail }] = useDisclosure(false)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const response = await adminService.getUsers()
            setUsers(response.data || [])
        } catch (error) {
            console.error('Error loading users:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = filterRole === 'all' || user.role === filterRole
        return matchesSearch && matchesRole
    })

    const handleDelete = async (user: AdminUser) => {
        const result = await Swal.fire({
            title: 'Hapus Pengguna?',
            text: `Apakah Anda yakin ingin menghapus ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        })

        if (result.isConfirmed) {
            try {
                await adminService.deleteUser(user.id, user.role as 'STUDENT' | 'TEACHER')
                await loadUsers()
                Swal.fire('Berhasil!', 'Pengguna berhasil dihapus.', 'success')
            } catch (error) {
                Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus pengguna.', 'error')
            }
        }
    }

    const handleViewDetail = (user: AdminUser) => {
        setSelectedUser(user)
        openDetail()
    }

    const students = filteredUsers.filter(u => u.role === 'STUDENT')
    const teachers = filteredUsers.filter(u => u.role === 'TEACHER')

    return (
        <Container size="xl" py="xl">
            <Group justify="space-between" mb="xl">
                <div>
                    <Title order={2}>Manajemen Pengguna</Title>
                    <Text c="dimmed" size="sm">Kelola data mahasiswa dan dosen</Text>
                </div>
                <Badge size="lg" variant="light" color="blue">
                    {users.length} Pengguna
                </Badge>
            </Group>

            {/* Filters */}
            <Card className={styles.card} p="md" radius="lg" mb="lg">
                <Group justify="space-between">
                    <TextInput
                        placeholder="Cari nama atau email..."
                        leftSection={<IconSearch size={18} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: 1, maxWidth: 400 }}
                        radius="xl"
                    />
                    <SegmentedControl
                        value={filterRole}
                        onChange={(value) => setFilterRole(value as typeof filterRole)}
                        data={[
                            { label: 'Semua', value: 'all' },
                            { label: 'Mahasiswa', value: 'STUDENT' },
                            { label: 'Dosen', value: 'TEACHER' },
                        ]}
                        radius="xl"
                    />
                </Group>
            </Card>

            {/* Users Table */}
            <Card className={styles.card} p="xl" radius="lg">
                <Tabs defaultValue="all">
                    <Tabs.List mb="lg">
                        <Tabs.Tab value="all" leftSection={<IconUser size={16} />}>
                            Semua ({filteredUsers.length})
                        </Tabs.Tab>
                        <Tabs.Tab value="students" leftSection={<IconSchool size={16} />}>
                            Mahasiswa ({students.length})
                        </Tabs.Tab>
                        <Tabs.Tab value="teachers" leftSection={<IconUser size={16} />}>
                            Dosen ({teachers.length})
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="all">
                        <UserTable users={filteredUsers} isLoading={isLoading} onDelete={handleDelete} onViewDetail={handleViewDetail} />
                    </Tabs.Panel>
                    <Tabs.Panel value="students">
                        <UserTable users={students} isLoading={isLoading} onDelete={handleDelete} onViewDetail={handleViewDetail} />
                    </Tabs.Panel>
                    <Tabs.Panel value="teachers">
                        <UserTable users={teachers} isLoading={isLoading} onDelete={handleDelete} onViewDetail={handleViewDetail} />
                    </Tabs.Panel>
                </Tabs>
            </Card>

            {/* Detail Modal */}
            <Modal opened={detailOpened} onClose={closeDetail} title="Detail Pengguna" size="lg">
                {selectedUser && (
                    <Stack gap="md">
                        <Group>
                            <Avatar
                                size={80}
                                color={selectedUser.role === 'STUDENT' ? 'blue' : 'green'}
                                radius="xl"
                            >
                                {selectedUser.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>
                                <Text size="lg" fw={600}>{selectedUser.name}</Text>
                                <Badge color={selectedUser.role === 'STUDENT' ? 'blue' : 'green'}>
                                    {selectedUser.role === 'STUDENT' ? 'Mahasiswa' : 'Dosen'}
                                </Badge>
                            </div>
                        </Group>

                        <Paper p="md" radius="md" withBorder>
                            <Stack gap="sm">
                                <Group>
                                    <IconMail size={18} />
                                    <Text>{selectedUser.email}</Text>
                                </Group>
                                {selectedUser.student && (
                                    <>
                                        <Group>
                                            <IconSchool size={18} />
                                            <Text>NIM: {selectedUser.student.nim}</Text>
                                        </Group>
                                        <Group>
                                            <Text c="dimmed">Program Studi:</Text>
                                            <Text>{selectedUser.student.programStudi}</Text>
                                        </Group>
                                        <Group>
                                            <Text c="dimmed">Status:</Text>
                                            <Badge color={selectedUser.student.statusStudent === 'ACTIVE' ? 'green' : 'red'}>
                                                {selectedUser.student.statusStudent}
                                            </Badge>
                                        </Group>
                                    </>
                                )}
                                {selectedUser.teacher && (
                                    <>
                                        <Group>
                                            <IconUser size={18} />
                                            <Text>NIP: {selectedUser.teacher.nip}</Text>
                                        </Group>
                                        {selectedUser.teacher.fakultas && (
                                            <Group>
                                                <Text c="dimmed">Fakultas:</Text>
                                                <Text>{selectedUser.teacher.fakultas}</Text>
                                            </Group>
                                        )}
                                    </>
                                )}
                            </Stack>
                        </Paper>

                        <Group justify="flex-end">
                            <Button variant="light" onClick={closeDetail}>Tutup</Button>
                        </Group>
                    </Stack>
                )}
            </Modal>
        </Container>
    )
}

function UserTable({ users, isLoading, onDelete, onViewDetail }: {
    users: AdminUser[],
    isLoading: boolean,
    onDelete: (user: AdminUser) => void,
    onViewDetail: (user: AdminUser) => void
}) {
    if (isLoading) {
        return (
            <Stack gap="md">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} height={60} radius="md" />
                ))}
            </Stack>
        )
    }

    if (users.length === 0) {
        return (
            <Box ta="center" py="xl">
                <ThemeIcon size={60} radius="xl" variant="light" color="gray" mb="md">
                    <IconUser size={30} />
                </ThemeIcon>
                <Text c="dimmed" size="lg">Tidak ada pengguna ditemukan</Text>
            </Box>
        )
    }

    return (
        <Table.ScrollContainer minWidth={600}>
            <Table verticalSpacing="md" highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Nama</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Aksi</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users.map((user) => (
                        <Table.Tr key={user.id}>
                            <Table.Td>
                                <Group gap="sm">
                                    <Avatar color={user.role === 'STUDENT' ? 'blue' : 'green'} radius="xl" size="sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Text size="sm" fw={500}>{user.name}</Text>
                                </Group>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" c="dimmed">{user.email}</Text>
                            </Table.Td>
                            <Table.Td>
                                <Badge
                                    variant="light"
                                    color={user.role === 'STUDENT' ? 'blue' : 'green'}
                                    size="sm"
                                >
                                    {user.role === 'STUDENT' ? 'Mahasiswa' : 'Dosen'}
                                </Badge>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" c="dimmed">
                                    {user.student?.nim || user.teacher?.nip || '-'}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Group gap="xs">
                                    <Tooltip label="Lihat Detail">
                                        <ActionIcon variant="subtle" color="blue" onClick={() => onViewDetail(user)}>
                                            <IconEye size={18} />
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip label="Edit">
                                        <ActionIcon variant="subtle" color="orange">
                                            <IconEdit size={18} />
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip label="Hapus">
                                        <ActionIcon variant="subtle" color="red" onClick={() => onDelete(user)}>
                                            <IconTrash size={18} />
                                        </ActionIcon>
                                    </Tooltip>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}
