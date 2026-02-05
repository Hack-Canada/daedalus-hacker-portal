"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  PartyPopper,
  Sparkles,
} from "lucide-react";

import { Confetti } from "@/components/ui/confetti";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

const floatAnimation = {
  y: [-5, 5, -5],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const timelineSteps = [
  {
    icon: Mail,
    title: "Confirmation Email",
    description: "Check your inbox for a confirmation",
    status: "done",
  },
  {
    icon: Clock,
    title: "Application Review",
    description: "Our team will review your application",
    status: "current",
  },
  {
    icon: Bell,
    title: "Decision Notification",
    description: "You'll receive an email with our decision",
    status: "upcoming",
  },
  {
    icon: CalendarCheck,
    title: "RSVP & Prepare",
    description: "Confirm attendance and get ready to hack!",
    status: "upcoming",
  },
];

export default function SubmissionSuccess() {
  return (
    <div className="relative mx-auto flex min-h-[calc(100svh-64px)] w-full grow flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:min-h-svh xl:px-10">
      <Confetti
        className="confetti-container pointer-events-none absolute inset-0 h-svh w-full"
        options={{
          particleCount: 300,
          spread: 200,
          origin: { y: 0.3 },
        }}
      />

      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="bg-primary/5 absolute -top-32 -left-32 size-64 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-32 -bottom-32 size-64 rounded-full bg-sky-400/5 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Icon & Header */}
        <motion.div
          className="flex flex-col items-center text-center"
          variants={itemVariants}
        >
          {/* Animated success badge */}
          <motion.div
            className="relative mb-6"
            variants={scaleVariants}
            animate={pulseAnimation}
          >
            <div className="relative flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/25 sm:size-28 md:size-32">
              <CheckCircle2 className="size-12 text-white sm:size-14 md:size-16" />
              <motion.div
                className="absolute -top-2 -right-2"
                animate={floatAnimation}
              >
                <PartyPopper className="size-8 text-yellow-400 drop-shadow-lg sm:size-10" />
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -left-3"
                animate={{
                  ...floatAnimation,
                  transition: { ...floatAnimation.transition, delay: 0.5 },
                }}
              >
                <Sparkles className="text-primary size-6 drop-shadow-lg sm:size-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="to-primary font-rubik bg-gradient-to-r from-blue-400 via-sky-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
              Application Submitted!
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-textMuted max-w-lg text-base sm:text-lg md:text-xl"
          >
            You&apos;re one step closer to joining Hack Canada! We&apos;ve
            received your application and can&apos;t wait to review it.
          </motion.p>
        </motion.div>

        {/* Beaver mascot */}
        <motion.div
          variants={scaleVariants}
          animate={floatAnimation}
          className="relative"
        >
          <Image
            src="/beaver-wave.webp"
            alt="Beaver waving"
            width={180}
            height={180}
            className="drop-shadow-xl"
          />
        </motion.div>

        {/* What's Next Timeline */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-xl backdrop-blur-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <h2 className="text-textPrimary mb-6 text-center text-lg font-semibold sm:text-xl">
            What Happens Next?
          </h2>

          <div className="space-y-4">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className={`group relative flex items-start gap-4 rounded-xl p-3 transition-all duration-300 sm:p-4 ${
                  step.status === "done"
                    ? "bg-green-50 dark:bg-green-950/30"
                    : step.status === "current"
                      ? "bg-primary/5"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                {/* Step icon */}
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-colors sm:size-12 ${
                    step.status === "done"
                      ? "bg-green-500 text-white"
                      : step.status === "current"
                        ? "bg-primary text-white"
                        : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                  }`}
                >
                  <step.icon className="size-5 sm:size-6" />
                </div>

                {/* Step content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-medium sm:text-lg ${
                        step.status === "done"
                          ? "text-green-700 dark:text-green-400"
                          : step.status === "current"
                            ? "text-primary"
                            : "text-textSecondary"
                      }`}
                    >
                      {step.title}
                    </h3>
                    {step.status === "done" && (
                      <CheckCircle2 className="size-4 text-green-500" />
                    )}
                    {step.status === "current" && (
                      <motion.span
                        className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-xs font-medium"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        In Progress
                      </motion.span>
                    )}
                  </div>
                  <p className="text-textMuted mt-1 text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line */}
                {index < timelineSteps.length - 1 && (
                  <div className="absolute bottom-0 left-[1.4rem] h-4 w-0.5 translate-y-full bg-zinc-200 sm:left-[1.65rem] dark:bg-zinc-700" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.a
            href="/"
            className="group from-primary shadow-primary/25 hover:shadow-primary/30 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r to-sky-500 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto sm:px-10 sm:py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/applications/hacker/review"
              className="text-textSecondary hover:border-primary hover:text-primary dark:hover:border-primary flex w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 font-medium transition-all duration-300 sm:w-auto sm:px-8 sm:py-4 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <ExternalLink className="size-5" />
              <span>Review Application</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Pro tip */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 rounded-full bg-amber-50 px-5 py-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
        >
          <Sparkles className="size-4 shrink-0" />
          <span>
            <strong>Pro tip:</strong> Add{" "}
            <span className="font-medium">no-reply@hackcanada.org</span> to your
            contacts to avoid missing updates!
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
