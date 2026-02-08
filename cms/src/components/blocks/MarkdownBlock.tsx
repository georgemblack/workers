import { InputArea } from "@cloudflare/kumo";
import type { MarkdownBlock } from "@/data/types";

interface MarkdownBlockEditorProps {
  block: MarkdownBlock;
  onChange: (block: MarkdownBlock) => void;
}

export function MarkdownBlockEditor({
  block,
  onChange,
}: MarkdownBlockEditorProps) {
  return (
    <div className="flex flex-col gap-3 font-mono">
      <InputArea
        value={block.text}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
        rows={6}
        placeholder="Write your content in Markdown..."
      />
    </div>
  );
}
