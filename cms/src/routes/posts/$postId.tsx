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
  Breadcrumbs,
  Button,
  Input,
  Select,
  Switch,
  Text,
} from "@cloudflare/kumo";
import type { Post, ContentBlock, PostStatus } from "@/data/types";
import {
  SortableBlockItem,
  type BlockWithId,
} from "@/components/SortableBlockItem";

export const Route = createFileRoute("/posts/$postId")({
  ssr: "data-only",
  component: RouteComponent,
  loader: async ({ params }) => await getPost({ data: params.postId }),
});

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
  text: "\u270D\uFE0F", // Writing hand
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
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onAdd("text")}
        aria-label="Add Text"
      >
        {EMOJI.text} Text
      </Button>
    </div>
  );
}

interface MetadataSectionProps {
  title: string;
  published: string;
  slug: string;
  status: PostStatus;
  hidden: boolean;
  externalLink: string | null;
  onChange: (field: string, value: string | null) => void;
  onHiddenChange: (hidden: boolean) => void;
}

function MetadataSection({
  title,
  published,
  slug,
  status,
  hidden,
  externalLink,
  onChange,
  onHiddenChange,
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
    <div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                className="w-full"
                value={title}
                onChange={(e) => onChange("title", e.target.value)}
                placeholder="Title"
              />
            </div>
            <Button
              variant="secondary"
              aria-label="Generate slug from title"
              onClick={() => {
                const generated = title
                  .toLowerCase()
                  .replace(/[^a-z0-9-]/g, "-")
                  .replace(/-+/g, "-")
                  .replace(/^-|-$/g, "");
                onChange("slug", generated);
              }}
            >
              Gen Slug
            </Button>
          </div>
          <Text variant="secondary">{slug}</Text>
        </div>
        <div className="flex gap-3">
          <div className="flex-[3]">
            <Input
              className="w-full"
              type="datetime-local"
              value={toDatetimeLocal(published)}
              onChange={(e) =>
                onChange("published", toISOString(e.target.value))
              }
            />
          </div>
          <div className="flex-[2]">
            <Select
              className="w-full"
              value={status}
              onValueChange={(value) => onChange("status", String(value))}
            >
              <Select.Option value="draft">draft</Select.Option>
              <Select.Option value="published">published</Select.Option>
            </Select>
          </div>
          <div className="flex-none flex items-center">
            <Switch
              label="Hidden"
              checked={hidden}
              onCheckedChange={onHiddenChange}
            />
          </div>
        </div>
        <Input
          type="url"
          value={externalLink ?? ""}
          onChange={(e) => onChange("externalLink", e.target.value || null)}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
}

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

  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);
  const [slug, setSlug] = useState(post.slug);
  const [status, setStatus] = useState<PostStatus>(post.status as PostStatus);
  const [hidden, setHidden] = useState(post.hidden);
  const [externalLink, setExternalLink] = useState<string | null>(
    post.external_link,
  );
  const [blocks, setBlocks] = useState<BlockWithId[]>(() =>
    addIdsToBlocks(post.content),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<"error" | null>(null);

  const isDirty =
    title !== post.title ||
    published !== post.published ||
    slug !== post.slug ||
    status !== post.status ||
    hidden !== post.hidden ||
    externalLink !== post.external_link ||
    JSON.stringify(removeIdsFromBlocks(blocks)) !==
      JSON.stringify(post.content);

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
      case "text":
        newBlock = {
          _id: generateBlockId(),
          type: "text",
          text: "",
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
    setStatusMessage(null);

    try {
      const result = await updatePost({
        data: {
          id: post.id,
          title,
          published,
          slug,
          status,
          hidden,
          external_link: externalLink,
          content: removeIdsFromBlocks(blocks),
        },
      });

      if (result) {
        await router.invalidate();
      } else {
        console.error("Failed to save post. The post may have been deleted.");
        setStatusMessage("error");
      }
    } catch (err) {
      console.error("Error saving post:", err);
      setStatusMessage("error");
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
          {statusMessage === "error" && (
            <Text variant="secondary">Error saving post</Text>
          )}
          {!statusMessage && isDirty && (
            <Text variant="secondary">Unsaved changes</Text>
          )}
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

      <MetadataSection
        title={title}
        published={published}
        slug={slug}
        status={status}
        hidden={hidden}
        externalLink={externalLink}
        onChange={handleMetadataChange}
        onHiddenChange={setHidden}
      />

      <div className="mt-6 flex flex-col gap-4">
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
