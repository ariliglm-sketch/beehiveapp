import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, space } from '../theme/tokens';
import { Icon } from '../components/Icon';
import { TodayScreen } from '../screens/TodayScreen';
import { FieldsListScreen } from '../screens/FieldsListScreen';
import { PhaseScreen } from '../screens/PhaseScreen';
import { StepScreen } from '../screens/StepScreen';
import { ToolsListScreen } from '../screens/ToolsListScreen';
import { ToolScreen } from '../screens/ToolScreen';
import { PrayerScreen } from '../screens/PrayerScreen';
import { JournalScreen } from '../screens/JournalScreen';
import type {
  FieldsStackParamList,
  JournalStackParamList,
  PrayerStackParamList,
  RootTabParamList,
  TodayStackParamList,
  ToolsStackParamList,
} from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const TodayStack = createNativeStackNavigator<TodayStackParamList>();
const FieldsStack = createNativeStackNavigator<FieldsStackParamList>();
const ToolsStack = createNativeStackNavigator<ToolsStackParamList>();
const PrayerStack = createNativeStackNavigator<PrayerStackParamList>();
const JournalStack = createNativeStackNavigator<JournalStackParamList>();

function TodayStackNavigator() {
  return (
    <TodayStack.Navigator screenOptions={{ headerShown: false }}>
      <TodayStack.Screen name="Today" component={TodayScreen} />
      <TodayStack.Screen name="Step" component={StepScreen as any} />
      <TodayStack.Screen name="Tool" component={ToolScreen as any} />
    </TodayStack.Navigator>
  );
}

function FieldsStackNavigator() {
  return (
    <FieldsStack.Navigator screenOptions={{ headerShown: false }}>
      <FieldsStack.Screen name="FieldsList" component={FieldsListScreen} />
      <FieldsStack.Screen name="Phase" component={PhaseScreen} />
      <FieldsStack.Screen name="Step" component={StepScreen} />
      <FieldsStack.Screen name="Tool" component={ToolScreen as any} />
    </FieldsStack.Navigator>
  );
}

function ToolsStackNavigator() {
  return (
    <ToolsStack.Navigator screenOptions={{ headerShown: false }}>
      <ToolsStack.Screen name="ToolsList" component={ToolsListScreen} />
      <ToolsStack.Screen name="Tool" component={ToolScreen} />
    </ToolsStack.Navigator>
  );
}

function PrayerStackNavigator() {
  return (
    <PrayerStack.Navigator screenOptions={{ headerShown: false }}>
      <PrayerStack.Screen name="Prayer" component={PrayerScreen} />
    </PrayerStack.Navigator>
  );
}

function JournalStackNavigator() {
  return (
    <JournalStack.Navigator screenOptions={{ headerShown: false }}>
      <JournalStack.Screen name="Journal" component={JournalScreen} />
    </JournalStack.Navigator>
  );
}

const TAB_ICON: Record<keyof RootTabParamList, string> = {
  Today: 'SunHorizon',
  Fields: 'Plant',
  Tools: 'Toolbox',
  Prayer: 'HandsPraying',
  Journal: 'Notebook',
};

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent700,
        tabBarInactiveTintColor: colors.neutral700,
        tabBarStyle: { backgroundColor: colors.bg, borderTopColor: colors.divider, height: 64 + space[2] },
        tabBarItemStyle: { paddingTop: space[2] },
        tabBarLabelStyle: { fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: '600' },
        tabBarIcon: ({ color }) => <Icon name={TAB_ICON[route.name as keyof RootTabParamList]} size={22} color={color} />,
      })}
    >
      <Tab.Screen name="Today" component={TodayStackNavigator} />
      <Tab.Screen name="Fields" component={FieldsStackNavigator} />
      <Tab.Screen name="Tools" component={ToolsStackNavigator} />
      <Tab.Screen name="Prayer" component={PrayerStackNavigator} />
      <Tab.Screen name="Journal" component={JournalStackNavigator} />
    </Tab.Navigator>
  );
}
