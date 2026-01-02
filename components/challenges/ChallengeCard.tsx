// components/challenge-card.tsx
"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

import { Challenge } from "@/lib/db/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function StatusBadge({ status }: { status?: string }) {
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

export function ChallengeCard({
  challenge,
  user,
}: {
  challenge: Challenge & { status?: string };
  user: User;
}) {
  const profileUrl = `https://app.hackcanada.org/profile/${user.id!}`;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">{challenge.name}</CardTitle>
          <StatusBadge status={challenge.status} />
        </div>
        <CardDescription>
          {challenge.category} • {challenge.points} pts • {challenge.difficulty}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm">
          {challenge.shortDescription}
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="instructions">
            <AccordionTrigger className="text-sm">
              Full instructions
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              {challenge.instructions}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hints">
            <AccordionTrigger className="text-sm">Hints</AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-1 text-sm">
              <ul className="list-inside list-disc space-y-1">
                {challenge.hints.map((hint) => (
                  <li key={hint}>{hint}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {challenge.qrCode && (
            <AccordionItem value="qr">
              <AccordionTrigger className="text-sm">QR code</AccordionTrigger>
              <AccordionContent className="flex flex-col items-center gap-2 py-2">
                <QRCodeSVG
                  value={JSON.stringify({
                    userId: user.id,
                    challengeId: challenge.id,
                  })}
                  size={225}
                  level="H"
                  imageSettings={{
                    src: "/beaver-wave.webp",
                    height: 60,
                    width: 60,
                    excavate: true,
                  }}
                />
                <p className="text-muted-foreground text-xs">
                  Scan this code on-site to confirm your visit.
                </p>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="submission">
            <AccordionTrigger className="text-sm">
              Submission instructions
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              {challenge.submissionInstructions}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-2">
        <Button variant="outline" size="sm">
          Mark as completed
        </Button>
        <Button size="sm">Open challenge</Button>
      </CardFooter>
    </Card>
  );
}
