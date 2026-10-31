"use client";

import { useState, useCallback, useRef } from "react";
import { useToast } from "../../components/toast";
import { ToolPageHeader } from "../../components/tool-page-header";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageToBase64Page() {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [base64, setBase64] = useState("");
  const [dataUri, setDataUri] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [outputMode, setOutputMode] = useState<"datauri" | "raw">("datauri");
  const [dragging, setDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast("Please select an image file.", "error");
      return;
    }
    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setDataUri(result);
      setBase64(result.split(",")[1] || "");
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const copy = useCallback(() => {
    const text = outputMode === "datauri" ? dataUri : base64;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      toast("Copied to clipboard!");
    });
  }, [outputMode, dataUri, base64, toast]);

  const clear = useCallback(() => {
    setPreview(null);
    setBase64("");
    setDataUri("");
    setFileName("");
    setFileSize(0);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const outputText = outputMode === "datauri" ? dataUri : base64;

  return (
    <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <ToolPageHeader />

        <div
          className={`neu-card p-8 mb-6 text-center transition-colors ${
            dragging ? "border-cat border-2" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg object-contain"
              />
              <div className="text-sm text-muted">
                <p className="font-medium text-foreground">{fileName}</p>
                <p>
                  Original: {formatBytes(fileSize)} &middot; Base64:{" "}
                  {formatBytes(base64.length)}
                </p>
              </div>
              <button
                onClick={clear}
                className="text-xs text-muted hover:text-foreground transition-colors"
              >
                Remove &amp; Upload Another
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <svg
                className="w-10 h-10 mx-auto text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <p className="text-sm text-muted">
                Drag &amp; drop an image here, or{" "}
                <button
                  onClick={() => fileRef.current?.click()}
                  className="text-cat hover:text-cat/80 font-medium transition-colors"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-muted">
                PNG, JPG, GIF, SVG, WebP supported
              </p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {outputText && (
          <div className="neu-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {(["datauri", "raw"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setOutputMode(m)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      outputMode === m
                        ? "bg-primary text-white"
                        : "bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {m === "datauri" ? "Data URI" : "Raw Base64"}
                  </button>
                ))}
              </div>
              <button
                onClick={copy}
                className="text-xs text-cat hover:text-cat/80 font-medium transition-colors"
              >
                Copy
              </button>
            </div>
            <textarea
              value={outputText}
              readOnly
              className="w-full h-40 code-area p-4 text-xs focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>
        )}

      </div>
    </section>
  );
}
