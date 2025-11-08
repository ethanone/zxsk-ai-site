"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface TimelineItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem = ({ icon, title, description, isLast = false }: TimelineItemProps) => (
  <motion.li variants={itemVariants} className="relative flex items-start">
    {!isLast && (
      <div className="absolute left-[18px] top-[44px] h-full w-px bg-border -z-10" />
    )}
    <div className="flex items-center gap-4">
      <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg text-foreground">{title}</h4>
        <p className="mt-1 text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  </motion.li>
);

interface TimelineProps {
  items: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
}

export const Timeline = ({ items }: TimelineProps) => (
  <motion.ul
    variants={timelineVariants}
    initial="hidden"
    animate="visible"
    className="space-y-8"
  >
    {items.map((item, index) => (
      <TimelineItem
        key={item.title}
        {...item}
        isLast={index === items.length - 1}
      />
    ))}
  </motion.ul>
); 