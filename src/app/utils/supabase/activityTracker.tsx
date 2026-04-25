import { supabase } from './client';
import { projectId } from './info';

export interface Activity {
  id: string;
  userId: string;
  type: 'plant_view' | 'compound_analyze' | 'report_generate' | 'upload_compound';
  description: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

class ActivityTracker {
  private isTracking = true;

  async trackActivity(type: Activity['type'], description: string, metadata?: Record<string, any>) {
    if (!this.isTracking) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user?.id) {
        const activity: Omit<Activity, 'id'> = {
          userId: session.user.id,
          type,
          description,
          metadata,
          timestamp: new Date().toISOString()
        };

        // Store activity in KV store with user-specific key
        const activityKey = `activity_${session.user.id}_${Date.now()}`;
        
        // Also maintain a list of recent activities for the user
        const recentActivitiesKey = `recent_activities_${session.user.id}`;
        
        // For now, we'll just log to console since we're using KV store
        console.log('Activity tracked:', activity);
        
        // In a real implementation, you might want to store this in KV or send to server
        // For demo purposes, we'll store in localStorage
        const existingActivities = JSON.parse(localStorage.getItem(recentActivitiesKey) || '[]');
        existingActivities.unshift({ ...activity, id: activityKey });
        
        // Keep only last 20 activities
        const trimmedActivities = existingActivities.slice(0, 20);
        localStorage.setItem(recentActivitiesKey, JSON.stringify(trimmedActivities));
      }
    } catch (error) {
      console.log('Activity tracking error:', error);
    }
  }

  async getRecentActivities(userId?: string): Promise<Activity[]> {
    try {
      if (!userId) {
        const { data: { session } } = await supabase.auth.getSession();
        userId = session?.user?.id;
      }

      if (!userId) return [];

      const recentActivitiesKey = `recent_activities_${userId}`;
      const activities = JSON.parse(localStorage.getItem(recentActivitiesKey) || '[]');
      
      return activities;
    } catch (error) {
      console.log('Error fetching activities:', error);
      return [];
    }
  }

  enableTracking() {
    this.isTracking = true;
  }

  disableTracking() {
    this.isTracking = false;
  }
}

export const activityTracker = new ActivityTracker();