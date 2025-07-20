import type { Post } from "@/schema";

export const fakePosts: Post[] = [
  {
    title: "My title A",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    id: "EN7xBwgFZ7Vr0UoTJByV",
    timestamp: 123456789,
    comments: [
      {
        text: "some positive comment",
        timestamp: 766554332233,
        by: "Unknown author",
      },
      { text: "any hate comment", timestamp: 766554332233, by: "Zombie" },
    ],
  },

  {
    content: "Some new content",
    title: "My title B",
    id: "divxjdv9EP8HvvTrHfpm",
    timestamp: 234,
    comments: [],
  },
  {
    content: "Some new content",
    title: "My new title",
    id: "ks5LahmDnBMB1j7UVWne",
    timestamp: 345,
    comments: [],
  },
];
