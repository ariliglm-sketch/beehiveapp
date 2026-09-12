export type TodayStackParamList = {
  Today: undefined;
  Step: { stepId: string };
  Tool: { toolId: string; fromStepTitle?: string };
};

export type FieldsStackParamList = {
  FieldsList: undefined;
  Phase: { partNum: number };
  Step: { stepId: string };
  Tool: { toolId: string; fromStepTitle?: string };
};

export type ToolsStackParamList = {
  ToolsList: undefined;
  Tool: { toolId: string; fromStepTitle?: string };
};

export type PrayerStackParamList = {
  Prayer: undefined;
};

export type JournalStackParamList = {
  Journal: undefined;
};

export type RootTabParamList = {
  Today: undefined;
  Fields: undefined;
  Tools: undefined;
  Prayer: undefined;
  Journal: undefined;
};
