import { useState } from "react";
import { getPost, updatePost } from "@/data/db";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Banner,
  Breadcrumbs,
  Button,
  Input,
  Select,
  Text,
} from "@cloudflare/kumo";
import type { Post, ContentBlock } from "@/data/types";
import {
  SortableBlockItem,
  type BlockWithId,
} from "@/components/SortableBlockItem";

export const Route = createFileRoute("/posts/$postId")({
  ssr: "data-only",
  component: RouteComponent,
  loader: async ({ params }) => await getPost({ data: params.postId }),
});

type PostStatus = "draft" | "published" | "idea" | "hidden";

function generateBlockId(): string {
  return crypto.randomUUID();
}

function addIdsToBlocks(blocks: ContentBlock[]): BlockWithId[] {
  return blocks.map((block) => ({
    ...block,
    _id: generateBlockId(),
  }));
}

function removeIdsFromBlocks(blocks: BlockWithId[]): ContentBlock[] {
  return blocks.map(({ _id, ...block }) => block as ContentBlock);
}

// Emoji constants
const EMOJI = {
  markdown: "\uD83D\uDCDD", // Memo
  image: "\uD83D\uDDBC\uFE0F", // Framed picture
  video: "\uD83C\uDFA5", // Movie camera
  back: "\u2B05\uFE0F", // Left arrow
  close: "\u2716\uFE0F", // Heavy multiplication X
};

// Add Block Row
interface AddBlockRowProps {
  onAdd: (type: ContentBlock["type"]) => void;
}

function AddBlockRow({ onAdd }: AddBlockRowProps) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Text variant="secondary" size="sm">
        Add block:
      </Text>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onAdd("markdown")}
        aria-label="Add Markdown"
      >
        {EMOJI.markdown} Markdown
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onAdd("image")}
        aria-label="Add Image"
      >
        {EMOJI.image} Image
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onAdd("video")}
        aria-label="Add Video"
      >
        {EMOJI.video} Video
      </Button>
    </div>
  );
}

// Error Alert
interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <Banner variant="error">Error saving post: {message}</Banner>
      </div>
      <Button
        variant="secondary"
        shape="square"
        size="sm"
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        {EMOJI.close}
      </Button>
    </div>
  );
}

// Metadata Section
interface MetadataSectionProps {
  title: string;
  published: string;
  slug: string;
  status: PostStatus;
  externalLink: string | null;
  onChange: (field: string, value: string | null) => void;
}

