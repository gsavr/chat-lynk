import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import chat from "../../images/chat.png";

export const CarouselSlide2: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <Image
        src={chat}
        height={400}
        alt="chat"
        className="z-10 h-[150px] w-[218px] translate-y-9 md:h-[400px] md:w-[583px]"
      />
      <Card className="mt-1 w-56 rounded bg-white/50 p-0  text-black/60 md:mt-6 md:w-96">
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
