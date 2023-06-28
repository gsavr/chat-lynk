import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import iphone from "../../images/iphone.svg";
import android from "../../images/android.svg";

export const CarouselSlide3: React.FC = () => {
  return (
    <div className="flex translate-y-9 flex-col items-center gap-0 md:translate-y-0 md:flex-row lg:justify-between lg:gap-10">
      <Image
        src={iphone}
        height={400}
        alt="chat"
        className="z-10 h-[181px] w-[100px] -translate-x-24 translate-y-5 rotate-6 md:h-[400px] md:w-[220px] md:translate-x-0 md:translate-y-0"
      />
      <Card className="mt-1 w-56 rounded bg-white/50 p-0  text-black/60 md:mt-6 md:w-96">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-sm md:text-lg"
          >
            Go Mobile
          </Typography>
          <Typography className="text-xs md:text-base">
            Keep track of converstations on the go
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 ">
          <Button onClick={() => signIn("Auht0")} className="text-black/60">
            Sign up
          </Button>
        </CardFooter>
      </Card>
      <Image
        src={android}
        height={400}
        alt="chat"
        className="h-[186px] w-[100px] -translate-y-16 translate-x-20 -rotate-12 md:h-[400px] md:w-[215px] md:translate-x-0 md:translate-y-0
        "
      />
    </div>
  );
};
