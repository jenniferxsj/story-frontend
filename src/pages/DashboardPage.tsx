import {
  ArrowRightOutlined,
  BookOutlined,
  DashboardOutlined,
  DeleteOutlined,
  EditOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  StarOutlined,
} from '@ant-design/icons'

import {
  ActionCard,
  Avatar,
  BadgeDot,
  BrandIcon,
  CardBody,
  CardFooter,
  CardIcon,
  CardWatermark,
  Content,
  DashboardLayout,
  Header,
  HeaderActions,
  HeaderStart,
  IconButton,
  Main,
  MobileMenuButton,
  QuickStartGrid,
  ReportActionButton,
  ReportActions,
  ReportCard,
  ReportExcerpt,
  ReportFooter,
  ReportMeta,
  ReportsGrid,
  Section,
  SectionHeader,
  SectionHeading,
  SectionLink,
  SectionStack,
  Sidebar,
  SidebarBrand,
  SidebarFooter,
  SidebarLink,
  SidebarNav,
  StatusBadge,
  TableAction,
  TableWrapper,
  Title,
  VisuallyHidden,
} from './DashboardPage.styles'
import { useGetCurrentUser } from '../services/auth'
import { Spin } from 'antd'

const sidebarLinks = [
  { label: 'Dashboard', icon: <DashboardOutlined />, href: '#', active: true },
  { label: 'Book Report', icon: <BookOutlined />, href: '#' },
  { label: 'Story Options', icon: <StarOutlined />, href: '#' },
];

const supportLink = { label: 'Help & Support', icon: <QuestionCircleOutlined />, href: '#' };

const quickStartCards = [
  {
    key: 'reports',
    title: 'Book Report Generator',
    description: 'Analyze any book and create a comprehensive report.',
    icon: <BookOutlined />,
    accent: 'primary' as const,
    href: '#',
  },
  {
    key: 'stories',
    title: 'AI Story Generation',
    description: 'Bring your ideas to life with an AI-powered partner.',
    icon: <StarOutlined />,
    accent: 'accent' as const,
    href: '#',
  },
];

const recentReports = [
  {
    title: "Analysis of 'Dune'",
    author: 'Frank Herbert',
    summary:
      'A comprehensive analysis focusing on the intricate political landscape, ecological themes, and messianic prophecies within the desert world of Arrakis.',
    date: 'May 20, 2024',
  },
  {
    title: "Report on 'To Kill a Mockingbird'",
    author: 'Harper Lee',
    summary:
      'Examining themes of racial injustice, moral growth, and the loss of innocence through the eyes of Scout Finch in the American South.',
    date: 'May 15, 2024',
  },
  {
    title: 'The Catcher in the Rye: A Study',
    author: 'J.D. Salinger',
    summary:
      'An exploration of teenage angst, alienation, and the critique of societal phoniness as depicted through the protagonist, Holden Caulfield.',
    date: 'May 12, 2024',
  },
];

const generatedStories = [
  {
    title: 'The Last Starlight',
    type: 'AI Story',
    status: 'completed' as const,
    date: 'May 18, 2024',
    href: '#',
    actionLabel: 'View',
  },
  {
    title: 'Cyberpunk Dreams',
    type: 'AI Story',
    status: 'draft' as const,
    date: 'May 17, 2024',
    href: '#',
    actionLabel: 'Edit',
  },
  {
    title: 'The Enchanted Forest',
    type: 'AI Story',
    status: 'generating' as const,
    date: 'May 16, 2024',
    href: '#',
    actionLabel: 'View',
  },
];

