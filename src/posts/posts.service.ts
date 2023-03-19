import { db } from "../utils/db.server";
import { Post } from "./posts.type";

const listAllPosts = async (): Promise<Post[]> => {
  return db.posts.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      content: true,
      upVotes: true,
      downVotes: true,
      authorId: true,
      author: true,
    },
  });
};

const getPost = async (postId: string): Promise<Post | null> => {
  return db.posts.findUnique({
    where: { id: postId },
  });
};

export { listAllPosts, getPost };
