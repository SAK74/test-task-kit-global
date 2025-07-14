import type { Post } from "@/schema";

export const fakePosts: Post[] = [
  {
    title: "My title A",
    content: "Some new content",
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