const DashboardPage = () => {
  const {data: currentUser, isLoading: loadingCurrentUser} = useGetCurrentUser();
  
  if (loadingCurrentUser) {
    return <Spin />;
  };

  return (
    <DashboardLayout>
      <Sidebar>
        <SidebarBrand>
          <BrandIcon>
            <BookOutlined />
          </BrandIcon>
          <Title>Story Tailor</Title>
        </SidebarBrand>
        <SidebarNav aria-label="Primary navigation">
          {sidebarLinks.map(({ label, icon, href, active }) => (
            <SidebarLink key={label} $active={active} href={href}>
              {icon}
              <span>{label}</span>
            </SidebarLink>
          ))}
        </SidebarNav>
        <SidebarFooter>
          <SidebarLink href={supportLink.href}>
            {supportLink.icon}
            <span>{supportLink.label}</span>
          </SidebarLink>
        </SidebarFooter>
      </Sidebar>
      <Main>
        <Header>
          <HeaderStart>
            <MobileMenuButton aria-label="Open navigation">
              <MenuOutlined />
            </MobileMenuButton>
            <Title>Welcome, {currentUser.username}!</Title>
          </HeaderStart>
          <HeaderActions>
            <IconButton aria-label="Open settings">
              <SettingOutlined />
            </IconButton>
            <Avatar $image="https://lh3.googleusercontent.com/aida-public/AB6AXuBdRNtZ16GzoWr-5G3wOBRXbBWati6tfb7fsK2RaPSWmbm5bcBZZiKs7zuG-4Wy7Y29fuTJ5R7fXo99mUQr8jMvEuX52PjVfpTtUZtscMCyjHTIap_QatlCOYN5liJTWZNlpT67Le6sCf_ZQbhzJPEMI3dn2mUsN_G-P1At5JehxLWsYT2SvTnYXEppnHXxs4lR8w7TRQRUhe3kgySSA-uP1XbUtHWbUwltvuyO7J7KdMB61qi1F0qK3etk1DH51ZY3qCyjjDodTBo" />
          </HeaderActions>
        </Header>
        <Content>
          <SectionStack>
            <Section aria-labelledby="start-creating">
              <SectionHeading>
                <h2 id="start-creating">Start Creating</h2>
                <p>Choose an option below to begin a new project.</p>
              </SectionHeading>
              <QuickStartGrid>
                {quickStartCards.map(({ key, title, description, icon, accent, href }) => (
                  <ActionCard key={key} $accent={accent} href={href}>
                    <CardIcon>{icon}</CardIcon>
                    <CardBody>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </CardBody>
                    <CardFooter>
                      <span>Start Now</span>
                      <ArrowRightOutlined />
                    </CardFooter>
                    <CardWatermark aria-hidden>
                      {icon}
                    </CardWatermark>
                  </ActionCard>
                ))}
              </QuickStartGrid>
            </Section>

            <Section aria-labelledby="recent-reports">
              <SectionHeader>
                <h2 id="recent-reports">Recent Book Reports</h2>
                <SectionLink href="#">
                  <span>View All</span>
                  <ArrowRightOutlined />
                </SectionLink>
              </SectionHeader>
              <ReportsGrid>
                {recentReports.map(({ title, author, summary, date }) => (
                  <ReportCard key={title}>
                    <ReportMeta>
                      <h3>{title}</h3>
                      <p>by {author}</p>
                    </ReportMeta>
                    <ReportExcerpt>{summary}</ReportExcerpt>
                    <ReportFooter>
                      <span>{date}</span>
                      <ReportActions>
                        <ReportActionButton aria-label={`Edit ${title}`}>
                          <EditOutlined />
                        </ReportActionButton>
                        <ReportActionButton aria-label={`Delete ${title}`}>
                          <DeleteOutlined />
                        </ReportActionButton>
                      </ReportActions>
                    </ReportFooter>
                  </ReportCard>
                ))}
              </ReportsGrid>
            </Section>

            <Section aria-labelledby="recent-stories">
              <SectionHeader>
                <h2 id="recent-stories">Recent Generated Stories</h2>
                <SectionLink href="#">
                  <span>View All</span>
                  <ArrowRightOutlined />
                </SectionLink>
              </SectionHeader>
              <TableWrapper>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Last Modified</th>
                      <th scope="col">
                        <VisuallyHidden>Actions</VisuallyHidden>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedStories.map(({ title, type, status, date, href, actionLabel }) => (
                      <tr key={title}>
                        <td>{title}</td>
                        <td>{type}</td>
                        <td>
                          <StatusBadge $variant={status}>
                            <BadgeDot />
                            <span>{status === 'completed' ? 'Completed' : status === 'draft' ? 'Draft' : 'Generating'}</span>
                          </StatusBadge>
                        </td>
                        <td>{date}</td>
                        <td>
                          <TableAction href={href}>{actionLabel}</TableAction>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrapper>
            </Section>
          </SectionStack>
        </Content>
      </Main>
    </DashboardLayout>
  );
};

export default DashboardPage;
