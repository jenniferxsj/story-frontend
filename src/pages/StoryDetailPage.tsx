import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { Content } from "./DashboardPage.styles";
import { useGetStoryById } from "../services/story";

const StoryDetailPage: React.FC = () => {
  const params = useParams();
  const storyId = params.storyId ? Number(params.storyId) : undefined;

  const { data: story, isLoading } = useGetStoryById(storyId);

  if (isLoading) {
    return (
      <Content>
        <Spin />
      </Content>
    );
  }

  return (
    <Content>
      <div>
        <h2>{story?.title ?? "Story Detail"}</h2>
        <p>{story ? `Story ID: ${story.id}` : "Story not found."}</p>
      </div>
    </Content>
  );
};

export default StoryDetailPage;
