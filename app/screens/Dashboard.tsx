import { observer } from "mobx-react-lite";
import { Screen, Text } from "../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigators";
import { useStores } from "../models";
import RatingItem from "../components/RatingItem";
import SearchBar, { SearchParams } from "../components/SearchBar";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import { LayoutRectangle, ListRenderItemInfo } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { translate } from "app/i18n";

const Dashboard = observer(({ navigation }: NativeStackScreenProps<AppStackParamList, "dashboard">) => {
  const { ratingsStore } = useStores();
  const [searchParams, setSearchParams] = useState<SearchParams>({ category: null, text: "" });
  const [contRect, setContRect] = useState<LayoutRectangle>();

  useEffect(() => navigation.setOptions({ title: translate("dashboardScreen.tabTitle") }));

  const filteredList = useMemo(() => {
    return ratingsStore.ratings.filter((item) => {
      const isCategoryMatch = !searchParams.category || item.category === searchParams.category;
      const isTextMatch = !searchParams.text || item.name.toUpperCase().indexOf(searchParams.text.toUpperCase()) >= 0;
      return isCategoryMatch && isTextMatch;
    });
  }, [ratingsStore.ratings.length, searchParams]);

  return (
    <Screen
      onLayout={(event) => {
        setContRect(event.nativeEvent.layout);
      }}
    >
      <SearchBar onSearch={setSearchParams} />
      {!filteredList.length && (
        <NoResultsCont>
          <CentredText tx="dashboardScreen.noRatingsHead" />
          <CentredText tx="dashboardScreen.noRatingsSub" />
        </NoResultsCont>
      )}
      <FlatList
        data={filteredList}
        renderItem={({ item }: ListRenderItemInfo<(typeof ratingsStore.ratings)[0]>) => (
          <RatingItem name={item.name} category={item.category} rating={item.rating} comments={item.comments} />
        )}
        keyExtractor={(item) => item.name}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          marginTop: 8,
          height: contRect ? contRect.height - 42 - 8 : 0, // The list doesn't scroll on web unless explicitly given a height
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Screen>
  );
});

const NoResultsCont = styled.View`
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 160px;
  padding: 20px;
`;
const CentredText = styled(Text)`
  text-align: center;
  font-size: 16px;
  line-height: 30px;
`;

export default Dashboard;
