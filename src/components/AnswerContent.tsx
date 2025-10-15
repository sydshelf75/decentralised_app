import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface AnswerProps {
  content: string;
  maxLength?: number; // number of characters to show initially
}

export function AnswerContent({ content, maxLength = 300 }: AnswerProps) {
  const [expanded, setExpanded] = useState(false);

  // If not expanded, slice the content
  const displayContent = expanded ? content : content.slice(0, maxLength);

  return (
    <div>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p className="text-gray-300 text-sm leading-relaxed" {...props} />,
          li: ({ node, ...props }) => <li className="ml-4 list-disc text-gray-300" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
        }}
      >
        {displayContent}
      </ReactMarkdown>

      {content.length > maxLength && (
        <button className="text-indigo-400 text-sm mt-1" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Less" : "More"}
        </button>
      )}
    </div>
  );
}
