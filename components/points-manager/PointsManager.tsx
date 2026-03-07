"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Coins, Loader2, Minus, Plus, Search, User, X } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { UserSearchResult } from "@/app/api/users/search/route";

interface AdjustmentResult {
  userName: string;
  points: number;
  message: string;
}

export function PointsManager() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserSearchResult | null>(null);
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("Added via front desk");
  const [submitting, setSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<AdjustmentResult | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchUsers = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setSearching(true);
    try {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data ?? []);
        setShowDropdown(true);
      }
    } catch {
      toast.error("Failed to search users");
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchUsers(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, searchUsers]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelectUser = (user: UserSearchResult) => {
    setSelectedUser(user);
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    setLastResult(null);
  };

  const handleClearUser = () => {
    setSelectedUser(null);
    setPoints("");
    setReason("Added via front desk");
    setLastResult(null);
  };

  const handleSubmit = async (mode: "give" | "take") => {
    if (!selectedUser || !points) return;

    const numPoints = parseInt(points, 10);
    if (isNaN(numPoints) || numPoints <= 0 || numPoints > 500) {
      toast.error("Enter a valid number between 1 and 500");
      return;
    }

    const adjustedPoints = mode === "give" ? numPoints : -numPoints;

    setSubmitting(true);
    try {
      const res = await fetch("/api/points/adjust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.id,
          points: adjustedPoints,
          reason,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setSelectedUser((prev) =>
          prev ? { ...prev, points: prev.points + adjustedPoints } : null,
        );
        setLastResult({
          userName: data.userName || selectedUser.name,
          points: adjustedPoints,
          message: data.message,
        });
        setPoints("");
      } else {
        toast.error(data.message || "Failed to adjust points");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      {!selectedUser && (
        <div className="relative" ref={dropdownRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search hacker by name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searching && (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary" />
            )}
          </div>

          {showDropdown && results.length > 0 && (
            <div className="absolute z-50 mt-2 w-full rounded-lg border border-white/10 bg-[#0f0f1a] shadow-xl">
              {results.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{user.name}</p>
                    <p className="truncate text-sm text-white/50">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                    <Coins className="h-3.5 w-3.5" />
                    {user.points}
                  </div>
                </button>
              ))}
            </div>
          )}

          {showDropdown && query.length >= 2 && results.length === 0 && !searching && (
            <div className="absolute z-50 mt-2 w-full rounded-lg border border-white/10 bg-[#0f0f1a] p-4 text-center text-sm text-white/50 shadow-xl">
              No hackers found
            </div>
          )}
        </div>
      )}

      {/* Selected User Card */}
      {selectedUser && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{selectedUser.name}</p>
                <p className="text-sm text-white/50">{selectedUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 rounded-full bg-primary/20 px-4 py-1.5">
                <Coins className="h-4 w-4 text-primary" />
                <span className="font-rubik text-lg font-bold text-primary">
                  {selectedUser.points}
                </span>
              </div>
              <button
                onClick={handleClearUser}
                className="rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Points Adjustment Form */}
      {selectedUser && (
        <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Points</label>
            <Input
              type="number"
              placeholder="Enter points (1-500)"
              value={points}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 500)) {
                  setPoints(val);
                }
              }}
              min={1}
              max={500}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Reason</label>
            <Input
              placeholder="Reason for adjustment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => handleSubmit("give")}
              disabled={submitting || !points}
              loading={submitting}
              className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
            >
              <Plus className="h-4 w-4" />
              Give Points
            </Button>
            <Button
              onClick={() => handleSubmit("take")}
              disabled={submitting || !points}
              loading={submitting}
              variant="destructive"
              className="flex-1 gap-2"
            >
              <Minus className="h-4 w-4" />
              Take Back Points
            </Button>
          </div>
        </div>
      )}

      {/* Last Adjustment Result */}
      {lastResult && (
        <div
          className={cn(
            "rounded-lg border p-4 text-center",
            lastResult.points > 0
              ? "border-emerald-500/20 bg-emerald-500/5"
              : "border-rose-500/20 bg-rose-500/5",
          )}
        >
          <p className="font-medium text-white">
            {lastResult.points > 0 ? "+" : ""}
            {lastResult.points} points{" "}
            {lastResult.points > 0 ? "given to" : "taken from"}{" "}
            <span className="text-primary">{lastResult.userName}</span>
          </p>
        </div>
      )}
    </div>
  );
}
