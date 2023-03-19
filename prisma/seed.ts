import { db } from "../src/utils/db.server";

type User = {
  name: string;
  userId: string;
  email: string;
  password: string;
};

type Post = {
  title: string;
  content: string;
  upVotes: number;
  downVotes: number;
  //   authorId: string;
};

type Comment = {
  comment: string;
  //   authorId: string;
  //   postId: string;
};

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.users.create({
        data: {
          ...user,
        },
      });
    })
  );

  const user = await db.users.findFirst({
    where: {
      userId: "ashish",
    },
  });

  await Promise.all(
    getPosts().map((post) => {
      return db.posts.create({
        data: {
          ...post,
          authorId: user!.id,
        },
      });
    })
  );

  const post = await db.posts.findFirst({
    where: {
      title: "Vestibulum ac diam",
    },
  });

  await Promise.all(
    getComments().map((comment) => {
      return db.comments.create({
        data: {
          ...comment,
          authorId: user!.id,
          postId: post!.id,
        },
      });
    })
  );
}

seed();

function getUsers(): User[] {
  return [
    {
      name: "Ashish",
      userId: "ashish",
      email: "ashish@test.com",
      password: "pass",
    },
    {
      name: "John",
      userId: "john",
      email: "john@test.com",
      password: "pass",
    },
    {
      name: "Jane",
      userId: "jane",
      email: "jane@test.com",
      password: "pass",
    },
    {
      name: "Rahul",
      userId: "rahul",
      email: "rahul@test.com",
      password: "pass",
    },
  ];
}

function getPosts(): Post[] {
  return [
    {
      title: "Vestibulum ac diam",
      content:
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit.Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat.",
      upVotes: 10,
      downVotes: 5,
    },
    {
      title: "Proin eget tortor risus.",
      content:
        "Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
      upVotes: 10,
      downVotes: 5,
    },
    {
      title: "Curabitur aliquet quam",
      content:
        "Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta.",
      upVotes: 10,
      downVotes: 5,
    },
    {
      title: "Praesent sapien massa",
      content:
        "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor accumsan tincidunt. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
      upVotes: 10,
      downVotes: 5,
    },
  ];
}

function getComments(): Comment[] {
  return [
    {
      comment:
        "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus nibh.",
    },
    {
      comment:
        "Nulla quis lorem ut libero malesuada feugiat. Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula sed magna dictum porta.",
    },
    {
      comment:
        "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Sed porttitor lectus nibh.",
    },
    {
      comment:
        "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh.",
    },
  ];
}
