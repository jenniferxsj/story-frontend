import { InboxOutlined } from "@ant-design/icons";
import { EmptyState } from "./styles";

const EmptyComponent = () => {
  return (
    <EmptyState>
      <InboxOutlined />
      <span>No Results</span>
    </EmptyState>
  );
};

export default EmptyComponent;