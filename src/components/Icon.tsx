import React from 'react';
import {
  UsersThreeIcon,
  DoorOpenIcon,
  DoorIcon,
  ChatCircleTextIcon,
  CirclesThreeIcon,
  SignpostIcon,
  FileTextIcon,
  ClockCountdownIcon,
  ListChecksIcon,
  CircleDashedIcon,
  GitForkIcon,
  StairsIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CircleIcon,
  CheckSquareIcon,
  SquareIcon,
  SunHorizonIcon,
  PlantIcon,
  ToolboxIcon,
  HandsPrayingIcon,
  NotebookIcon,
  HourglassMediumIcon,
  type Icon as PhosphorIcon,
} from 'phosphor-react-native';

const REGISTRY: Record<string, PhosphorIcon> = {
  UsersThree: UsersThreeIcon,
  DoorOpen: DoorOpenIcon,
  Door: DoorIcon,
  ChatCircleText: ChatCircleTextIcon,
  CirclesThree: CirclesThreeIcon,
  Signpost: SignpostIcon,
  FileText: FileTextIcon,
  ClockCountdown: ClockCountdownIcon,
  ListChecks: ListChecksIcon,
  CircleDashed: CircleDashedIcon,
  GitFork: GitForkIcon,
  Stairs: StairsIcon,
  ArrowLeft: ArrowLeftIcon,
  ArrowRight: ArrowRightIcon,
  CheckCircle: CheckCircleIcon,
  Circle: CircleIcon,
  CheckSquare: CheckSquareIcon,
  Square: SquareIcon,
  SunHorizon: SunHorizonIcon,
  Plant: PlantIcon,
  Toolbox: ToolboxIcon,
  HandsPraying: HandsPrayingIcon,
  Notebook: NotebookIcon,
  HourglassMedium: HourglassMediumIcon,
};

export function Icon({
  name,
  size = 20,
  color,
  weight = 'duotone',
}: {
  name: string;
  size?: number;
  color?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}) {
  const Cmp = REGISTRY[name];
  if (!Cmp) return null;
  return <Cmp size={size} color={color} weight={weight} />;
}
