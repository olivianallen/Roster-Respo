import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Newsreader_400Regular,
  Newsreader_400Regular_Italic,
  Newsreader_500Medium,
} from '@expo-google-fonts/newsreader';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
} from '@expo-google-fonts/jetbrains-mono';

import { StoreProvider } from './src/StoreContext';
import { C, setFontFallback } from './src/tokens';

import WelcomeScreen       from './src/screens/WelcomeScreen';
import EmailScreen         from './src/screens/EmailScreen';
import VerifyScreen        from './src/screens/VerifyScreen';
import ProfileScreen       from './src/screens/ProfileScreen';
import GoalsScreen         from './src/screens/GoalsScreen';
import NotifyScreen        from './src/screens/NotifyScreen';
import DoneScreen          from './src/screens/DoneScreen';
import CompanySearchScreen from './src/screens/CompanySearchScreen';
import RolePickerScreen    from './src/screens/RolePickerScreen';
import AppDetailsScreen    from './src/screens/AppDetailsScreen';
import TrackerScreen       from './src/screens/TrackerScreen';
import PrepNotesScreen     from './src/screens/PrepNotesScreen';
import CalendarScreen      from './src/screens/CalendarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Newsreader_400Regular,
    Newsreader_400Regular_Italic,
    Newsreader_500Medium,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, backgroundColor: C.canvas, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={C.clay} />
      </View>
    );
  }

  if (fontError) {
    setFontFallback(true);
  }

  return (
    <SafeAreaProvider>
      <StoreProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: C.canvas },
            }}
          >
            <Stack.Screen name="Welcome"       component={WelcomeScreen} />
            <Stack.Screen name="Email"         component={EmailScreen} />
            <Stack.Screen name="Verify"        component={VerifyScreen} />
            <Stack.Screen name="Profile"       component={ProfileScreen} />
            <Stack.Screen name="Goals"         component={GoalsScreen} />
            <Stack.Screen name="Notify"        component={NotifyScreen} />
            <Stack.Screen name="Done"          component={DoneScreen} />
            <Stack.Screen name="CompanySearch" component={CompanySearchScreen} />
            <Stack.Screen name="RolePicker"    component={RolePickerScreen} />
            <Stack.Screen name="AppDetails"    component={AppDetailsScreen} />
            <Stack.Screen name="Tracker"       component={TrackerScreen} />
            <Stack.Screen name="PrepNotes"     component={PrepNotesScreen} />
            <Stack.Screen name="Calendar"      component={CalendarScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
