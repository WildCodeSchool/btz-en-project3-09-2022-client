import React from "react";

type IProps = { datePost: Date; noMarginLeft?: boolean };

function DatePost({ datePost, noMarginLeft }: IProps) {
  const toCleanDateFormat = (date: Date) => {
    return date.toLocaleDateString("fr-fr", {
      day: "numeric",
      month: "numeric",
      year: "2-digit",
    });
  };

  const dateToday = toCleanDateFormat(new Date(Date.now()));
  const dateYesterday = toCleanDateFormat(new Date(Date.now() - 86400000));
  const dateDayBeforeYesterday = toCleanDateFormat(
    new Date(Date.now() - 86400000 * 2)
  );
  const datePostClean = toCleanDateFormat(new Date(datePost));
  const hourPostClean = new Date(datePost).toLocaleTimeString("fr-fr", {
    hour: "numeric",
    minute: "numeric",
  });

  const getRelativeDate = () => {
    if (datePostClean === dateToday) {
      return "Auj.";
    }
    if (datePostClean >= dateYesterday && datePostClean < dateToday) {
      return "Hier";
    }
    if (
      datePostClean >= dateDayBeforeYesterday &&
      datePostClean < dateYesterday
    ) {
      return "Avant-hier";
    }
    return `le ${datePostClean}`;
  };

  return (
    <p
      className={`whitespace-nowrap text-mob-xxs(mention+date) md:text-desk-xs(date) ${
        noMarginLeft ? "" : "ml-2"
      } flex-y-center`}
    >
      {getRelativeDate()}
      <br /> à {hourPostClean}
    </p>
  );
}

export default DatePost;
