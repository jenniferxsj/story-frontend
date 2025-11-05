import { useState } from "react";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";

import {
  ActionRow,
  ActionRowButton,
  ActionRowGroup,
  CollectionActions,
  CollectionCard,
  CollectionContent,
  CollectionGrid,
  CollectionMeta,
  CollectionSummary,
  CollectionTitle,
  CollectionWrapper,
  CollectionPagination,
  PageHeader,
  PageLayout,
  SearchField,
} from "./BookReportPage.styles";
import { Content } from "./DashboardPage.styles";
import { useUser } from "../context/UserContext";
import { useGetCurrentUserProfiles } from "../services/profile";
import type { BookProfile } from "../types/story";

const pageSize = 6;

const BookReportPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const searchPlaceholder = user?.username
    ? `Search ${user.username}'s reports...`
    : "Search reports...";

  const username = user?.username;
  const {
    data: profilePage,
    isLoading: loadingProfiles,
    isError,
  } = useGetCurrentUserProfiles(
    username,
    currentPage - 1,
    pageSize,
    "createdAt,desc"
  );

  if (isLoading || loadingProfiles) {
    return (
      <Content>
        <Spin />
      </Content>
    );
  }

  if (!user) {
    return null;
  }

  const reports: BookProfile[] = profilePage?.content ?? [];
  const totalResults = profilePage?.totalElements ?? 0;

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
              New Report
            </ActionRowButton>
          </ActionRowGroup>
        </PageHeader>

        <CollectionWrapper>
          <CollectionGrid>
            {reports.map(
              ({
                id,
                title,
                author,
                userNote,
                styleSummary,
                appealSummary,
              }) => (
                <CollectionCard key={`${id}-${title}`}>
                  <CollectionContent>
                    <div>
                      <CollectionTitle>{title}</CollectionTitle>
                      <CollectionMeta>by {author}</CollectionMeta>
                    </div>
                    <CollectionSummary>
                      <strong>User Note:</strong>
                      <p>{userNote}</p>
                    </CollectionSummary>
                    <CollectionSummary>
                      <strong>Styled Summary:</strong>
                      <p>{styleSummary}</p>
                    </CollectionSummary>
                    <CollectionSummary>
                      <strong>Appeal Summary:</strong>
                      <p>{appealSummary}</p>
                    </CollectionSummary>
                  </CollectionContent>
                  <CollectionActions>
                    <ActionRow>
                      <ActionRowButton $variant="link">Detail</ActionRowButton>
                      <ActionRowButton $variant="ghost">Delete</ActionRowButton>
                    </ActionRow>
                  </CollectionActions>
                </CollectionCard>
              )
            )}
          </CollectionGrid>
          <CollectionPagination>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalResults}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              disabled={isError}
            />
          </CollectionPagination>
        </CollectionWrapper>
      </PageLayout>
    </Content>
  );
};

export default BookReportPage;
