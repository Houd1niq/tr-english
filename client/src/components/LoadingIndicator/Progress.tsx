import { useNProgress, withNProgress } from "@tanem/react-nprogress";
import React from "react";

import Bar from "./Bar";
import LoadingContainer from "./LoadingContainer";
import { useAppSelector } from "../../store/store";
import { isLoadingSelector } from "../../store/selectors/isLoading";

const Progress = () => {
  const isLoading = useAppSelector(isLoadingSelector);
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isLoading,
  });

  return (
    <LoadingContainer
      animationDuration={animationDuration}
      isFinished={isFinished}
    >
      <Bar animationDuration={animationDuration} progress={progress} />
    </LoadingContainer>
  );
};
export default withNProgress(Progress);
