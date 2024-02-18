import { useCallback, useState } from "react";
import styled from "styled-components/native";
import { CategoryIcon } from "../utils";
import { RatingCategory } from "../constants";

interface UseCategoryUIProps {
  defaultCategory?: RatingCategory;
  separators?: boolean;
  iconSize?: number;
  iconColor?: string;
}

export const useCategoryUI = (props?: UseCategoryUIProps) => {
  const [selectedCategory, setSelectedCategory] = useState<RatingCategory | null>(
    props?.defaultCategory || RatingCategory.FOOD_AND_DRINK,
  );

  const makeIconContAttributes = (category: RatingCategory) => ({
    onPress: () => setSelectedCategory(category),
    active: selectedCategory === category,
  });

  const renderIcon = (category: RatingCategory) => {
    return (
      <IconCont {...makeIconContAttributes(category)}>
        <CategoryIcon category={category} color={props?.iconColor} size={props?.iconSize || 24} />
      </IconCont>
    );
  };

  const enumValues = Object.values(RatingCategory);
  const categoryValues = enumValues.slice(enumValues.length / 2) as RatingCategory[];

  const renderCategories = () => (
    <>
      {categoryValues.map((cat, i, arr) => (
        <ItemWrapper key={i}>
          {renderIcon(cat)}
          {props?.separators && i !== arr.length - 1 && <Separator />}
        </ItemWrapper>
      ))}
    </>
  );

  return {
    selectedCategory,
    renderCategories,
    clearCategory: useCallback(() => setSelectedCategory(null), []),
  };
};

const ItemWrapper = styled.View`
  height: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const IconCont = styled.Pressable<{ active: boolean }>`
  height: 100%;
  margin: 10px 0;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border-color: ${(props) => (props.active ? props.theme.colors.searchBarActiveItem : props.theme.colors.transparent)};
  border-bottom-width: 4px;
`;

const Separator = styled.View`
  height: 30%;
  width: 1px;
  background-color: lightgrey;
`;
