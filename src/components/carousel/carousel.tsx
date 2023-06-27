import { Carousel, IconButton } from "@material-tailwind/react";
import { IconBxRightArrow, IconBxLeftArrow } from "../svg-icons/svg-icons";
import { CarouselSlide1 } from "./car-slide-1";
import { CarouselSlide2 } from "./car-slide-2";
import { CarouselSlide3 } from "./car-slide-3";

export const CarouselLanding: React.FC = () => {
  return (
    <Carousel
      transition={{ type: "tween", duration: 2 }}
      // autoplay
      // autoplayDelay={5000}
      loop
      draggable
      color="black"
      className=""
      /* custom arrows */
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <IconBxLeftArrow height="24px" width="20px" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <IconBxRightArrow height="24px" width="20px" />
        </IconButton>
      )}
      /* custom bottom nav */
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {/* Slide 1 */}
      <div className="carousel-slide">
        <CarouselSlide1 />
      </div>
      {/* Slide 2 */}
      <div className="carousel-slide">
        <CarouselSlide2 />
      </div>
      {/* Slide 3 */}
      <div className="carousel-slide">
        <CarouselSlide3 />
      </div>
    </Carousel>
  );
};
