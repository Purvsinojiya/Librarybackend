import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function BookCard(props) {
  return (
    <Card className="w-[15rem] border-t-[7px]">
      <CardHeader shadow={false} floated={false} className="h-[12rem]">
        <img
          src={props.imageURL}
          alt="card"
          className="h-full w-full object-scale-down"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-0 center border-t-[2px]">
          <Typography color="blue-gray" className="font-medium">
            {props.title}
          </Typography>
        </div>
        <Typography color="gray" className="font-normal opacity-75 text-xs">
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={true}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Issue
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BookCard;