function MetadataSection({
  title,
  published,
  slug,
  status,
  externalLink,
  onChange,
}: MetadataSectionProps) {
  // Convert ISO string to datetime-local format
  const toDatetimeLocal = (isoString: string): string => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  // Convert datetime-local to ISO string
  const toISOString = (datetimeLocal: string): string => {
    return new Date(datetimeLocal).toISOString();
  };

  return (
    <div className="flex flex-col gap-4">
      <Text variant="heading3" as="h2">
        Post Metadata
      </Text>
      <div className="flex flex-col gap-4">
        <Input
          label="Title"
          size="sm"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Post title..."
        />
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              label="Published Date"
              size="sm"
              type="datetime-local"
              value={toDatetimeLocal(published)}
              onChange={(e) =>
                onChange("published", toISOString(e.target.value))
              }
            />
          </div>
          <div className="w-36">
            <Select
              label="Status"
              value={status}
              onValueChange={(value) => onChange("status", String(value))}
            >
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="published">Published</Select.Option>
              <Select.Option value="idea">Idea</Select.Option>
              <Select.Option value="hidden">Hidden</Select.Option>
            </Select>
          </div>
        </div>
        <Input
          label="Slug"
          size="sm"
          value={slug}
          onChange={(e) => onChange("slug", e.target.value)}
          placeholder="post-slug"
        />
        <Input
          label="External Link (optional)"
          size="sm"
          type="url"
          value={externalLink ?? ""}
          onChange={(e) => onChange("externalLink", e.target.value || null)}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
}

// Main Route Component
function RouteComponent() {
  const post = Route.useLoaderData();

  if (!post) {
    return <span>Post not found</span>;
  }

  return <PostEditor key={post.updated} post={post} />;
}

interface PostEditorProps {
  post: Post;
}

function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);
  const [slug, setSlug] = useState(post.slug);
  const [status, setStatus] = useState<PostStatus>(post.status as PostStatus);
  const [externalLink, setExternalLink] = useState<string | null>(
    post.external_link,
  );
  const [blocks, setBlocks] = useState<BlockWithId[]>(() =>
    addIdsToBlocks(post.content),
  );

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Dirty state
  const isDirty =
    title !== post.title ||
    published !== post.published ||
    slug !== post.slug ||
    status !== post.status ||
    externalLink !== post.external_link ||
    JSON.stringify(removeIdsFromBlocks(blocks)) !==
      JSON.stringify(post.content);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleMetadataChange = (field: string, value: string | null) => {
    switch (field) {
      case "title":
        setTitle(value ?? "");
        break;
      case "published":
        setPublished(value ?? new Date().toISOString());
        break;
      case "slug":
        setSlug(value ?? "");
        break;
      case "status":
        setStatus((value ?? "draft") as PostStatus);
        break;
      case "externalLink":
        setExternalLink(value);
        break;
    }
  };

  const handleBlockChange = (index: number, updatedBlock: BlockWithId) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index] = updatedBlock;
      return newBlocks;
    });
  };

  const handleBlockDelete = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBlockMoveUp = (index: number) => {
    if (index <= 0) return;
    setBlocks((prev) => {
      const newBlocks = [...prev];
      [newBlocks[index - 1], newBlocks[index]] = [
        newBlocks[index],
        newBlocks[index - 1],
      ];
      return newBlocks;
    });
  };

  const handleBlockMoveDown = (index: number) => {
    setBlocks((prev) => {
      if (index >= prev.length - 1) return prev;
      const newBlocks = [...prev];
      [newBlocks[index], newBlocks[index + 1]] = [
        newBlocks[index + 1],
        newBlocks[index],
      ];
      return newBlocks;
    });
  };

  const handleAddBlock = (type: ContentBlock["type"]) => {
    let newBlock: BlockWithId;

    switch (type) {
      case "markdown":
        newBlock = {
          _id: generateBlockId(),
          type: "markdown",
          text: "",
        };
        break;
      case "image":
        newBlock = {
          _id: generateBlockId(),
          type: "image",
          path: "",
          alt: "",
        };
        break;
      case "video":
        newBlock = {
          _id: generateBlockId(),
          type: "video",
          path: "",
        };
        break;
    }

    setBlocks((prev) => [...prev, newBlock]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBlocks((prev) => {
        const oldIndex = prev.findIndex((block) => block._id === active.id);
        const newIndex = prev.findIndex((block) => block._id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await updatePost({
        data: {
          id: post.id,
          title,
          published,
          slug,
          status,
          external_link: externalLink,
          content: removeIdsFromBlocks(blocks),
        },
      });

      if (result) {
        setSuccessMessage("Post saved successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
        await router.invalidate();
      } else {
        setError("Failed to save post. The post may have been deleted.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while saving.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumbs>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
          <Breadcrumbs.Separator />
          <Breadcrumbs.Current>{title}</Breadcrumbs.Current>
        </Breadcrumbs>
        <div className="flex gap-4 items-center">
          {isDirty && <Text variant="secondary">Unsaved changes</Text>}
          <Button
            variant="primary"
            onClick={handleSave}
            loading={isSaving}
            disabled={!isDirty}
          >
            Save
          </Button>
        </div>
      </div>

      {successMessage && <Banner>{successMessage}</Banner>}
      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      <MetadataSection
        title={title}
        published={published}
        slug={slug}
        status={status}
        externalLink={externalLink}
        onChange={handleMetadataChange}
      />

      <div>
        {blocks.length === 0 ? (
          <Text variant="secondary">No content blocks yet. Add one below.</Text>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b._id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block, index) => (
                <SortableBlockItem
                  key={block._id}
                  block={block}
                  onChange={(updatedBlock) =>
                    handleBlockChange(index, updatedBlock)
                  }
                  onDelete={() => handleBlockDelete(index)}
                  onMoveUp={() => handleBlockMoveUp(index)}
                  onMoveDown={() => handleBlockMoveDown(index)}
                  isFirst={index === 0}
                  isLast={index === blocks.length - 1}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}

        <AddBlockRow onAdd={handleAddBlock} />
      </div>
    </div>
  );
}
