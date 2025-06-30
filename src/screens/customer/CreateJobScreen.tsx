import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors, typography, spacing } from '../../utils/theme';
import { Job, ServiceCategory } from '../../types';

interface CreateJobScreenProps {
  navigation: any;
  route: any;
  onCreateJob: (job: Job) => void;
}

export const CreateJobScreen: React.FC<CreateJobScreenProps> = ({
  navigation,
  route,
  onCreateJob,
}) => {
  const { category } = route.params || {};
  
  const [formData, setFormData] = useState({
    description: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    if (photos.length >= 3) {
      Alert.alert('Maximum Photos', 'You can only upload up to 3 photos.');
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotos(prev => [...prev, result.assets[0].uri]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateJob = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement actual job creation logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newJob: Job = {
        id: Date.now().toString(),
        customerId: '1', // TODO: Get from auth context
        serviceCategory: category || 'HVAC',
        description: formData.description,
        photos,
        address: formData.address,
        preferredDate: new Date(formData.preferredDate),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      onCreateJob(newJob);
      Alert.alert(
        'Job Created!',
        'Your service request has been submitted. Professionals will be notified and can accept your job.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('JobDetails', { job: newJob }),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Job Request</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Service Category */}
          {category && (
            <View style={styles.categorySection}>
              <Text style={styles.sectionTitle}>Service Category</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            </View>
          )}

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Describe the Issue</Text>
            <Input
              placeholder="Tell us what you need help with..."
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              multiline
              numberOfLines={4}
              error={errors.description}
            />
          </View>

          {/* Photos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Photos (Optional)</Text>
            <Text style={styles.sectionSubtitle}>
              Upload up to 3 photos to help professionals understand the issue
            </Text>
            
            <View style={styles.photoGrid}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto(index)}
                  >
                    <Text style={styles.removePhotoText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
              
              {photos.length < 3 && (
                <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                  <Text style={styles.addPhotoText}>+</Text>
                  <Text style={styles.addPhotoLabel}>Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Address</Text>
            <Input
              placeholder="Enter the address where service is needed"
              value={formData.address}
              onChangeText={(value) => updateFormData('address', value)}
              multiline
              numberOfLines={2}
              error={errors.address}
            />
          </View>

          {/* Preferred Date & Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferred Date & Time</Text>
            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeInput}>
                <Input
                  placeholder="Date (MM/DD/YYYY)"
                  value={formData.preferredDate}
                  onChangeText={(value) => updateFormData('preferredDate', value)}
                  error={errors.preferredDate}
                />
              </View>
              <View style={styles.dateTimeInput}>
                <Input
                  placeholder="Time (e.g., 2:00 PM)"
                  value={formData.preferredTime}
                  onChangeText={(value) => updateFormData('preferredTime', value)}
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <Button
            title="Submit Job Request"
            onPress={handleCreateJob}
            loading={loading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.sm,
  },
  backButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: '500' as const,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600' as const,
    color: colors.text,
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  categorySection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  categoryBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600' as const,
    color: colors.primary,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  photoContainer: {
    position: 'relative',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 24,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  addPhotoLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dateTimeInput: {
    flex: 1,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
}); 