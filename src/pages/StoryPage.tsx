import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";

import { useUser } from "../context/UserContext";
import { useGetCurrentUserStories } from "../services/story";
import type { Story } from "../types/story";
import { Content } from "./DashboardPage.styles";
import { PaginationInfo } from "./StoryPage.styles";
import {
  ActionRowGroup,
  CollectionGrid,
  CollectionPagination,
  CollectionWrapper,
  PageHeader,
  PageLayout,
  SearchField,
} from "./BookReportPage.styles";
import EmptyComponent from "../component/emptyContent/EmptyContent";
import dayjs from "dayjs";
import SummaryCard from "../component/summaryCard/SummaryCard";
import { ActionRowButton } from "../component/summaryCard/SummaryCard.styles";

const pageSize = 6;

const StoryPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchPlaceholder = user?.username
    ? `Search ${user.username}'s story...`
    : "Search stories...";

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

  const navigate = useNavigate();

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
  }

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
                  outlineId,
                  title,
                  currentWords,
                  targetWords,
                  stateJson,
                  createdAt,
                }) => {
                  const wordCountLabel = `${currentWords.toLocaleString()} / ${targetWords.toLocaleString()}`;
                  const createdDate = dayjs(createdAt).format("MMM DD, YYYY");
                  const collectionKeyValue: Record<string, string> = {
                    "Word Count: ": wordCountLabel,
                    "Core Setting: ":
                      stateJson?.storyOutline["核心设定"] ?? "无",
                  };
                  return (
                    <SummaryCard
                      id={id}
                      title={title}
                      metadata={`Created At: ${createdDate}`}
                      collectionKeyValue={collectionKeyValue}
                      handleOnDelete={(id) => undefined}
                      handleOnDetail={() =>
                        navigate(`/stories/${id}`, {
                          state: {
                            story: {
                              id,
                              outlineId,
                              title,
                              currentWords,
                              targetWords,
                              stateJson,
                              createdAt,
                            },
                          },
                        })
                      }
                    />
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
