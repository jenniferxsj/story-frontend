import { useMemo, useState } from "react";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";

import { useUser } from "../context/UserContext";
import {
  useGetCurrentUserStories,
} from "../services/story";
import type { Story } from "../types/story";
import { Content } from "./DashboardPage.styles";
import {
  PaginationInfo,
  StoryLabel,
  StoryMetaList,
  StoryMetaRow,
  StoryPagination,
  StoryValue,
} from "./StoryPage.styles";
import {
  ActionRow,
  ActionRowButton,
  ActionRowGroup,
  CollectionActions,
  CollectionCard,
  CollectionContent,
  CollectionGrid,
  CollectionMeta,
  CollectionPagination,
  CollectionTitle,
  CollectionWrapper,
  PageHeader,
  PageLayout,
  SearchField,
} from "./BookReportPage.styles";
import EmptyComponent from "../component/emptyContent/EmptyContent";
import dayjs from "dayjs";

const pageSize = 6;

const StoryPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchPlaceholder = user?.username
    ? `Search ${user.username}'s reports...`
    : "Search reports...";

  const username = user?.username ?? "";

  const {
    data: storyPage,
    isLoading: loadingStories,
    isError,
  } = useGetCurrentUserStories(
    username,
    currentPage - 1,
    pageSize,
    "createdAt,desc"
  );

  const stories: Story[] = storyPage?.content ?? [];
  const totalResults = storyPage?.totalElements ?? 0;

  const paginationInfo = useMemo(() => {
    if (totalResults === 0) {
      return { start: 0, end: 0 };
    }
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalResults);
    return { start, end };
  }, [currentPage, totalResults]);

  if (isLoading || loadingStories) {
    return (
      <Content>
        <Spin />
      </Content>
    );
  };

  return (
    <Content>
      <PageLayout>
        <PageHeader>
          <SearchField placeholder={searchPlaceholder} type="search" />
          <ActionRowGroup>
            <ActionRowButton $variant="subtle">
              <FilterOutlined />
              Filter
            </ActionRowButton>
            <ActionRowButton
              $variant="primary"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusOutlined />
              New Story
            </ActionRowButton>
          </ActionRowGroup>
        </PageHeader>
        <CollectionWrapper>
          {stories.length === 0 ? (
            <EmptyComponent />
          ) : (
            <CollectionGrid>
              {stories.map(
                ({
                  id,
                  title,
                  currentWords,
                  targetWords,
                  stateJson,
                  createdAt,
                }) => {
                  const wordCountLabel = `${currentWords.toLocaleString()} / ${targetWords.toLocaleString()}`;
                  const createdDate = dayjs(createdAt).format("MMM DD, YYYY");
                  return (
                    <CollectionCard key={id}>
                      <CollectionContent>
                      <div>
                        <CollectionTitle>{title}</CollectionTitle>
                        <CollectionMeta>
                          Created At: {createdDate}
                        </CollectionMeta>
                      </div>
                        <StoryMetaList>
                          <StoryMetaRow>
                            <StoryLabel>Word Count</StoryLabel>
                            <StoryValue>{wordCountLabel}</StoryValue>
                          </StoryMetaRow>
                          <StoryMetaRow>
                            <StoryLabel>Core Setting</StoryLabel>
                            <StoryValue>{stateJson?.storyOutline["核心设定"] ?? "无"}</StoryValue>
                          </StoryMetaRow>
                        </StoryMetaList>
                      </CollectionContent>
                      <CollectionActions>
                        <ActionRow>
                          <ActionRowButton $variant="link">Detail</ActionRowButton>
                          <ActionRowButton $variant="ghost">Delete</ActionRowButton>
                        </ActionRow>
                      </CollectionActions>
                    </CollectionCard>
                  );
                }
              )}
            </CollectionGrid>
          )}
        </CollectionWrapper>

        <CollectionPagination>
          <PaginationInfo>
            {`Showing ${paginationInfo.start} to ${paginationInfo.end} of ${totalResults} results`}
          </PaginationInfo>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalResults}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            disabled={isError}
          />
        </CollectionPagination>
      </PageLayout>
    </Content>
  );
};

export default StoryPage;
