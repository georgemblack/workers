import { useState } from "react";
import { createPost, deletePost, listPosts } from "@/data/db";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => await listPosts(),
});

function generateRandomPost() {
  const adjectives = [
    "Amazing",
    "Incredible",
    "Wonderful",
    "Fantastic",
    "Brilliant",
    "Stunning",
    "Remarkable",
    "Outstanding",
  ];
  const nouns = [
    "Adventure",
    "Journey",
    "Discovery",
    "Experience",
    "Story",
    "Moment",
    "Insight",
    "Reflection",
  ];
  const topics = [
    "coding",
    "life",
    "technology",
    "nature",
    "creativity",
    "learning",
    "growth",
    "innovation",
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const title = `${adjective} ${noun} in ${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const now = new Date().toISOString();

  return {
    title,
    slug,
    published: now,
    updated: now,
    status: "DRAFT" as const,
    external_link: null,
    content: [
      {
        type: "heading" as const,
        level: 1 as const,
        text: title,
      },
      {
        type: "paragraph" as const,
        text: `This is a randomly generated blog post about ${topic}. It was created to demonstrate the post creation functionality.`,
      },
      {
        type: "paragraph" as const,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      },
    ],
  };
}

function App() {
  const posts = Route.useLoaderData();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreateRandomPost = async () => {
    setIsCreating(true);
    try {
      const postData = generateRandomPost();
      await createPost({ data: postData });
      await router.invalidate();
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }
    setDeletingId(postId);
    try {
      await deletePost({ data: postId });
      await router.invalidate();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <button
            onClick={handleCreateRandomPost}
            disabled={isCreating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {isCreating ? "Creating..." : "Generate Random Post"}
          </button>
        </div>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Link
                  to="/posts/$postId"
                  params={{ postId: post.id }}
                  className="flex-1 min-w-0"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(post.published).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  disabled={deletingId === post.id}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
                >
                  {deletingId === post.id ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
