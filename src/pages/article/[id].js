import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  //   console.log(router);
  return <p>Path ID: {id}</p>;
};

export default Post;
