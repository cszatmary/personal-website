import React, {
  useCallback,
  FunctionComponent,
  AnimationEvent,
  MouseEvent,
  TouchEvent,
  ReactNode,
} from "react";

import styles from "@/styles/components/Animation.module.scss";
import { classNames } from "@/utils/mod";

export interface AnimationProps {
  animation: string;
  hover?: boolean;
  repeat?: boolean;
  children?: ReactNode;
}

type HoverEvent<T> = MouseEvent<T> | TouchEvent<T>;

const animationClasses = {
  infinite: styles.animationInfinite,
};

export const Animation: FunctionComponent<AnimationProps> = ({
  animation,
  hover,
  repeat,
  children,
}) => {
  const animationClass = styles[animation];
  const handleMouseEnter = useCallback(
    (event: HoverEvent<HTMLDivElement>) => {
      event.currentTarget.classList.add(animationClass);
      if (repeat) {
        event.currentTarget.classList.add(animationClasses.infinite);
      }
    },
    [animationClass, repeat],
  );

  const handleMouseLeave = useCallback((event: HoverEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove(animationClasses.infinite);
  }, []);

  const handleAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLDivElement>) => {
      event.currentTarget.classList.remove(animationClass);
    },
    [animationClass],
  );

  const classes = classNames(
    styles.animation,
    repeat ? animationClasses.infinite : undefined,
    !hover ? animationClass : undefined,
  );

  return (
    <div
      className={classes}
      onMouseEnter={hover ? handleMouseEnter : undefined}
      onMouseLeave={hover ? handleMouseLeave : undefined}
      onTouchStart={hover ? handleMouseEnter : undefined}
      onTouchEnd={hover ? handleMouseLeave : undefined}
      onAnimationEnd={hover ? handleAnimationEnd : undefined}
    >
      {children}
    </div>
  );
};

Animation.defaultProps = {
  hover: false,
  repeat: false,
};
