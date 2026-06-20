import {
  Boxes,
  Ruler,
  ScanEye,
  Radar,
  CalendarClock,
  Layers,
  BarChart3,
  Share2,
  MessagesSquare,
  PenTool,
  FileStack,
  Table2,
  LayoutDashboard,
  Link2,
  GitCompareArrows,
  type LucideProps,
} from 'lucide-react'

const map = {
  Boxes,
  Ruler,
  ScanEye,
  Radar,
  CalendarClock,
  Layers,
  BarChart3,
  Share2,
  MessagesSquare,
  PenTool,
  FileStack,
  Table2,
  LayoutDashboard,
  Link2,
  GitCompareArrows,
}

export type IconName = keyof typeof map

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name]
  return <Cmp {...props} />
}
