import { Input, Text } from "@cloudflare/kumo";
import type { ImageBlock } from "@/data/types";

interface ImageBlockEditorProps {
  block: ImageBlock;
  onChange: (block: ImageBlock) => void;
}

export function ImageBlockEditor({ block, onChange }: ImageBlockEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <Text variant="secondary" size="sm" bold>
        Image
      </Text>
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Path"
            size="sm"
            value={block.path}
            onChange={(e) => onChange({ ...block, path: e.target.value })}
            placeholder="/images/example.jpg"
          />
        </div>
        <div className="flex-1">
          <Input
            label="Alt Text"
            size="sm"
            value={block.alt}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            placeholder="Descriptive alt text..."
          />
        </div>
      </div>
      <Input
        label="Caption (optional)"
        size="sm"
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
  );
}
