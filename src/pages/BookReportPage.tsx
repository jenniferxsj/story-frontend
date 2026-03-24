import { useState } from "react";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Pagination, Spin, message } from "antd";

import {
  ActionRowGroup,
  CollectionGrid,
  CollectionWrapper,
  CollectionPagination,
  PaginationInfo,
  PageHeader,
  PageLayout,
  SearchField,
} from "./BookReportPage.styles";
import { Content } from "./DashboardPage.styles";
import { useUser } from "../context/UserContext";
import type { BookProfile } from "../types/story";
import {
  useCreateBookProfile,
  useGetCurrentUserProfiles,
} from "../services/profile";
import EmptyComponent from "../component/emptyContent/EmptyContent";
import SummaryCard from "../component/summaryCard/SummaryCard";
import { ActionRowButton } from "../component/summaryCard/SummaryCard.styles";

const pageSize = 3;

const BookReportPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const searchPlaceholder = user?.username
    ? `Search ${user.username}'s reports...`
    : "Search reports...";

  const username = user?.username ?? "";
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

  const { mutate: createReport, isPending: isCreatingReport } =
    useCreateBookProfile(
      () => {
        form.resetFields();
        setIsModalOpen(false);
        message.success("Book report created");
      },
      (error) => {
        const description =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        message.error(`Failed to create book report: ${description}`);
      },
      username
    );

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCreateReport = async () => {
    const values = await form.validateFields();
    createReport(values);
  };

  if (isLoading || loadingProfiles) {
    return (
      <Content>
        <Spin />
      </Content>
    );
  }

  const reports: BookProfile[] = profilePage?.content ?? [];
  const totalResults = profilePage?.totalElements ?? 0;
  const startIndex = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex =
    totalResults === 0 ? 0 : Math.min(currentPage * pageSize, totalResults);

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
              New Report
            </ActionRowButton>
          </ActionRowGroup>
        </PageHeader>

        <CollectionWrapper>
          {reports.length === 0 ? (
            <EmptyComponent />
          ) : (
            <CollectionGrid>
              {reports.map(
                ({
                  id,
                  title,
                  author,
                  userNote,
                  styleSummary,
                  appealSummary,
                }) => {
                  const collectionKeyValue: Record<string, string> = {
                    "User Note: ": userNote,
                    "Styled Summary: ": styleSummary,
                    "Appeal Summary: ": appealSummary,
                  };
                  return (
                    <SummaryCard
                      id={id}
                      title={title}
                      metadata={`by ${author}`}
                      collectionKeyValue={collectionKeyValue}
                      handleOnDelete={(id) => undefined}
                      handleOnDetail={(id) => undefined}
                    />
                  );
                }
              )}
            </CollectionGrid>
          )}
          <CollectionPagination>
            <PaginationInfo>
              {`Showing ${startIndex} to ${endIndex} of ${totalResults} results`}
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
        </CollectionWrapper>
      </PageLayout>

      <Modal
        open={isModalOpen}
        title="New Report"
        onCancel={handleCloseModal}
        onOk={handleCreateReport}
        okText="Create"
        cancelText="Cancel"
        confirmLoading={isCreatingReport}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Book Title"
            name="title"
            rules={[{ required: true, message: "Please enter the book title" }]}
          >
            <Input placeholder="Enter book title" />
          </Form.Item>
          <Form.Item
            label="Book User"
            name="author"
            rules={[{ required: true, message: "Please enter the book user" }]}
          >
            <Input placeholder="Enter book user" />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default BookReportPage;
