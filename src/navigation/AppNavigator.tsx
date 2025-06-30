import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { HomeScreen } from '../screens/customer/HomeScreen';
import { CreateJobScreen } from '../screens/customer/CreateJobScreen';
import { JobFeedScreen } from '../screens/professional/JobFeedScreen';
import { User, Job } from '../types';
import { colors, typography } from '../utils/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Mock data for development
const mockJobs: Job[] = [
  {
    id: '1',
    customerId: '1',
    serviceCategory: 'HVAC',
    description: 'AC unit not cooling properly, need inspection and repair',
    photos: [],
    address: '123 Main St, City, State',
    preferredDate: new Date(),
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    customerId: '1',
    serviceCategory: 'Plumbing',
    description: 'Leaky faucet in kitchen, needs replacement',
    photos: [],
    address: '123 Main St, City, State',
    preferredDate: new Date(),
    status: 'accepted',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockUser: User = {
  id: '1',
  email: 'john@example.com',
  name: 'John Doe',
  userType: 'customer',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Wrapper components to provide props
const HomeScreenWrapper = ({ navigation }: any) => (
  <HomeScreen 
    navigation={navigation} 
    user={mockUser} 
    jobs={mockJobs} 
  />
);

const JobFeedScreenWrapper = ({ navigation }: any) => (
  <JobFeedScreen 
    navigation={navigation} 
    user={mockUser} 
    jobs={mockJobs}
    onAcceptJob={(jobId: string) => {
      console.log('Accepting job:', jobId);
      // TODO: Implement job acceptance logic
    }}
    onRefresh={() => {
      console.log('Refreshing jobs');
      // TODO: Implement refresh logic
    }}
  />
);

const CreateJobScreenWrapper = ({ navigation, route }: any) => (
  <CreateJobScreen 
    navigation={navigation} 
    route={route}
    onCreateJob={(job: Job) => {
      console.log('Creating job:', job);
      // TODO: Implement job creation logic
      navigation.navigate('CustomerTabs');
    }}
  />
);

// Customer Tab Navigator
const CustomerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenWrapper}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsStackNavigator}
        options={{
          tabBarLabel: 'My Jobs',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>💬</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Professional Tab Navigator
const ProfessionalTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="JobFeed"
        component={JobFeedScreenWrapper}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyJobs"
        component={MyJobsStackNavigator}
        options={{
          tabBarLabel: 'My Jobs',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🔧</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>💬</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Placeholder components for screens not yet created
const JobsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="JobsList" component={JobsListScreen} />
    <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
  </Stack.Navigator>
);

const MyJobsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="MyJobsList" component={MyJobsListScreen} />
    <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
  </Stack.Navigator>
);

const ChatScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Chat Screen - Coming Soon</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen - Coming Soon</Text>
  </View>
);

const JobsListScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Jobs List Screen - Coming Soon</Text>
  </View>
);

const MyJobsListScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>My Jobs List Screen - Coming Soon</Text>
  </View>
);

const JobDetailsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Job Details Screen - Coming Soon</Text>
  </View>
);

const SelectServiceScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Select Service Screen - Coming Soon</Text>
  </View>
);

// Main App Navigator
export const AppNavigator = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Check for existing user session
    // For now, simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleSignUp = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {(props) => <SignUpScreen {...props} onSignUp={handleSignUp} />}
            </Stack.Screen>
          </>
        ) : (
          // Main App Stack
          <>
            {user.userType === 'customer' ? (
              <Stack.Screen name="CustomerTabs" component={CustomerTabNavigator} />
            ) : (
              <Stack.Screen name="ProfessionalTabs" component={ProfessionalTabNavigator} />
            )}
            <Stack.Screen name="CreateJob" component={CreateJobScreenWrapper} />
            <Stack.Screen name="SelectService" component={SelectServiceScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 