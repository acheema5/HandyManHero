import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { colors, typography, spacing } from '../../utils/theme';
import { Job, ServiceCategory } from '../../types';

interface JobFeedScreenProps {
  navigation: any;
  user: any;
  jobs: Job[];
  onAcceptJob: (jobId: string) => void;
  onRefresh: () => void;
}

export const JobFeedScreen: React.FC<JobFeedScreenProps> = ({
  navigation,
  user,
  jobs,
  onAcceptJob,
  onRefresh,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  const SERVICE_CATEGORIES: { category: ServiceCategory | 'all'; icon: string; label: string }[] = [
    { category: 'all', icon: '📋', label: 'All Jobs' },
    { category: 'HVAC', icon: '❄️', label: 'HVAC' },
    { category: 'Gutter Cleaning', icon: '🏠', label: 'Gutters' },
    { category: 'Plumbing', icon: '🚰', label: 'Plumbing' },
    { category: 'Electrical', icon: '⚡', label: 'Electrical' },
    { category: 'General Handyman', icon: '🔧', label: 'Handyman' },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const handleAcceptJob = (job: Job) => {
    onAcceptJob(job.id);
  };

  const handleViewJob = (job: Job) => {
    navigation.navigate('JobDetails', { job });
  };

  const filteredJobs = jobs.filter(job => 
    selectedCategory === 'all' || job.serviceCategory === selectedCategory
  );

  const getCategoryIcon = (category: ServiceCategory) => {
    const service = SERVICE_CATEGORIES.find(s => s.category === category);
    return service?.icon || '🔧';
  };

  const formatDistance = (address: string) => {
    // TODO: Implement actual distance calculation
    return '2.3 miles away';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user.name}!</Text>
          <Text style={styles.subtitle}>Available jobs in your area</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileButton}>
            <Text style={styles.profileInitial}>{user.name.charAt(0)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      <View style={styles.categorySection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {SERVICE_CATEGORIES.map((service) => (
            <TouchableOpacity
              key={service.category}
              style={[
                styles.categoryButton,
                selectedCategory === service.category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(service.category)}
            >
              <Text style={styles.categoryIcon}>{service.icon}</Text>
              <Text style={[
                styles.categoryLabel,
                selectedCategory === service.category && styles.selectedCategoryText,
              ]}>
                {service.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Job List */}
      <ScrollView
        style={styles.jobList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No jobs available</Text>
            <Text style={styles.emptySubtitle}>
              {selectedCategory === 'all' 
                ? 'Check back later for new job requests'
                : `No ${selectedCategory} jobs available right now`
              }
            </Text>
          </View>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <View style={styles.jobCategory}>
                  <Text style={styles.categoryIcon}>{getCategoryIcon(job.serviceCategory)}</Text>
                  <Text style={styles.jobCategoryText}>{job.serviceCategory}</Text>
                </View>
                <Text style={styles.jobTime}>{formatTimeAgo(job.createdAt)}</Text>
              </View>

              <Text style={styles.jobDescription} numberOfLines={3}>
                {job.description}
              </Text>

              {job.photos.length > 0 && (
                <View style={styles.photoPreview}>
                  <Image source={{ uri: job.photos[0] }} style={styles.previewImage} />
                  {job.photos.length > 1 && (
                    <View style={styles.photoCount}>
                      <Text style={styles.photoCountText}>+{job.photos.length - 1}</Text>
                    </View>
                  )}
                </View>
              )}

              <View style={styles.jobFooter}>
                <View style={styles.jobLocation}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.locationText}>{formatDistance(job.address)}</Text>
                </View>
                <Text style={styles.jobAddress} numberOfLines={1}>
                  {job.address}
                </Text>
              </View>

              <View style={styles.jobActions}>
                <Button
                  title="View Details"
                  onPress={() => handleViewJob(job)}
                  variant="outline"
                  size="small"
                  style={styles.viewButton}
                />
                <Button
                  title="Accept Job"
                  onPress={() => handleAcceptJob(job)}
                  size="small"
                  style={styles.acceptButton}
                />
              </View>
            </Card>
          ))
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primary,
  },
  greeting: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    opacity: 0.9,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600' as const,
    color: colors.white,
  },
  categorySection: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryScroll: {
    paddingHorizontal: spacing.lg,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  categoryLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500' as const,
    color: colors.text,
  },
  selectedCategoryText: {
    color: colors.white,
  },
  jobList: {
    flex: 1,
    padding: spacing.lg,
  },
  jobCard: {
    marginBottom: spacing.md,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  jobCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobCategoryText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600' as const,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  jobTime: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
  },
  jobDescription: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  photoPreview: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  previewImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  photoCount: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.black + '80',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  photoCountText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: '500' as const,
  },
  jobFooter: {
    marginBottom: spacing.md,
  },
  jobLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  locationText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500' as const,
  },
  jobAddress: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  jobActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  viewButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
}); 