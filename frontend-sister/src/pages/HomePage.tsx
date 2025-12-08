import {
    Container,
    Title,
    Text,
    SimpleGrid,
    Card,
    Group,
    Badge,
    Button,
    ThemeIcon,
    Paper,
    Progress,
    RingProgress,
    Box,
    Stack,
    Flex,
    Avatar,
} from '@mantine/core'
import {
    IconArrowUpRight,
    IconArrowDownRight,
    IconCoin,
    IconUsers,
    IconShoppingCart,
    IconChartLine,
    IconDeviceAnalytics,
    IconRocket,
    IconSparkles,
} from '@tabler/icons-react'
import styles from './HomePage.module.css'

// Stats data
const statsData = [
    { title: 'Revenue', value: '$1,234,567', diff: 34, icon: IconCoin, color: 'violet' },
    { title: 'Active Users', value: '12,543', diff: 13, icon: IconUsers, color: 'cyan' },
    { title: 'Orders', value: '2,345', diff: -9, icon: IconShoppingCart, color: 'pink' },
    { title: 'Conversion', value: '4.67%', diff: 21, icon: IconChartLine, color: 'orange' },
]

// Features data
const features = [
    {
        icon: IconDeviceAnalytics,
        title: 'Advanced Analytics',
        description: 'Deep insights into your data with beautiful visualizations',
    },
    {
        icon: IconRocket,
        title: 'Fast Performance',
        description: 'Optimized for speed with modern React architecture',
    },
    {
        icon: IconSparkles,
        title: 'Beautiful UI',
        description: 'Crafted with Mantine and ReactBits for stunning interfaces',
    },
]

// Recent activity
const recentActivity = [
    { name: 'John Doe', action: 'purchased Pro Plan', time: '2 min ago', avatar: 'JD' },
    { name: 'Jane Smith', action: 'signed up', time: '5 min ago', avatar: 'JS' },
    { name: 'Bob Wilson', action: 'upgraded account', time: '12 min ago', avatar: 'BW' },
    { name: 'Alice Brown', action: 'completed onboarding', time: '1 hour ago', avatar: 'AB' },
]

