import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import chat from "../../images/chat.svg";

export const CarouselSlide2: React.FC = () => {
  return (
    <div className="flex flex-col items-center md:flex-row lg:justify-between">
      <Image
        src={chat}
        height={400}
        alt="chat"
        className="z-10 h-auto w-[300px] translate-y-5 md:h-3/4 md:w-3/4 md:translate-x-14 lg:h-full lg:translate-x-20 lg:translate-y-4"
      />
      <Card className="mt-1 w-72 grow -translate-y-2 translate-x-3 rounded bg-white/50 p-0 text-black/60  md:mt-6 md:w-2/3 md:translate-y-0 md:-translate-x-14 lg:w-7/12  lg:-translate-x-24 ">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-sm md:text-lg"
          >
            Keep Track of your Team
          </Typography>
          <Typography className="text-xs md:text-base">
            Make Groups for different teams and meetings to keep your workflow
            organized
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 ">
          <Button onClick={() => signIn("Auht0")} className="text-black/60">
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
