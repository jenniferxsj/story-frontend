import {
  ArrowRightOutlined,
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import {
  ActionCard,
  CardBody,
  CardFooter,
  CardIcon,
  CardWatermark,
  Content,
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
  TableAction,
  TableWrapper,
  VisuallyHidden,
} from "./DashboardPage.styles";
import { useUser } from "../context/UserContext";
import { useGetCurrentUserProfiles } from "../services/profile";
import dayjs from "dayjs";
import { useGetCurrentUserStories } from "../services/story";

const formatDate = (value: string) => {
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format("MMM DD, YYYY") : value;
};

const quickStartCards = [
  {
    key: "reports",
    title: "Book Report Generator",
    description: "Analyze any book and create a comprehensive report.",
    icon: <BookOutlined />,
    accent: "primary" as const,
    href: "#",
  },
  {
    key: "stories",
    title: "AI Story Generation",
    description: "Bring your ideas to life with an AI-powered partner.",
    icon: <StarOutlined />,
    accent: "accent" as const,
    href: "#",
  },
];

const DashboardPage = () => {
  const { user: currentUser, isLoading: loadingCurrentUser } = useUser();
  const username = currentUser?.username;
  const { data: profiles, isLoading: loadingProfiles } =
    useGetCurrentUserProfiles(username, 0, 3, "createdAt,desc");
  const { data: stories, isLoading: loadingStories } = useGetCurrentUserStories(
    username,
    0,
    5,
    "createdAt,desc"
  );

  if (
    loadingCurrentUser ||
    loadingProfiles ||
    !currentUser ||
    !profiles ||
    loadingStories ||
    !stories
  ) {
    return <Spin />;
  }

  return (
    <Content>
      <SectionStack>
        <Section aria-labelledby="start-creating">
          <SectionHeading>
            <h2 id="start-creating">Start Creating</h2>
            <p>Choose an option below to begin a new project.</p>
          </SectionHeading>
          <QuickStartGrid>
            {quickStartCards.map(
              ({ key, title, description, icon, accent, href }) => (
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
                  <CardWatermark aria-hidden>{icon}</CardWatermark>
                </ActionCard>
              )
            )}
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
            {profiles.content?.map(({ title, author, styleSummary, createdAt }) => (
              <ReportCard key={title}>
                <ReportMeta>
                  <h3>{title}</h3>
                  <p>by {author}</p>
                </ReportMeta>
                <ReportExcerpt>{styleSummary}</ReportExcerpt>
                <ReportFooter>
                  <span>{formatDate(createdAt)}</span>
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
                  <th scope="col">Progress (current/target words)</th>
                  <th scope="col">Last Modified</th>
                  <th scope="col">
                    <VisuallyHidden>Actions</VisuallyHidden>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stories.content?.map(
                  ({ title, currentWords, targetWords, createdAt }) => (
                    <tr key={title}>
                      <td>{title}</td>
                      <td>
                        {currentWords} out of {targetWords}
                      </td>
                      <td>{formatDate(createdAt)}</td>
                      <td>
                        <TableAction href={"#"}>{"Edit"}</TableAction>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </TableWrapper>
        </Section>
      </SectionStack>
    </Content>
  );
};

export default DashboardPage;
