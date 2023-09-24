import React from "react";
import { Typography, Card } from "@material-tailwind/react";

function Home() {
  return (
    <>
      <div className="mx-auto max-w-screen-md py-10">
        <Card className="mb-5 overflow-hidden">
          <img
            alt="nature"
            className="h-[25rem] w-full object-cover object-center"
            src="bookworld.png"
          />
        </Card>
        <Typography variant="h4" color="blue-gray" className="mb-4 center">
        Book World: Where Knowledge and Imagination Unite </Typography>
        <Typography color="gray" className="font-normal">
        The Book World Library stands as a testament to the visionary initiative of Punit Patel Sir, a dedicated advocate of lifelong learning and intellectual enrichment. Nestled within the heart of the community, this literary haven transcends its role as a mere repository of books, evolving into a dynamic center of knowledge, imagination, and cultural exchange.
        </Typography>
      </div>
    </>
  );
}

export default Home;
