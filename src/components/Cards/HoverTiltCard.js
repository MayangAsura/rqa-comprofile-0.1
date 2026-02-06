import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";
const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const HoverTilt = ({featured_image, title, description}) => {
    return (
      
          <div className="inset-4 flex-wrap grid gap-6 place-content-center py-2 px-3 text-center">
            {/* md:w-5/12  */}
                  <div className="relative flex  flex-col min-w-0 break-words pt-0 p-2 bg-white w-full shadow-lg rounded-lg">
                    <img
                      alt="..."
                      src={featured_image}
                      className="w-full align-middle rounded-t-lg
                              shadow-lg rounded-full mx-auto max-w-200-px transform hover:skew-[3.142rad]"
                    />
                    <h5 className="text-xl font-bold mt-3">{title}</h5>
                    <p className="relative mt-2 mb-4 text-lg leading-relaxed text-blueGray-500">
                      {description}
                    </p>
                  </div>
                </div>
    )
  }

const HoverTiltCard = ({featured_image, title, description}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;


  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className=" relative w-full md:w-4/12 flex h-96 w-72 my-2 mx-2 rounded-xl bg-gradient-to-br from-[#9dd7fc] indigo-300 to-[#bfe6ff]"
    >
      {/* <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute rounded-xl bg-white shadow-lg"
      > */}
        {/* <FiMousePointer
          style={{
            transform: "translateZ(75px)",
          }}
          className="mx-auto text-4xl"
        /> */}
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className=" text-center text-2xl "
        >
          {/* font-bold */}
          <HoverTilt featured_image={featured_image} title={title} description={description} />
        </p>
      {/* </div> */}
    </motion.div>
  );
};

export default HoverTiltCard