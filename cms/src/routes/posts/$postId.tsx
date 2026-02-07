import { useState, useId } from "react";
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
import type {
  Post,
  ContentBlock,
  HeadingBlock,
  ParagraphBlock,
  ImageBlock,
  VideoBlock,
} from "@/data/types";

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
  heading: "\uD83C\uDD77", // H button
  paragraph: "\uD83D\uDCDD", // Memo
  image: "\uD83D\uDDBC\uFE0F", // Framed picture
  video: "\uD83C\uDFA5", // Movie camera
  back: "\u2B05\uFE0F", // Left arrow
  close: "\u2716\uFE0F", // Heavy multiplication X
};

// Block Editor Components
interface HeadingBlockEditorProps {
  block: HeadingBlock;
  onChange: (block: HeadingBlock) => void;
}

function HeadingBlockEditor({ block, onChange }: HeadingBlockEditorProps) {
  const textId = useId();
  const levelId = useId();

  return (
    <div>
      <div>
        <span>{EMOJI.heading}</span>
        <span>Heading</span>
      </div>
      <div>
        <div>
          <label htmlFor={textId}>Text</label>
          <input
            id={textId}
            type="text"
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            placeholder="Heading text..."
          />
        </div>
        <div>
          <label htmlFor={levelId}>Level</label>
          <select
            id={levelId}
            value={block.level}
            onChange={(e) =>
              onChange({
                ...block,
                level: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6,
              })
            }
          >
            <option value={1}>H1</option>
            <option value={2}>H2</option>
            <option value={3}>H3</option>
            <option value={4}>H4</option>
            <option value={5}>H5</option>
            <option value={6}>H6</option>
          </select>
        </div>
      </div>
    </div>
  );
}

interface ParagraphBlockEditorProps {
  block: ParagraphBlock;
  onChange: (block: ParagraphBlock) => void;
}

function ParagraphBlockEditor({ block, onChange }: ParagraphBlockEditorProps) {
  const textId = useId();

  return (
    <div>
      <div>
        <span>{EMOJI.paragraph}</span>
        <span>Paragraph</span>
      </div>
      <div>
        <label htmlFor={textId}>Content (Markdown)</label>
        <textarea
          id={textId}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          rows={6}
          placeholder="Write your paragraph content in Markdown..."
        />
      </div>
    </div>
  );
}

interface ImageBlockEditorProps {
  block: ImageBlock;
  onChange: (block: ImageBlock) => void;
}

function ImageBlockEditor({ block, onChange }: ImageBlockEditorProps) {
  const pathId = useId();
  const altId = useId();
  const captionId = useId();

  return (
    <div>
      <div>
        <span>{EMOJI.image}</span>
        <span>Image</span>
      </div>
      <div>
        <div>
          <label htmlFor={pathId}>Path</label>
          <input
            id={pathId}
            type="text"
            value={block.path}
            onChange={(e) => onChange({ ...block, path: e.target.value })}
            placeholder="/images/example.jpg"
          />
        </div>
        <div>
          <label htmlFor={altId}>Alt Text</label>
          <input
            id={altId}
            type="text"
            value={block.alt}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            placeholder="Descriptive alt text..."
          />
        </div>
      </div>
      <div>
        <label htmlFor={captionId}>Caption (optional)</label>
        <input
          id={captionId}
          type="text"
          value={block.caption ?? ""}
          onChange={(e) =>
            onChange({
              ...block,
              caption: e.target.value || undefined,
            })
          }
          placeholder="Image caption..."
        />
      </div>
    </div>
  );
}

interface VideoBlockEditorProps {
  block: VideoBlock;
  onChange: (block: VideoBlock) => void;
}

