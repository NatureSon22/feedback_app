export default [
  {
    _id: "1",
    title: "Feed 1",
    description: "This is feed 1 with a really long description that should be truncated in the UI",
    upvoters: [{ id: 1 }, { id: 2 }],
    categories: ["Bug", "Enhancement"],
    comments: [
      {
        id: 1,
        author: { id: 1 },
        text: "This is a comment",
      },
    ],
  },
  {
    _id: "2",
    title: "Feed 2",
    description: "This is feed 2",
    upvoters: [{ id: 3 }, { id: 4 }],
    categories: ["Feature Request"],
    comments: [
      {
        id: 2,
        author: { id: 2 },
        text: "This is another comment",
      },
    ],
  },
  {
    _id: "3",
    title: "Feed 3",
    description: "This is feed 3",
    upvoters: [{ id: 1 }, { id: 5 }],
    categories: ["Bug"],
    comments: [
      {
        id: 3,
        author: { id: 3 },
        text: "Great idea!",
      },
      {
        id: 4,
        author: { id: 4 },
        text: "Needs improvement",
      },
    ],
  },
  {
    _id: "4",
    title: "Feed 4",
    description: "This is feed 4",
    upvoters: [{ id: 2 }, { id: 6 }],
    categories: ["Enhancement"],
    comments: [
      {
        id: 5,
        author: { id: 1 },
        text: "I totally agree",
      },
    ],
  },
  {
    _id: "5",
    title: "Feed 5",
    description: "This is feed 5",
    upvoters: [{ id: 4 }, { id: 5 }],
    categories: ["Feature Request", "Bug"],
    comments: [
      {
        id: 6,
        author: { id: 2 },
        text: "This needs to be fixed ASAP",
      },
    ],
  },
  {
    _id: "6",
    title: "Feed 6",
    description: "This is feed 6",
    upvoters: [{ id: 3 }, { id: 6 }],
    categories: ["Feature Request", "Enhancement"],
    comments: [
      {
        id: 7,
        author: { id: 3 },
        text: "Great feature request",
      },
      {
        id: 8,
        author: { id: 1 },
        text: "Can't wait for this to be implemented",
      },
    ],
  },
  {
    _id: "7",
    title: "Feed 7",
    description: "This is feed 7",
    upvoters: [{ id: 1 }, { id: 3 }],
    categories: ["Bug", "Enhancement"],
    comments: [
      {
        _id: 9,
        author: { id: 2 },
        text: "This bug is really annoying",
      },
      {
        id: 10,
        author: { id: 5 },
        text: "Please fix this soon",
      },
    ],
  },
  {
    _id: "8",
    title: "Feed 8",
    description: "This is feed 8",
    upvoters: [{ id: 2 }, { id: 4 }],
    categories: ["Bug", "Enhancement"],
    comments: [
      {
        id: 11,
        author: { id: 2 },
        text: "This bug is really annoying",
      },
    ],
  },
];
