import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { RatingCategory } from "./constants";

type IconProps = React.ComponentProps<typeof Ionicons> &
  React.ComponentProps<typeof MaterialCommunityIcons> &
  React.ComponentProps<typeof MaterialIcons>;

export type CategoryIconProps = Omit<IconProps, "name"> & {
  category: RatingCategory;
};

export const CategoryIcon = ({ category, ...rest }: CategoryIconProps) => {
  switch (category) {
    case RatingCategory.FOOD_AND_DRINK:
      return <Ionicons name="fast-food-outline" size={26} {...rest} />;
    case RatingCategory.TV_SHOWS:
      return <MaterialIcons name="live-tv" size={26} {...rest} />;
    case RatingCategory.MOVIES:
      return <MaterialCommunityIcons name="movie-open" size={26} {...rest} />;
    case RatingCategory.MUSIC:
      return <Ionicons name="musical-notes" size={26} {...rest} />;
    default:
      return null;
  }
};
