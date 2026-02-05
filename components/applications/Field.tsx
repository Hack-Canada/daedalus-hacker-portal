"use client";

import { File, Github, Linkedin, Link as LinkIcon } from "lucide-react";

interface FieldProps {
  label: string;
  value: string | number | undefined | null;
  customValue?: string;
}

function getUrlType(url: string) {
  if (url.includes("github.com")) return "github";
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("s3.amazonaws.com")) return "resume";
  return "website";
}

function getIcon(type: string) {
  switch (type) {
    case "github":
      return <Github className="h-4 w-4" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    case "resume":
      return <File className="h-4 w-4" />;
    default:
      return <LinkIcon className="h-4 w-4" />;
  }
}

export function Field({ label, value, customValue }: FieldProps) {
  const isEmpty = typeof value === "string" ? value.trim() === "" : !value;
  const strValue = customValue ? customValue : value?.toString() || "";
  const isUrl = strValue.startsWith("http");

  return (
    <div className="space-y-1 overflow-hidden">
      <p className="text-sm font-medium text-white/60 max-md:text-xs">
        {label}
      </p>
      {isEmpty ? (
        <p className="text-white/30 md:text-lg">[Empty]</p>
      ) : isUrl ? (
        <a
          href={strValue}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/20"
        >
          {getIcon(getUrlType(strValue))}
          <span>View {label}</span>
        </a>
      ) : (
        <p className="truncate whitespace-pre-line wrap-break-word text-white md:text-lg">
          {strValue}
        </p>
      )}
    </div>
  );
}
