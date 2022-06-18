import { useParams } from "react-router-dom";

export const Page = () => {
  const { id } = useParams();
  return <>Page {id}</>;
};
