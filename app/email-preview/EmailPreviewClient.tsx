"use client";

import { useState, useEffect } from "react";
import { 
  Monitor, 
  Smartphone, 
  Code, 
  Copy, 
  Check,
  Mail,
  ChevronRight
} from "lucide-react";

const emailTemplates = [
  {
    id: "welcome",
    name: "Welcome Email",
    description: "User signup verification",
  },
  {
    id: "application-submitted",
    name: "Application Submitted",
    description: "Hacker application confirmation",
  },
  {
    id: "reset-password",
    name: "Reset Password",
    description: "Password reset request",
  },
  {
    id: "hackathon-prep",
    name: "Hackathon Prep",
    description: "Pre-event preparation",
  },
];

type ViewMode = "desktop" | "mobile" | "html";

export default function EmailPreviewClient() {
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [htmlSource, setHtmlSource] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Fetch HTML source when template changes or viewing HTML mode
  useEffect(() => {
    if (viewMode === "html") {
      fetch(`/api/email-preview?template=${selectedTemplate}&format=source`)
        .then((res) => res.json())
        .then((data) => {
          if (data.html) {
            setHtmlSource(data.html);
          }
        })
        .catch(console.error);
    }
  }, [selectedTemplate, viewMode]);

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(htmlSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const currentTemplate = emailTemplates.find((t) => t.id === selectedTemplate);

  return (
    <div className="flex h-screen bg-[#111111]">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-[#333] bg-[#111111]">
        {/* Logo/Header */}
        <div className="flex items-center gap-2 border-b border-[#333] px-4 py-4">
          <Mail className="h-5 w-5 text-white" />
          <span className="font-semibold text-white">Email Preview</span>
        </div>

        {/* Template List */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-[#666]">
            Templates
          </div>
          {emailTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`group flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                selectedTemplate === template.id
                  ? "bg-[#222] text-white"
                  : "text-[#888] hover:bg-[#1a1a1a] hover:text-white"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{template.name}</div>
                <div className="truncate text-xs text-[#666]">
                  {template.description}
                </div>
              </div>
              <ChevronRight
                className={`h-4 w-4 flex-shrink-0 opacity-0 transition-opacity ${
                  selectedTemplate === template.id
                    ? "opacity-100"
                    : "group-hover:opacity-50"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#333] p-4">
          <div className="text-xs text-[#666]">
            Development Mode Only
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <header className="flex items-center justify-between border-b border-[#333] bg-[#111111] px-4 py-2">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-medium text-white">
              {currentTemplate?.name}
            </h1>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-1 rounded-lg bg-[#222] p-1">
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "desktop"
                  ? "bg-[#333] text-white"
                  : "text-[#888] hover:text-white"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "mobile"
                  ? "bg-[#333] text-white"
                  : "text-[#888] hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              Mobile
            </button>
            <button
              onClick={() => setViewMode("html")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === "html"
                  ? "bg-[#333] text-white"
                  : "text-[#888] hover:text-white"
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              HTML
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {viewMode === "html" && (
              <button
                onClick={handleCopyHtml}
                className="flex items-center gap-1.5 rounded-md bg-[#222] px-3 py-1.5 text-xs font-medium text-[#888] transition-colors hover:bg-[#333] hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy HTML
                  </>
                )}
              </button>
            )}
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex flex-1 items-center justify-center overflow-auto bg-[#1a1a1a] p-8">
          {viewMode === "html" ? (
            <div className="h-full w-full overflow-auto rounded-lg bg-[#0d0d0d] p-4">
              <pre className="text-xs text-[#888]">
                <code>{htmlSource || "Loading..."}</code>
              </pre>
            </div>
          ) : (
            <div
              className={`relative overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-300 ${
                viewMode === "mobile" ? "w-[375px]" : "w-full max-w-[600px]"
              }`}
              style={{
                height: viewMode === "mobile" ? "667px" : "auto",
                minHeight: viewMode === "desktop" ? "600px" : undefined,
              }}
            >
              {/* Device Frame for Mobile */}
              {viewMode === "mobile" && (
                <div className="absolute left-1/2 top-2 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
              )}
              
              <iframe
                key={selectedTemplate}
                src={`/api/email-preview?template=${selectedTemplate}`}
                className="h-full w-full border-0"
                title={`${currentTemplate?.name} Preview`}
                style={{
                  minHeight: viewMode === "desktop" ? "600px" : "100%",
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
