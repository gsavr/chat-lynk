import { useState, useEffect } from "react";
import { format } from "date-fns";

export const useDateFormat = (unformattedDate: string) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    if (unformattedDate) {
      let formattedDate = new Date(unformattedDate);
      setDate(format(formattedDate, "PPP"));
    }
  }, [unformattedDate]);

  return date;
};
