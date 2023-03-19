import { User } from "../users/users.types";

export type Post = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  content?: string;
  upVotes?: number;
  downVotes?: number;
  authorId?: string;
  author?: User;
  //   Comments: Comments[];
};
