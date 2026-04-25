import {
  Bookmark,
  Share2,
  Download,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Info,
  AlertCircle,
  CheckCircle,
  Filter,
  SlidersHorizontal,
  Menu,
  Home,
  Leaf,
  FlaskConical,
  User,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  MoreVertical,
  MoreHorizontal,
  RefreshCw,
  XCircle,
  CheckCircle2
} from 'lucide-react';

export const Icons = {
  // Action Icons
  save: Bookmark,
  share: Share2,
  export: Download,
  search: Search,
  close: X,
  add: Plus,
  remove: Minus,
  edit: Edit,
  delete: Trash2,
  copy: Copy,
  refresh: RefreshCw,

  // Navigation Icons
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  home: Home,
  externalLink: ExternalLink,

  // Category Icons
  plant: Leaf,
  compound: FlaskConical,

  // UI Icons
  menu: Menu,
  filter: Filter,
  settings: SlidersHorizontal,
  more: MoreVertical,
  moreHorizontal: MoreHorizontal,

  // Status Icons
  info: Info,
  alert: AlertCircle,
  success: CheckCircle,
  check: CheckCircle2,
  error: XCircle,

  // User Icons
  user: User,
  logout: LogOut,
  eye: Eye,
  eyeOff: EyeOff,

  // App Settings
  settingsIcon: Settings,
};

export type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export function Icon({ name, className = "", size }: IconProps) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={className} size={size} />;
}
