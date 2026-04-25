import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { activityTracker } from '../utils/supabase/activityTracker';
import type { Activity } from '../utils/supabase/activityTracker';
import { DataSeeder } from './DataSeeder';
import { 
  User, 
  Mail, 
  Lock, 
  Settings, 
  Activity as ActivityIcon, 
  BookOpen, 
  FlaskConical,
  Eye,
  EyeOff,
  LogOut,
  Shield,
  Upload,
  FileText
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  fullName: string;
  institution?: string;
  role?: string;
  joinDate: string;
  isVerified: boolean;
  stats: {
    plantsViewed: number;
    compoundsAnalyzed: number;
    reportsGenerated: number;
    uploadsContributed: number;
  };
}

export function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    institution: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  // Check for existing session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        await fetchUserProfile(session.access_token);
      }
    } catch (error: any) {
      console.log('Session check error:', error);
    } finally {
      setInitialLoading(false);
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
        setIsLoggedIn(true);
        
        // Load recent activities
        const activities = await activityTracker.getRecentActivities(data.user.id);
        setRecentActivities(activities);
      }
    } catch (error: any) {
      console.log('Profile fetch error:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required');
      }

      if (authMode === 'register') {
        if (!formData.fullName) {
          throw new Error('Full name is required');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        // Register new user
        const registerResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/server/auth/register`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            institution: formData.institution
          })
        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          throw new Error(registerData.error || 'Registration failed');
        }

        // After successful registration, sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          throw new Error(signInError.message);
        }

        if (signInData.session?.access_token) {
          await fetchUserProfile(signInData.session.access_token);
        }

      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data.session?.access_token) {
          await fetchUserProfile(data.session.access_token);
        }
      }

      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        institution: ''
      });

    } catch (err: any) {
      setError(err.message);
      console.log('Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
    } catch (error: any) {
      console.log('Logout error:', error);
    }
  };

  const updateUserStats = async (statType: string, increment: number = 1) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
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
        }
      }
    } catch (error: any) {
      console.log('Stats update error:', error);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'plant_view': return <BookOpen className="w-4 h-4" />;
      case 'compound_analyze': return <FlaskConical className="w-4 h-4" />;
      case 'report_generate': return <FileText className="w-4 h-4" />;
      case 'upload_compound': return <Upload className="w-4 h-4" />;
      default: return <ActivityIcon className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'plant_view': return 'text-green-600 bg-green-50';
      case 'compound_analyze': return 'text-blue-600 bg-blue-50';
      case 'report_generate': return 'text-purple-600 bg-purple-50';
      case 'upload_compound': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (initialLoading) {
    return (
      <div className="max-w-md mx-auto mt-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <Card>
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {authMode === 'login' 
                ? 'Sign in to access your medicinal plants research account' 
                : 'Join our community of researchers and scientists'
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Password</label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-sm mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                {authMode === 'login' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                {user?.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl">{user?.fullName}</h1>
                  {user?.isVerified && (
                    <Badge className="bg-green-100 text-green-700">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600">{user?.role} • {user?.institution}</p>
                <p className="text-sm text-gray-500">Joined {new Date(user?.joinDate || '').toLocaleDateString()}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Plants Viewed</p>
            <p className="text-xl font-bold text-green-600">{user?.stats.plantsViewed}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FlaskConical className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Compounds</p>
            <p className="text-xl font-bold text-blue-600">{user?.stats.compoundsAnalyzed}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Activity className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Reports</p>
            <p className="text-xl font-bold text-purple-600">{user?.stats.reportsGenerated}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Settings className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600">Uploads</p>
            <p className="text-xl font-bold text-orange-600">{user?.stats.uploadsContributed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Simple Settings Section */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <h3>Recent Activity</h3>
              <p className="text-sm text-gray-600">Your latest interactions with the platform</p>
            </CardHeader>
            <CardContent>
              {recentActivities.length > 0 ? (
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ActivityIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No recent activity</p>
                  <p className="text-sm">Start exploring plants and compounds to see your activity here!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <h3>Personal Information</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <Input defaultValue={user?.fullName} />
              </div>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <Input defaultValue={user?.email} />
              </div>
              <div>
                <label className="block text-sm mb-2">Institution</label>
                <Input defaultValue={user?.institution} />
              </div>
              <div>
                <label className="block text-sm mb-2">Role</label>
                <Input defaultValue={user?.role} />
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <h3>Account Security</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Enable Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600">
                <User className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* Data Seeder Component */}
          <DataSeeder />
        </TabsContent>
      </Tabs>
    </div>
  );
}