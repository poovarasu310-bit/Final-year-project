import { useState, useEffect } from 'react';
import { supabase } from './client';
import { projectId } from './info';

export function useUserStats() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.access_token) {
        await fetchUserProfile(session.access_token);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Check current session
    checkCurrentSession();

    return () => subscription.unsubscribe();
  }, []);

  const checkCurrentSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        await fetchUserProfile(session.access_token);
      }
    } catch (error) {
      console.log('Session check error:', error);
    }
  };

  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/server/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.log('Profile fetch error:', error);
    }
  };

  const updateStats = async (statType: 'plantsViewed' | 'compoundsAnalyzed' | 'reportsGenerated' | 'uploadsContributed', increment: number = 1) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token && user) {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/server/auth/update-stats`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ statType, increment })
        });

        if (response.ok) {
          const data = await response.json();
          setUser(prev => prev ? { ...prev, stats: data.stats } : null);
          return data.stats;
        }
      }
    } catch (error) {
      console.log('Stats update error:', error);
    }
    return null;
  };

  return {
    user,
    updateStats,
    isLoggedIn: !!user
  };
}