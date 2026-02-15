// components/challenge-card.tsx

import { QRCodeSVG } from "qrcode.react";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChallengeStatus,
  ChallengeWithStatus,
} from "@/app/(dashboard)/challenges/page";

function StatusBadge({ status }: { status?: ChallengeStatus }) {
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

  if (status === "deadline_passed") {
    return (
      <Badge className="border-red-200 bg-red-100 text-red-700">
        Deadline Passed
      </Badge>
    );
  }

  if (status === "not_yet_available") {
    return (
      <Badge className="border-orange-200 bg-orange-100 text-orange-700">
        Not Yet Available
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
  onStartChallenge,
}: {
  challenge: ChallengeWithStatus;
  user: User;
  onStartChallenge: (challenge: ChallengeWithStatus) => void;
}) {
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

          {challenge.status == "not_started" && (
            <Button
              className="mt-2"
              variant="outline"
              onClick={() => onStartChallenge(challenge)}
            >
              Start
            </Button>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}
