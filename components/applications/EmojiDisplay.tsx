"use client";

interface EmojiDisplayProps {
  count: number;
}

const EMOJI_RANGES = [
  { min: -Infinity, max: 0, emoji: "🫵😹" },
  { min: 1, max: 3, emoji: "😊" },
  { min: 4, max: 5, emoji: "🤓" },
  { min: 6, max: 7, emoji: "🧐" },
  { min: 8, max: 10, emoji: "😎" },
  { min: 11, max: 13, emoji: "🥳" },
  { min: 14, max: 16, emoji: "🤩" },
  { min: 17, max: 19, emoji: "🤯" },
  { min: 20, max: 22, emoji: "🥴" },
  { min: 23, max: Infinity, emoji: "💀" },
];

export function EmojiDisplay({ count }: EmojiDisplayProps) {
  if (isNaN(count)) return null;

  const matchedEmoji = EMOJI_RANGES.find(
    (range) => count >= range.min && count <= range.max,
  )?.emoji;

  return matchedEmoji ? (
    <p className="pointer-events-none z-20 text-lg md:text-xl">
      {matchedEmoji}
    </p>
  ) : null;
}
