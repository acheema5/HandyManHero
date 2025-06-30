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
import { User, ServiceCategory } from '../../types';

interface SignUpScreenProps {
  navigation: any;
  onSignUp: (user: User) => void;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  'HVAC',
  'Gutter Cleaning',
  'Plumbing',
  'Electrical',
  'General Handyman',
];

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  navigation,
  onSignUp,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    businessName: '',
    licenseNumber: '',
    insuranceNumber: '',
  });
  const [userType, setUserType] = useState<'customer' | 'professional'>('customer');
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (userType === 'customer' && !formData.address) {
      newErrors.address = 'Address is required';
    }

    if (userType === 'professional') {
      if (!formData.businessName) {
        newErrors.businessName = 'Business name is required';
      }
      if (!formData.licenseNumber) {
        newErrors.licenseNumber = 'License number is required';
      }
      if (!formData.insuranceNumber) {
        newErrors.insuranceNumber = 'Insurance number is required';
      }
      if (selectedCategories.length === 0) {
        newErrors.categories = 'Please select at least one service category';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual signup logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        userType,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      onSignUp(mockUser);
    } catch (error) {
      Alert.alert('Sign Up Failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: ServiceCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join HVAC Hero today</Text>
          </View>

          <View style={styles.form}>
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

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              autoCapitalize="words"
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="Phone (Optional)"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              secureTextEntry
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry
              error={errors.confirmPassword}
            />

            {userType === 'customer' && (
              <Input
                label="Address"
                placeholder="Enter your address"
                value={formData.address}
                onChangeText={(value) => updateFormData('address', value)}
                multiline
                numberOfLines={2}
                error={errors.address}
              />
            )}

            {userType === 'professional' && (
              <>
                <Input
                  label="Business Name"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChangeText={(value) => updateFormData('businessName', value)}
                  error={errors.businessName}
                />

                <Input
                  label="License Number"
                  placeholder="Enter your license number"
                  value={formData.licenseNumber}
                  onChangeText={(value) => updateFormData('licenseNumber', value)}
                  error={errors.licenseNumber}
                />

                <Input
                  label="Insurance Number"
                  placeholder="Enter your insurance number"
                  value={formData.insuranceNumber}
                  onChangeText={(value) => updateFormData('insuranceNumber', value)}
                  error={errors.insuranceNumber}
                />

                <View style={styles.categoriesContainer}>
                  <Text style={styles.categoriesLabel}>Service Categories:</Text>
                  <View style={styles.categoriesGrid}>
                    {SERVICE_CATEGORIES.map((category) => (
                      <Button
                        key={category}
                        title={category}
                        onPress={() => toggleCategory(category)}
                        variant={selectedCategories.includes(category) ? 'primary' : 'outline'}
                        size="small"
                        style={styles.categoryButton}
                      />
                    ))}
                  </View>
                  {errors.categories && (
                    <Text style={styles.errorText}>{errors.categories}</Text>
                  )}
                </View>
              </>
            )}

            <Button
              title="Create Account"
              onPress={handleSignUp}
              loading={loading}
              style={styles.signUpButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text style={styles.loginLink} onPress={handleBackToLogin}>
                Sign In
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
  categoriesContainer: {
    marginBottom: spacing.lg,
  },
  categoriesLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500' as const,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryButton: {
    flex: 1,
    minWidth: '45%',
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },
  signUpButton: {
    marginTop: spacing.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  loginText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: '600' as const,
  },
}); 