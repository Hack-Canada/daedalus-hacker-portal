// app/challenges/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Challenge } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function StatusBadge({ status }: { status: Challenge["status"] }) {
  if (status === "completed") {
    return (
      <Badge className="border-emerald-200 bg-emerald-100 text-emerald-700">
        Completed ✓
      </Badge>
    );
  }
  if (status === "in_progress") {
    return (
      <Badge className="border-amber-200 bg-amber-100 text-amber-700">
        In Progress
      </Badge>
    );
  }
  return (
    <Badge className="border-slate-200 bg-slate-100 text-slate-700">
      Not Started
    </Badge>
  );
}

export const columns: ColumnDef<Challenge>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "points",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Points
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];
