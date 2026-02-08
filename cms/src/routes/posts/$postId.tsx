import { useState } from "react";
import { getPost, updatePost } from "@/data/db";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Banner, Button, Input, Select, Text } from "@cloudflare/kumo";
import type { Post, ContentBlock } from "@/data/types";
import { MarkdownBlockEditor } from "@/components/blocks/MarkdownBlock";
import { ImageBlockEditor } from "@/components/blocks/ImageBlock";
import { VideoBlockEditor } from "@/components/blocks/VideoBlock";

export const Route = createFileRoute("/posts/$postId")({
  ssr: "data-only",
  component: RouteComponent,
  loader: async ({ params }) => await getPost({ data: params.postId }),
});

type PostStatus = "draft" | "published" | "idea" | "hidden";

type BlockWithId = ContentBlock & { _id: string };

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
  grip: "\u2630", // Trigram for heaven (hamburger menu style)
  trash: "\uD83D\uDDD1\uFE0F", // Wastebasket
  markdown: "\uD83D\uDCDD", // Memo
  image: "\uD83D\uDDBC\uFE0F", // Framed picture
  video: "\uD83C\uDFA5", // Movie camera
  back: "\u2B05\uFE0F", // Left arrow
  close: "\u2716\uFE0F", // Heavy multiplication X
};

// Generic Block Editor
interface BlockEditorProps {
  block: BlockWithId;
  onChange: (block: BlockWithId) => void;
}

function BlockEditor({ block, onChange }: BlockEditorProps) {
  const handleChange = (updatedBlock: ContentBlock) => {
    onChange({ ...updatedBlock, _id: block._id } as BlockWithId);
  };

  switch (block.type) {
    case "markdown":
      return <MarkdownBlockEditor block={block} onChange={handleChange} />;
    case "image":
      return <ImageBlockEditor block={block} onChange={handleChange} />;
    case "video":
      return <VideoBlockEditor block={block} onChange={handleChange} />;
    default:
      return <div>Unknown block type</div>;
  }
}

// Sortable Block Item
interface SortableBlockItemProps {
  block: BlockWithId;
  onChange: (block: BlockWithId) => void;
  onDelete: () => void;
}

function SortableBlockItem({
  block,
  onChange,
  onDelete,
}: SortableBlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-start gap-2 rounded border border-transparent p-3 hover:border-gray-200">
        <button
          type="button"
          className="mt-1 cursor-grab text-gray-400 hover:text-gray-600"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          {EMOJI.grip}
        </button>
        <div className="flex-1">
          <BlockEditor block={block} onChange={onChange} />
        </div>
        <Button
          variant="secondary-destructive"
          shape="square"
          size="sm"
          onClick={onDelete}
          aria-label="Delete block"
        >
          {EMOJI.trash}
        </Button>
      </div>
    </div>
  );
}

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

  return <PostEditor post={post} />;
}

interface PostEditorProps {
  post: Post;
}

function PostEditor({ post }: PostEditorProps) {
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
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            {EMOJI.back}
          </Link>
          <Text variant="heading2" as="h1">
            Edit Post
          </Text>
        </div>
        <Button variant="primary" onClick={handleSave} loading={isSaving}>
          Save
        </Button>
      </div>

      {/* Success Message */}
      {successMessage && <Banner>{successMessage}</Banner>}

      {/* Error Alert */}
      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      {/* Metadata Section */}
      <MetadataSection
        title={title}
        published={published}
        slug={slug}
        status={status}
        externalLink={externalLink}
        onChange={handleMetadataChange}
      />

      {/* Content Blocks Section */}
      <div className="flex flex-col gap-4">
        <Text variant="heading3" as="h2">
          Content Blocks
        </Text>

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
              <div className="flex flex-col gap-2">
                {blocks.map((block, index) => (
                  <SortableBlockItem
                    key={block._id}
                    block={block}
                    onChange={(updatedBlock) =>
                      handleBlockChange(index, updatedBlock)
                    }
                    onDelete={() => handleBlockDelete(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Add Block Row */}
        <AddBlockRow onAdd={handleAddBlock} />
      </div>
    </div>
  );
}
