import { useState } from "react";
import styled from "styled-components/native";
import { RatingCategory } from "../lib/constants";
import { typography } from "../theme";
import { Text } from "./Text";

interface RatingItemProps {
  /**
   * Display name of the item
   */
  name: string;
  /**
   * The category for this item
   */
  category: RatingCategory;
  /**
   * Rating out of 10
   */
  rating: number;
  /**
   * Any user comments/notes
   */
  comments?: string | null;
}

const RatingItem = (props: RatingItemProps) => {
  const { name, rating, comments } = props;
  const [showDetail, setShowDetail] = useState(false);

  return (
    <Container>
      <Content showBottomBorder={showDetail} onPress={() => setShowDetail(!showDetail)}>
        <Name>{name}</Name>
        <Rating>{rating}</Rating>
      </Content>
      {showDetail && (
        <Detail>
          <Date>{"12/01/23"}</Date>
          <Comments>{comments}</Comments>
        </Detail>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.ratingItemBackground};
  margin: 4px 0;
  margin-bottom: 0px;
  border: 0px solid ${(props) => props.theme.colors.ratingItemBorder};
  border-bottom-width: 1px;
`;

const Content = styled.Pressable<{ showBottomBorder: boolean }>`
  padding: 10px 16px;
  border: 0px solid ${(props) => props.theme.colors.ratingItemBorder};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.showBottomBorder ? props.theme.colors.ratingItemDetailBorder : "transparent"};
`;

const Name = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  font-weight: 700;
  font-family: ${typography.primary.bold};
`;

const Rating = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  position: absolute;
  top: 11px;
  right: 16px;
  font-size: 20px;
`;

const Comments = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  margin-top: 18px;
`;

const Date = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  position: absolute;
  top: 4px;
  right: 10px;
  font-size: 12px;
`;

const Detail = styled.View`
  background-color: ${(props) => props.theme.colors.ratingItemDetailBackground};
  width: 100%;
  padding: 10px 16px;
`;

export default RatingItem;
