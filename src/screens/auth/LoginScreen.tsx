import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors, typography, spacing } from '../../utils/theme';
import { User } from '../../types';

interface LoginScreenProps {
  navigation: any;
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  navigation,
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'professional'>('customer');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual authentication logic
      // For now, simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        userType,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      onLogin(mockUser);
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>HVAC Hero</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <View style={styles.userTypeContainer}>
              <Text style={styles.userTypeLabel}>I am a:</Text>
              <View style={styles.userTypeButtons}>
                <Button
                  title="Homeowner"
                  onPress={() => setUserType('customer')}
                  variant={userType === 'customer' ? 'primary' : 'outline'}
                  size="small"
                  style={styles.userTypeButton}
                />
                <Button
                  title="Professional"
                  onPress={() => setUserType('professional')}
                  variant={userType === 'professional' ? 'primary' : 'outline'}
                  size="small"
                  style={styles.userTypeButton}
                />
              </View>
            </View>

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Text style={styles.signUpLink} onPress={handleSignUp}>
                Sign Up
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  userTypeContainer: {
    marginBottom: spacing.lg,
  },
  userTypeLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500' as const,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  userTypeButton: {
    flex: 1,
  },
  loginButton: {
    marginTop: spacing.md,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  signUpText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  signUpLink: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: '600' as const,
  },
}); 