import { useMemo, useState } from "react";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  ActionRowGroup,
  CollectionGrid,
  CollectionPagination,
  CollectionWrapper,
  PageHeader,
  PageLayout,
  PaginationInfo,
  SearchField,
} from "./BookReportPage.styles";
import { Content } from "./DashboardPage.styles";
import { useUser } from "../context/UserContext";
import { useGetCurrentUserOutlines } from "../services/story";
import type { StoryOutline } from "../types/story";
import EmptyComponent from "../component/emptyContent/EmptyContent";
import SummaryCard from "../component/summaryCard/SummaryCard";
import { ActionRowButton } from "../component/summaryCard/SummaryCard.styles";

const pageSize = 6;

const StoryOutlinesPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const searchPlaceholder = user?.username
    ? `Search ${user.username}'s outlines...`
    : "Search outlines...";

  const {
    data: outlinePage,
    isLoading: loadingOutlines,
    isError,
  } = useGetCurrentUserOutlines(
    user?.username,
    currentPage - 1,
    pageSize,
    "createdAt,desc"
  );

  const paginationInfo = useMemo(() => {
    const totalResults = outlinePage?.totalElements ?? 0;
    if (totalResults === 0) {
      return { start: 0, end: 0 };
    }
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalResults);
    return { start, end };
  }, [currentPage, outlinePage?.totalElements]);

  if (isLoading || loadingOutlines || !outlinePage) {
    return (
      <Content>
        <Spin />
      </Content>
    );
  }

  const outlines: StoryOutline[] = outlinePage?.content ?? [];
  const totalResults = outlinePage?.totalElements ?? 0;

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
            <ActionRowButton $variant="primary">
              <PlusOutlined />
              New Outline
            </ActionRowButton>
          </ActionRowGroup>
        </PageHeader>

        <CollectionWrapper>
          {outlines.length === 0 ? (
            <EmptyComponent />
          ) : (
            <CollectionGrid>
              {outlines.map(({ id, displayTitle, userOutlineJson, createdAt }) => {
                const coreSetting =
                  userOutlineJson?.["核心设定"] ??
                  userOutlineJson?.["故事背景"] ??
                  "无";
                const tone = userOutlineJson?.["基调"] ?? "无";
                const createdDate = dayjs(createdAt).format("MMM DD, YYYY");

                const collectionKeyValue: Record<string, string> = {
                  "核心设定": coreSetting,
                  "基调": Array.isArray(tone) ? tone.join(" / ") : tone,
                };

                return (
                  <SummaryCard
                    key={id}
                    id={id}
                    title={displayTitle}
                    metadata={`Created At: ${createdDate}`}
                    collectionKeyValue={collectionKeyValue}
                    handleOnDetail={() => navigate(`/outlines/${id}`)}
                    extraActions={null}
                  />
                );
              })}
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

export default StoryOutlinesPage;
