/**
 * lib/iconMap.ts
 * Maps icon string names → Lucide React components.
 * Use resolveIcon(name) in components to get the actual component.
 */

import {
  Award, Briefcase, Users, Factory, Target, Eye, Heart,
  TrendingUp, Shield, Sparkles, ArrowRight,
  CheckCircle2, Calendar, MapPin, Globe, Trophy,
  Phone, ClipboardCheck, Ruler, PenTool,
  FileText, Wrench, Clock, AlertCircle,
  Settings, Package, Zap, MessageCircle,
  Thermometer, VolumeX, Sun, ShieldCheck,
  Star, Quote, BadgeCheck, Microscope,
  FileCheck, ThumbsUp, ChevronRight,
  Building2, HardHat, Layers, Cpu,
  BarChart3, Leaf, Wind, Droplets,
  LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  Award,
  Briefcase,
  Users,
  Factory,
  Target,
  Eye,
  Heart,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Globe,
  Trophy,
  Phone,
  ClipboardCheck,
  Ruler,
  PenTool,
  FileText,
  Wrench,
  Clock,
  AlertCircle,
  Settings,
  Package,
  Zap,
  MessageCircle,
  Thermometer,
  VolumeX,
  Sun,
  ShieldCheck,
  Star,
  Quote,
  BadgeCheck,
  Microscope,
  FileCheck,
  ThumbsUp,
  ChevronRight,
  Building2,
  HardHat,
  Layers,
  Cpu,
  BarChart3,
  Leaf,
  Wind,
  Droplets,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Award;
}
