/* eslint-disable max-len */
const en = {
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle: ":(",
    reset: "RESET APP",
  },
  loginScreen: {
    tabTitle: "Savvy - Login",
    title: "Welcome to Savvy",
    login: "Login",
  },
  dashboardScreen: {
    tabTitle: "Savvy - Dashboard",
    noRatingsHead: "No ratings found.",
    noRatingsSub: "Try another category or search.",
  },
  addScreen: {
    tabTitle: "Savvy - Add rating",
    addTitle: "Add a rating",
    add: "Add",
    addAnother: "Add another",
    ratingHead: "How was it?",
    titlePlaceholder: "What are you rating today?",
    success: "Your rating for {{name}} has been added!",
    ratingPlaceholder10: "Come on now, are you saying there was no room for improvement?",
    ratingPlaceholder9: "Pretty good then! What could have pushed it up?",
    ratingPlaceholder6_8: "Above average! What were the highlights?",
    ratingPlaceholder5: "Average, huh? What could've been better?",
    ratingPlaceholder2_4: "Well not completely terrible! What was okay?",
    ratingPlaceholder1: "Please describe how bad it was so you don't make this mistake again.",
    ratingPlaceholder: "Give it a rate.",
  },
  searchBar: {
    placeholder: "Search",
  },
  header: {
    title: "Savvy",
  },
};

export default en;
export type Translations = typeof en;
