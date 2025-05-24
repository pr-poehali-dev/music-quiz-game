import React from "react";
import {
  Music,
  Play,
  Trophy,
  RotateCcw,
  Info,
  Eye,
  ArrowRight,
  CircleAlert,
} from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const iconMap = {
  Music,
  Play,
  Trophy,
  RotateCcw,
  Info,
  Eye,
  ArrowRight,
  CircleAlert,
};

export default function Icon({
  name,
  size = 16,
  className = "",
  fallback = "CircleAlert",
}: IconProps) {
  const IconComponent =
    iconMap[name as keyof typeof iconMap] ||
    iconMap[fallback as keyof typeof iconMap];

  return <IconComponent size={size} className={className} />;
}
