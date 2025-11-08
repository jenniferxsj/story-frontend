import { BookOutlined } from "@ant-design/icons";
import styled from "styled-components";

const BrandIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 20px;
  color: #2a4d69;

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

const IconComponent = () => {
  return (
    <BrandIcon>
      <BookOutlined />
    </BrandIcon>
  );
};

export default IconComponent;