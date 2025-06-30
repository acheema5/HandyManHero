import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { colors, typography, spacing } from '../../utils/theme';
import { Job, ServiceCategory } from '../../types';

interface HomeScreenProps {
  navigation: any;
  user: any;
  jobs: Job[];
}

const SERVICE_CATEGORIES: { category: ServiceCategory; icon: string; description: string }[] = [
  {
    category: 'HVAC',
    icon: '❄️',
    description: 'Heating, ventilation, and air conditioning services',
  },
  {
    category: 'Gutter Cleaning',
    icon: '🏠',
    description: 'Gutter cleaning and maintenance',
  },
  {
    category: 'Plumbing',
    icon: '🚰',
    description: 'Plumbing repairs and installations',
  },
  {
    category: 'Electrical',
    icon: '⚡',
    description: 'Electrical work and repairs',
  },
  {
    category: 'General Handyman',
    icon: '🔧',
    description: 'General home repairs and maintenance',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  user,
  jobs,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  const handleCreateJob = () => {
    if (selectedCategory) {
      navigation.navigate('CreateJob', { category: selectedCategory });
    } else {
      navigation.navigate('SelectService');
    }
  };

  const handleViewJob = (job: Job) => {
    navigation.navigate('JobDetails', { job });
  };

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'accepted':
        return colors.info;
      case 'in_progress':
        return colors.primary;
      case 'completed':
        return colors.success;
      default:
        return colors.textLight;
    }
  };

  const getJobStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Waiting for Pro';
      case 'accepted':
        return 'Pro Assigned';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const recentJobs = jobs.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user.name}!</Text>
            <Text style={styles.subtitle}>What can we help you with today?</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Button
            title="Request a Service"
            onPress={handleCreateJob}
            style={styles.quickActionButton}
          />
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Categories</Text>
          <View style={styles.categoriesGrid}>
            {SERVICE_CATEGORIES.map((service) => (
              <TouchableOpacity
                key={service.category}
                style={[
                  styles.categoryCard,
                  selectedCategory === service.category && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(service.category)}
              >
                <Text style={styles.categoryIcon}>{service.icon}</Text>
                <Text style={styles.categoryTitle}>{service.category}</Text>
                <Text style={styles.categoryDescription}>{service.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Jobs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('JobHistory')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentJobs.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>No jobs yet</Text>
              <Text style={styles.emptySubtext}>Create your first service request</Text>
            </Card>
          ) : (
            recentJobs.map((job) => (
              <Card
                key={job.id}
                style={styles.jobCard}
                onPress={() => handleViewJob(job)}
              >
                <View style={styles.jobHeader}>
                  <Text style={styles.jobCategory}>{job.serviceCategory}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getJobStatusColor(job.status) }]}>
                    <Text style={styles.statusText}>{getJobStatusText(job.status)}</Text>
                  </View>
                </View>
                <Text style={styles.jobDescription} numberOfLines={2}>
                  {job.description}
                </Text>
                <Text style={styles.jobDate}>
                  {new Date(job.createdAt).toLocaleDateString()}
                </Text>
              </Card>
            ))
          )}
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
  scrollView: {
    flex: 1,
  },
  header: {
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
  section: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: spacing.md,
  },
  viewAllText: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: '500' as const,
  },
  quickActionButton: {
    marginBottom: spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  selectedCategory: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  categoryTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600' as const,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  categoryDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
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
    fontSize: typography.fontSize.base,
    fontWeight: '600' as const,
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    color: colors.white,
    fontWeight: '500' as const,
  },
  jobDescription: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  jobDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
  },
  emptyCard: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600' as const,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: typography.fontSize.base,
    color: colors.textLight,
  },
}); 