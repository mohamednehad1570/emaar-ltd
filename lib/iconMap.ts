/**
 * lib/iconMap.ts
 * Maps icon string names → Phosphor React components (Regular weight default).
 * Keys intentionally mirror old Lucide names so data-layer strings need no changes.
 * Use resolveIcon(name) in components to get the actual component.
 */

import type { Icon } from '@phosphor-icons/react';
import {
  Medal, Briefcase, Users, Factory, Target, Eye, Heart,
  TrendUp, Shield, Sparkle, ArrowRight,
  CheckCircle, Calendar, MapPin, Globe, Trophy,
  Phone, ClipboardText, Ruler, PenNib,
  FileText, Wrench, Clock, WarningCircle,
  Gear, Package, Lightning, ChatCircle,
  Thermometer, SpeakerSlash, Sun, ShieldCheck,
  Star, Quotes, SealCheck, Microscope,
  ThumbsUp, CaretRight,
  Buildings, HardHat, Stack, Cpu,
  ChartBar, Leaf, Wind, Drop,
} from '@phosphor-icons/react';

// String keys match legacy Lucide names used in data files
export const iconMap: Record<string, Icon> = {
  Award:          Medal,
  Briefcase,
  Users,
  Factory,
  Target,
  Eye,
  Heart,
  TrendingUp:     TrendUp,
  Shield,
  Sparkles:       Sparkle,
  ArrowRight,
  CheckCircle2:   CheckCircle,
  CheckCircle,
  Calendar,
  MapPin,
  Globe,
  Trophy,
  Phone,
  ClipboardCheck: ClipboardText,
  Ruler,
  PenTool:        PenNib,
  FileText,
  Wrench,
  Clock,
  AlertCircle:    WarningCircle,
  Settings:       Gear,
  Package,
  Zap:            Lightning,
  MessageCircle:  ChatCircle,
  Thermometer,
  VolumeX:        SpeakerSlash,
  Sun,
  ShieldCheck,
  Star,
  Quote:          Quotes,
  BadgeCheck:     SealCheck,
  Microscope,
  FileCheck:     FileText, // Phosphor has no FileCheck; FileText is the closest document icon
  ThumbsUp,
  ChevronRight:   CaretRight,
  Building2:      Buildings,
  HardHat,
  Layers:         Stack,
  Cpu,
  BarChart3:      ChartBar,
  Leaf,
  Wind,
  Droplets:       Drop,
};

export function resolveIcon(name: string): Icon {
  return iconMap[name] ?? Medal;
}
