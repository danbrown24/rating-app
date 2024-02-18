import styled, { useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { RatingCategory } from "../lib/constants";
import { useCategoryUI } from "../lib/hooks/useCategoryUI";
import { translate } from "app/i18n";

const HEADER_HEIGHT = 42;

export interface SearchParams {
  category: RatingCategory | null;
  text: string;
}

interface SearchBarProps {
  onSearch?: (arg0: SearchParams) => void;
}

const SearchCont = styled.Pressable<{ active: boolean }>`
  height: 100%;
  border-color: ${(props) => (props.active ? props.theme.colors.searchBarActiveItem : props.theme.colors.transparent)};
  border-bottom-width: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 130px;
`;

const SearchWrapper = styled.View`
  position: absolute;
  height: 100%;
  width: 100px;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  padding-top: 4px;
`;

const Container = styled.SafeAreaView`
  width: 100%;
  background-color: ${(props) => props.theme.colors.searchBarBackground};
  height: ${HEADER_HEIGHT}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const SearchInput = styled.TextInput`
  height: 100%;
  width: 100%;
  /* outline-style: none; */
  margin-left: 6px;
`;

const Separator = styled.View`
  height: 30%;
  width: 1px;
  background-color: lightgrey;
`;

const SearchIcon = styled(Ionicons)`
  margin-top: 2px;
`;

export const SearchBar = observer(({ onSearch }: SearchBarProps) => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const { renderCategories, clearCategory, selectedCategory } = useCategoryUI({
    separators: true,
    iconSize: 20,
    iconColor: theme.colors.searchBarItems,
  });

  useEffect(() => {
    onSearch?.({ category: selectedCategory, text: selectedCategory === null ? searchText : "" });
  }, [selectedCategory, searchText]);

  return (
    <Container>
      {renderCategories()}
      <Separator />
      <SearchCont onPress={() => clearCategory()} active={selectedCategory === null}>
        <SearchWrapper>
          <SearchIcon name="search" size={16} color={theme.colors.searchIcon} />
          <SearchInput
            onChangeText={(val: string) => setSearchText(val)}
            placeholder={translate("searchBar.placeholder")}
            inputMode="search"
            clearButtonMode="always"
            placeholderTextColor={theme.colors.searchPlaceholder}
            style={{}}
          />
        </SearchWrapper>
      </SearchCont>
    </Container>
  );
});

export default SearchBar;
