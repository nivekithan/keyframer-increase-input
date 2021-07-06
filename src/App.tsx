import React, { useCallback, useRef } from "react";
import { useSpring, animated, to, SpringValue, SpringRef } from "react-spring";

import "./styles.css";
import "virtual:windi.css";

export const App = () => {
  return (
    <div className="h-screen w-screen grid place-items-center bg-blue-700">
      <Input />
    </div>
  );
};

const Input = () => {
  const [firstStyles, firstApi] = useSpring(() => ({
    from: {
      xPercent: 50,
      xRem: -1,
    },
  }));

  const [secondStyles, secondApi] = useSpring(() => ({
    from: {
      xPercent: -100,
      xRem: 1,
    },
  }));

  const [thirdStyles, thirdApi] = useSpring(() => ({
    from: {
      x: 100,
    },
  }));

  const [fourStyles, fourApi] = useSpring(() => ({
    from: {
      x: -100,
    },
  }));

  const tension = 500;

  const [leftStyles, leftApi] = useSpring(() => ({
    from: {
      rotate: -45,
      y: 150,
    },

    config: {
      tension,
    },
  }));

  const [rightStyles, rightApi] = useSpring(() => ({
    from: {
      rotate: -45,
      y: 150,
    },
    config: {
      tension,
    },
  }));

  const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    rightApi.start({
      to: {
        y: 0,
      },
    });

    leftApi.start({
      to: {
        y: 0,
      },

      onRest() {
        rightApi.start({
          to: {
            rotate: 45,
          },
        });

        firstApi.start({
          to: {
            xPercent: 0,
            xRem: 0,
          },
        });

        secondApi.start({
          to: {
            xPercent: 0,
            xRem: 0,
          },
        });

        thirdApi.start({
          to: {
            x: 0,
          },
        });

        fourApi.start({
          to: {
            x: 0,
          },
        });
      },
    });
  }, []);

  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    firstApi.start({
      to: { xPercent: 50, xRem: -1 },
    });

    secondApi.start({
      to: { xPercent: -100, xRem: 1 },
    });

    thirdApi.start({
      to: { x: 100 },
    });

    fourApi.start({
      to: {
        x: -100,
      },
    });

    rightApi.start({
      to: {
        rotate: -45,
      },

      onRest() {
        rightApi.start({
          y: 150,
        });

        leftApi.start({
          y: 150,
        });
      },
    });
  }, []);

  return (
    <label>
      <animated.div
        className={`one relative w-70 h-8 opacity-60
        before:(rounded-tl-full rounded-bl-full border-r-0 h-full absolute w-4 border-2 border-white left-0) 
        `}
        style={{
          transform: to(
            [firstStyles.xPercent, firstStyles.xRem],
            (xPercent, xRem) =>
              `translateX(${xPercent}%) translateX(${xRem}rem)`
          ),
        }}
      >
        <animated.div
          className={`two absolute top-0 h-full w-66 left-4 
        before:(rounded-tr-full rounded-br-full border-l-0 h-full absolute w-4 border-2 border-white right-0) 
        `}
          style={{
            transform: to(
              [secondStyles.xPercent, secondStyles.xRem],
              (xPercent, xRem) =>
                `translateX(${xPercent}%) translateX(${xRem}rem)`
            ),
          }}
        >
          <animated.div
            className="three h-full w-62 overflow-hidden"
            style={{ transform: thirdStyles.x.to((x) => `translateX(${x}%)`) }}
          >
            <animated.input
              className="four bg-transparent p-2 outline-none border-2 rounded-none border-white border-l-0 border-r-0 text-white w-full h-full"
              onFocus={onFocus}
              onBlur={onBlur}
              style={{ transform: fourStyles.x.to((x) => `translate(${x}%)`) }}
            />
          </animated.div>
          <Stick leftStyles={leftStyles} rightStyles={rightStyles} />
        </animated.div>
      </animated.div>
    </label>
  );
};

type StickProps = {
  leftStyles: {
    rotate: SpringValue<number>;
    y: SpringValue<number>;
  };

  rightStyles: {
    y: SpringValue<number>;
    rotate: SpringValue<number>;
  };
};

const Stick = ({ leftStyles, rightStyles }: StickProps) => {
  return (
    <div
      className={`h-4 w-[2px] absolute top-0 translate-y-1/2 right-4 transform `}
    >
      <animated.div
        className="absolute top-0 left-0 w-full h-full bg-white"
        style={{
          transform: to(
            [leftStyles.rotate, leftStyles.y],
            (rotate, y) => `rotate(${rotate}deg) translateY(${y}%)`
          ),
        }}
      ></animated.div>
      <animated.div
        className="absolute top-0 left-0 w-full h-full bg-white"
        style={{
          transform: to(
            [rightStyles.rotate, rightStyles.y],
            (rotate, y) => `rotate(${rotate}deg) translateY(${y}%)`
          ),
        }}
      ></animated.div>
    </div>
  );
};
