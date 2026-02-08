import { Input, Text } from "@cloudflare/kumo";
import type { VideoBlock } from "@/data/types";

interface VideoBlockEditorProps {
  block: VideoBlock;
  onChange: (block: VideoBlock) => void;
}

export function VideoBlockEditor({ block, onChange }: VideoBlockEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <Text variant="secondary" size="sm" bold>
        Video
      </Text>
      <Input
        label="Path"
        size="sm"
        value={block.path}
        onChange={(e) => onChange({ ...block, path: e.target.value })}
        placeholder="/videos/example.mp4"
      />
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
        placeholder="Video caption..."
      />
    </div>
  );
}
