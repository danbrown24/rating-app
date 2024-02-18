import { observer } from "mobx-react-lite";
import { Screen, Button, TextField } from "../components";
import styled, { useTheme } from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../navigators";
import { useStores } from "../models";
import { useCategoryUI } from "../lib/hooks/useCategoryUI";
import { Rating as RatingControl } from "react-native-ratings";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { translate } from "app/i18n";

enum PageState {
  FORM = "form",
  ADDING = "adding",
  ADDED = "added",
}

const Add = observer(({ navigation }: NativeStackScreenProps<AppStackParamList, "add">) => {
  const starWidth = Math.min(Dimensions.get("window").width, 400) / 11;
  const theme = useTheme();
  const { ratingsStore } = useStores();
  const { renderCategories, selectedCategory } = useCategoryUI({ iconColor: theme.colors.searchBarItems });
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [state, setState] = useState(PageState.FORM);

  useEffect(() => navigation.setOptions({ title: translate("addScreen.tabTitle") }));

  const params = { rating, category: selectedCategory, comments, name };
  const canSubmit = params.name && params.rating && state === PageState.FORM;

  return (
    <Screen>
      <Title>{translate("addScreen.addTitle")}</Title>
      {[PageState.FORM, PageState.ADDING].includes(state) && (
        <>
          <Name onChangeText={setName} placeholder={translate("addScreen.titlePlaceholder")} />
          <CategoryCont>{renderCategories()}</CategoryCont>
          <Label>{translate("addScreen.ratingHead")}</Label>
          <RatingControl
            type="custom"
            ratingCount={10}
            startingValue={0}
            minValue={1}
            imageSize={starWidth}
            onFinishRating={setRating}
            tintColor={theme.colors.background}
            ratingBackgroundColor="grey"
          />

          <Comments onChangeText={setComments} placeholder={getCommentsPlaceholder(rating)} multiline={true} />
          <Submit
            disabled={!canSubmit}
            onPress={async () => {
              try {
                if (!params.category) {
                  throw new Error("No category selected");
                }
                setState(PageState.ADDING);
                await ratingsStore.addRating({ ...params, category: params.category });
                setState(PageState.ADDED);
              } catch (e) {
                console.error("Error adding rating: ", e);
              }
            }}
            text={translate("addScreen.add")}
          />
        </>
      )}
      {state === PageState.ADDED && (
        <>
          <CompletionText>{translate("addScreen.success", { name })}</CompletionText>
          <Submit onPress={() => setState(PageState.FORM)} text={translate("addScreen.addAnother")} />
        </>
      )}
    </Screen>
  );
});

const CategoryCont = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 14px;
  margin-bottom: 0px;
  padding: 0 20px;
  height: 44px;
  padding: 0 40px;
`;

const Name = styled(TextField)``;

const Comments = styled(TextField)``;

const Submit = styled(Button)`
  margin-top: 30px;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 24px;
  margin: 20px 16px 0;
  color: ${(props) => props.theme.colors.heading};
`;

const Label = styled.Text`
  font-weight: 600;
  margin: 20px 16px 10px 16px;
  color: ${(props) => props.theme.colors.heading};
`;

const CompletionText = styled.Text`
  text-align: center;
  font-size: 16px;
  margin: 40px 10px 10px;
`;

const getCommentsPlaceholder = (rating: number) => {
  if (rating > 9) {
    return translate("addScreen.ratingPlaceholder10");
  }
  if (rating > 8) {
    return translate("addScreen.ratingPlaceholder9");
  }
  if (rating > 5) {
    return translate("addScreen.ratingPlaceholder6_8");
  }
  if (rating > 4) {
    return translate("addScreen.ratingPlaceholder5");
  }
  if (rating > 1) {
    return translate("addScreen.ratingPlaceholder2_4");
  }
  if (rating > 0) {
    return translate("addScreen.ratingPlaceholder1");
  }
  return translate("addScreen.ratingPlaceholder");
};

export default Add;
