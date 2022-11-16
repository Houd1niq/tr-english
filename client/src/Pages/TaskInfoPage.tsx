import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { userApiSlice } from "../services/userApiSlice";

export const TaskInfoPage: React.FC = () => {
  const location = useLocation().pathname.split("/");
  const hashUrl = location[location.length - 1];
  const [getOneTaskQuery] = userApiSlice.useLazyGetOneTaskQuery();
  const [task, setTask] = useState({});
  const test = useMemo(async () => {
    const result = await getOneTaskQuery(hashUrl);
    if (result.data) {
      console.log(result.data);
      return result.data;
    } else {
    }
  }, [getOneTaskQuery, hashUrl]);
  return <>{JSON.stringify(test)}</>;
};
