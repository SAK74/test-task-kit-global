import { Paths } from "@/routes";
import { Link, useParams } from "react-router";

export const Details = () => {
  const params = useParams();
  console.log({ params });

  const id = params.id;
  return (
    <>
      <h1>Details view</h1>
      <p>ID: {id}</p>
      <Link to={`${Paths.root}`}>Go to view</Link>
    </>
  );
};
