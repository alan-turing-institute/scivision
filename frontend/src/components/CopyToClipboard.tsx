import { useState } from "react";

type Props = {
  codeText: string;
  lang?: string;
};

const CopyToClipboard = ({ codeText, lang = "language-python" }: Props): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const textToCopy = codeText.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <div className="relative">
        <pre className="overflow-auto rounded-md bg-gray-100 p-4">
          <code className={lang}>{codeText}</code>
        </pre>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 shadow"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </dd>
  );
};

export default CopyToClipboard;
