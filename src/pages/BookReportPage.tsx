import { useState } from "react";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Pagination, Spin, message } from "antd";

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
import type { BookProfile } from "../types/story";
import {
  useCreateBookProfile,
  useGetCurrentUserProfiles,
} from "../services/profile";

const pageSize = 6;

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
        message.error("Failed to create book report: ", error.message);
      }, username
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
            <ActionRowButton $variant="primary" onClick={() => setIsModalOpen(true)}>
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

      <Modal
        open={isModalOpen}
        title="New Report"
        onCancel={handleCloseModal}
        onOk={handleCreateReport}
        okText="Create"
        cancelText="Cancel"
        confirmLoading={isCreatingReport}
        destroyOnHidden
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