function VideoBlockEditor({ block, onChange }: VideoBlockEditorProps) {
  const pathId = useId();
  const captionId = useId();

  return (
    <div>
      <div>
        <span>{EMOJI.video}</span>
        <span>Video</span>
      </div>
      <div>
        <label htmlFor={pathId}>Path</label>
        <input
          id={pathId}
          type="text"
          value={block.path}
          onChange={(e) => onChange({ ...block, path: e.target.value })}
          placeholder="/videos/example.mp4"
        />
      </div>
      <div>
        <label htmlFor={captionId}>Caption (optional)</label>
        <input
          id={captionId}
          type="text"
          value={block.caption ?? ""}
          onChange={(e) =>
            onChange({
              ...block,
              caption: e.target.value || undefined,
            })
          }
          placeholder="Video caption..."
        />
      </div>
    </div>
  );
}

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
    case "heading":
      return <HeadingBlockEditor block={block} onChange={handleChange} />;
    case "paragraph":
      return <ParagraphBlockEditor block={block} onChange={handleChange} />;
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
      <div>
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          {EMOJI.grip}
        </button>
        <div>
          <BlockEditor block={block} onChange={onChange} />
        </div>
        <button type="button" onClick={onDelete} aria-label="Delete block">
          {EMOJI.trash}
        </button>
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
    <div>
      <span>Add block:</span>
      <button
        type="button"
        onClick={() => onAdd("heading")}
        title="Add Heading"
      >
        {EMOJI.heading}
      </button>
      <button
        type="button"
        onClick={() => onAdd("paragraph")}
        title="Add Paragraph"
      >
        {EMOJI.paragraph}
      </button>
      <button type="button" onClick={() => onAdd("image")} title="Add Image">
        {EMOJI.image}
      </button>
      <button type="button" onClick={() => onAdd("video")} title="Add Video">
        {EMOJI.video}
      </button>
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
    <div>
      <div>
        <h3>Error saving post</h3>
        <p>{message}</p>
      </div>
      <button type="button" onClick={onDismiss} aria-label="Dismiss">
        {EMOJI.close}
      </button>
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
  const titleId = useId();
  const publishedId = useId();
  const slugId = useId();
  const statusId = useId();
  const externalLinkId = useId();

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
      <h2>Post Metadata</h2>
      <div>
        <div>
          <label htmlFor={titleId}>Title</label>
          <input
            id={titleId}
            type="text"
            value={title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Post title..."
          />
        </div>
        <div>
          <label htmlFor={publishedId}>Published Date</label>
          <input
            id={publishedId}
            type="datetime-local"
            value={toDatetimeLocal(published)}
            onChange={(e) => onChange("published", toISOString(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor={slugId}>Slug</label>
          <input
            id={slugId}
            type="text"
            value={slug}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="post-slug"
          />
        </div>
        <div>
          <label htmlFor={statusId}>Status</label>
          <select
            id={statusId}
            value={status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="idea">Idea</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
        <div>
          <label htmlFor={externalLinkId}>External Link (optional)</label>
          <input
            id={externalLinkId}
            type="url"
            value={externalLink ?? ""}
            onChange={(e) => onChange("externalLink", e.target.value || null)}
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  );
}

// Main Route Component
function RouteComponent() {
  const post = Route.useLoaderData();

  if (!post) {
    return (
      <div>
        <div>
          <div>
            <h1>Post Not Found</h1>
            <p>The post you're looking for doesn't exist.</p>
            <Link to="/">{EMOJI.back} Back to posts</Link>
          </div>
        </div>
      </div>
    );
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
      case "heading":
        newBlock = {
          _id: generateBlockId(),
          type: "heading",
          level: 2,
          text: "",
        };
        break;
      case "paragraph":
        newBlock = {
          _id: generateBlockId(),
          type: "paragraph",
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
    <div>
      <div>
        {/* Header */}
        <div>
          <div>
            <Link to="/">{EMOJI.back}</Link>
            <h1>Edit Post</h1>
          </div>
          <button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div>
            <p>{successMessage}</p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <ErrorAlert message={error} onDismiss={() => setError(null)} />
        )}

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
        <div>
          <h2>Content Blocks</h2>

          {blocks.length === 0 ? (
            <div>No content blocks yet. Add one below.</div>
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
                <div>
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
    </div>
  );
}