export function HomePage() {
    return (
        <Container size="xl" py="xl">
            {/* Hero Section */}
            <Box className={styles.heroSection} mb={50}>
                <Stack align="center" gap="md">
                    <Badge size="lg" variant="light" color="violet" leftSection="🚀">
                        Welcome to SISTER Dashboard
                    </Badge>
                    <Title order={1} ta="center" className={styles.heroTitle}>
                        Build Amazing Apps with
                        <Text component="span" className="gradient-text" inherit>
                            {' '}React + Mantine
                        </Text>
                    </Title>
                    <Text size="lg" c="dimmed" ta="center" maw={600}>
                        A modern, beautiful dashboard template built with React, Vite, Mantine UI,
                        and ReactBits. Start building your next project today.
                    </Text>
                    <Group mt="md">
                        <Button size="lg" variant="gradient" gradient={{ from: 'violet', to: 'grape' }} radius="xl">
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline" color="gray" radius="xl">
                            Learn More
                        </Button>
                    </Group>
                </Stack>
            </Box>

            {/* Stats Grid */}
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="lg" mb={50}>
                {statsData.map((stat) => (
                    <Card key={stat.title} className={styles.statCard} padding="lg" radius="lg">
                        <Group justify="space-between">
                            <div>
                                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                                    {stat.title}
                                </Text>
                                <Text size="xl" fw={700} mt={3}>
                                    {stat.value}
                                </Text>
                            </div>
                            <ThemeIcon
                                size={56}
                                radius="xl"
                                variant="gradient"
                                gradient={{ from: stat.color, to: 'grape' }}
                            >
                                <stat.icon size={28} stroke={1.5} />
                            </ThemeIcon>
                        </Group>
                        <Group gap="xs" mt="md">
                            {stat.diff > 0 ? (
                                <>
                                    <Badge color="teal" variant="light" size="sm" leftSection={<IconArrowUpRight size={12} />}>
                                        +{stat.diff}%
                                    </Badge>
                                    <Text size="xs" c="dimmed">vs last month</Text>
                                </>
                            ) : (
                                <>
                                    <Badge color="red" variant="light" size="sm" leftSection={<IconArrowDownRight size={12} />}>
                                        {stat.diff}%
                                    </Badge>
                                    <Text size="xs" c="dimmed">vs last month</Text>
                                </>
                            )}
                        </Group>
                    </Card>
                ))}
            </SimpleGrid>

            {/* Features & Progress Section */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb={50}>
                {/* Features */}
                <Card className={styles.card} padding="xl" radius="lg">
                    <Title order={3} mb="xl">Features</Title>
                    <Stack gap="lg">
                        {features.map((feature) => (
                            <Group key={feature.title} wrap="nowrap" align="flex-start">
                                <ThemeIcon
                                    size={44}
                                    radius="md"
                                    variant="gradient"
                                    gradient={{ from: 'violet', to: 'grape' }}
                                >
                                    <feature.icon size={24} stroke={1.5} />
                                </ThemeIcon>
                                <div>
                                    <Text fw={600} size="md">{feature.title}</Text>
                                    <Text size="sm" c="dimmed">{feature.description}</Text>
                                </div>
                            </Group>
                        ))}
                    </Stack>
                </Card>

                {/* Progress Stats */}
                <Card className={styles.card} padding="xl" radius="lg">
                    <Title order={3} mb="xl">Performance</Title>
                    <SimpleGrid cols={2} spacing="lg">
                        <Box ta="center">
                            <RingProgress
                                size={140}
                                thickness={14}
                                roundCaps
                                sections={[
                                    { value: 75, color: 'violet' },
                                ]}
                                label={
                                    <Text size="xl" fw={700} ta="center">75%</Text>
                                }
                            />
                            <Text size="sm" c="dimmed" mt="sm">CPU Usage</Text>
                        </Box>
                        <Box ta="center">
                            <RingProgress
                                size={140}
                                thickness={14}
                                roundCaps
                                sections={[
                                    { value: 42, color: 'cyan' },
                                ]}
                                label={
                                    <Text size="xl" fw={700} ta="center">42%</Text>
                                }
                            />
                            <Text size="sm" c="dimmed" mt="sm">Memory</Text>
                        </Box>
                    </SimpleGrid>
                    <Stack gap="sm" mt="xl">
                        <div>
                            <Flex justify="space-between" mb={4}>
                                <Text size="sm">Disk Usage</Text>
                                <Text size="sm" c="dimmed">68%</Text>
                            </Flex>
                            <Progress value={68} color="grape" size="md" radius="xl" />
                        </div>
                        <div>
                            <Flex justify="space-between" mb={4}>
                                <Text size="sm">Network</Text>
                                <Text size="sm" c="dimmed">89%</Text>
                            </Flex>
                            <Progress value={89} color="pink" size="md" radius="xl" />
                        </div>
                    </Stack>
                </Card>
            </SimpleGrid>

            {/* Recent Activity */}
            <Card className={styles.card} padding="xl" radius="lg">
                <Title order={3} mb="xl">Recent Activity</Title>
                <Stack gap="md">
                    {recentActivity.map((activity, index) => (
                        <Paper key={index} p="md" radius="md" className={styles.activityItem}>
                            <Group justify="space-between" wrap="nowrap">
                                <Group>
                                    <Avatar color="violet" radius="xl">{activity.avatar}</Avatar>
                                    <div>
                                        <Text size="sm" fw={500}>{activity.name}</Text>
                                        <Text size="xs" c="dimmed">{activity.action}</Text>
                                    </div>
                                </Group>
                                <Badge variant="light" color="gray" size="sm">
                                    {activity.time}
                                </Badge>
                            </Group>
                        </Paper>
                    ))}
                </Stack>
            </Card>
        </Container>
    )
}
