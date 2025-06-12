export const selectTitleOrFirstMessage = (
  title: string,
  firstMessage: string | undefined | null,
) => {
  if (title.trim() !== "") {
    return title;
  } else if (
    firstMessage !== null &&
    firstMessage !== undefined &&
    firstMessage.trim() !== ""
  ) {
    return firstMessage;
  } else {
    return "No title";
  }
};
