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
      <p className="text-sm font-medium text-black/75 max-md:text-xs">
        {label}
      </p>
      {isEmpty ? (
        <p className="text-gray-400 md:text-lg">[Empty]</p>
      ) : isUrl ? (
        <a
          href={strValue}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
        >
          {getIcon(getUrlType(strValue))}
          <span>View {label}</span>
        </a>
      ) : (
        <p className="truncate whitespace-pre-line break-words text-gray-900 md:text-lg">
          {strValue}
        </p>
      )}
    </div>
  );
}
