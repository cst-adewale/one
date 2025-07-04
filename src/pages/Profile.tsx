import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Award, BookOpen, TrendingUp, Clock, Users, MessageSquare } from 'lucide-react';
import Card from '../components/Common/Card';
import StatCard from '../components/Common/StatCard';
import { useAuth } from '../contexts/AuthContext';
import { mockStudents, mockLecturers } from '../data/mockData';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Demo User',
    email: user?.email || 'demo@calebuniversity.edu.ng',
    phone: '+234 803 123 4567',
    address: 'Lagos, Nigeria',
    dateOfBirth: '1995-06-15',
    department: user?.department || 'Computer Science',
    faculty: user?.faculty || 'COPAS',
    bio: 'Passionate about technology and education. Dedicated to academic excellence and continuous learning.',
    interests: ['Machine Learning', 'Web Development', 'Data Science', 'Research'],
    emergencyContact: {
      name: 'John Doe',
      relationship: 'Father',
      phone: '+234 803 987 6543'
    },
    // Staff-specific fields
    staffId: user?.role === 'lecturer' ? 'STAFF001' : undefined,
    officeLocation: user?.role === 'lecturer' ? 'Room 204, Engineering Building' : undefined,
    dateJoined: user?.role === 'lecturer' ? '2020-09-01' : undefined,
    employmentType: user?.role === 'lecturer' ? 'Full-time' : undefined,
    qualifications: user?.role === 'lecturer' ? 'PhD in Computer Science' : undefined,
    specializations: user?.role === 'lecturer' ? ['Machine Learning', 'Data Science', 'Software Engineering'] : undefined,
    officeHours: user?.role === 'lecturer' ? 'Monday-Friday, 2:00 PM - 4:00 PM' : undefined,
    mentorshipRoles: user?.role === 'lecturer' ? ['Final Year Project Supervisor', 'Academic Advisor'] : undefined,
    // Admin-specific fields
    adminId: user?.role === 'admin' ? 'ADMIN001' : undefined,
    accessLevel: user?.role === 'admin' ? 'Full Admin' : undefined,
    lastLogin: user?.role === 'admin' ? new Date().toISOString() : undefined,
    twoFactorEnabled: user?.role === 'admin' ? true : undefined,
    reportsCreated: user?.role === 'admin' ? 45 : undefined,
    usersManaged: user?.role === 'admin' ? 1250 : undefined
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Get user-specific data based on role
  const userData = user?.role === 'student' 
    ? mockStudents.find(s => s.email === user?.email) || mockStudents[0]
    : user?.role === 'lecturer'
    ? mockLecturers.find(l => l.email === user?.email) || mockLecturers[0]
    : null;

  const renderBasicInfo = () => (
    <Card>
      <div className="grid grid-cols-1 lg:grid-cols-4 compact-grid">
        {/* Profile Picture and Basic Info */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {profileData.name.split(' ').map(n => n.charAt(0)).join('')}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600">
                <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            )}
          </div>
          <h3 className="compact-header text-gray-900 dark:text-white">{profileData.name}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user?.role}</p>
          <p className="text-xs text-primary-600 dark:text-primary-400">{profileData.department}</p>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-2">
          <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Contact Information</h4>
          <div className="tight-spacing">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <span>{profileData.email}</span>
              )}
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <span>{profileData.phone}</span>
              )}
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <span>{profileData.address}</span>
              )}
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              {isEditing ? (
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>

        {/* Academic/Professional Information */}
        <div>
          <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">
            {user?.role === 'admin' ? 'System Info' : 'Academic Info'}
          </h4>
          <div className="tight-spacing">
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Faculty:</span>
              <p className="font-medium">{profileData.faculty}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Department:</span>
              <p className="font-medium">{profileData.department}</p>
            </div>
            {user?.role === 'student' && userData && (
              <>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Level:</span>
                  <p className="font-medium">{userData.level}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Student ID:</span>
                  <p className="font-medium">{userData.studentId}</p>
                </div>
              </>
            )}
            {user?.role === 'lecturer' && (
              <>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Staff ID:</span>
                  <p className="font-medium">{profileData.staffId}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Office:</span>
                  <p className="font-medium">{profileData.officeLocation}</p>
                </div>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Admin ID:</span>
                  <p className="font-medium">{profileData.adminId}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Access Level:</span>
                  <p className="font-medium">{profileData.accessLevel}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-3 py-2 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </Card>
  );

  const renderTeachingInfo = () => {
    if (user?.role !== 'lecturer') return null;

    return (
      <div className="compact-spacing">
        {/* Teaching Information */}
        <Card title="Teaching Information">
          <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Current Courses</h5>
              <div className="tight-spacing">
                {userData?.courses.map((course, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">{course}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Teaching Details</h5>
              <div className="tight-spacing">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Teaching Load:</span>
                  <p className="font-medium">12 credit units/semester</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Average Class Size:</span>
                  <p className="font-medium">45 students</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Teaching Rating:</span>
                  <p className="font-medium">{userData?.rating}/5.0</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Student Engagement - Moved from separate tab */}
        <Card title="Student Engagement">
          <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Office Hours & Availability</h5>
              <div className="tight-spacing">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{profileData.officeHours}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Office Location:</span>
                  <p className="font-medium">{profileData.officeLocation}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Response Time:</span>
                  <p className="font-medium">Within 24 hours</p>
                </div>
              </div>
            </div>
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Mentorship & Advising</h5>
              <div className="tight-spacing">
                {profileData.mentorshipRoles?.map((role, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{role}</span>
                  </div>
                ))}
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Students Mentored:</span>
                  <p className="font-medium">15 active mentees</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Research & Publications */}
        <Card title="Research & Publications">
          <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Research Areas</h5>
              <div className="flex flex-wrap gap-2">
                {profileData.specializations?.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 text-xs rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Publications</h5>
              <div className="tight-spacing">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Journal Articles:</span>
                  <p className="font-medium">12 publications</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Conference Papers:</span>
                  <p className="font-medium">8 presentations</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Research Grants:</span>
                  <p className="font-medium">₦2.5M secured</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderSystemInfo = () => {
    if (user?.role !== 'admin') return null;

    return (
      <div className="compact-spacing">
        {/* System Role & Permissions */}
        <Card title="System Role & Permissions">
          <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Access Control</h5>
              <div className="tight-spacing">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Access Level:</span>
                  <p className="font-medium">{profileData.accessLevel}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Modules Managed:</span>
                  <p className="font-medium">Students, Staff, Reports, Settings</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Role Update:</span>
                  <p className="font-medium">January 15, 2024</p>
                </div>
              </div>
            </div>
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Security Settings</h5>
              <div className="tight-spacing">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Two-Factor Auth:</span>
                  <p className="font-medium text-green-600">Enabled</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Password Last Changed:</span>
                  <p className="font-medium">30 days ago</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Login Attempts:</span>
                  <p className="font-medium">All successful</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Activity Log */}
        <Card title="Activity Log & Audit Trail">
          <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">Recent Activity</h5>
              <div className="tight-spacing">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Login:</span>
                  <p className="font-medium">{new Date().toLocaleString()}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">IP Address:</span>
                  <p className="font-medium">192.168.1.100</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Device:</span>
                  <p className="font-medium">Chrome on Windows</p>
                </div>
              </div>
            </div>
            <div>
              <h5 className="compact-subheader text-gray-900 dark:text-white mb-2">System Contributions</h5>
              <div className="tight-spacing">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Reports Created:</span>
                  <p className="font-medium">{profileData.reportsCreated}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Users Managed:</span>
                  <p className="font-medium">{profileData.usersManaged}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">System Alerts Handled:</span>
                  <p className="font-medium">23 this month</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Profile
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your personal information and preferences
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-3 py-2 rounded text-sm hover:bg-primary-700 transition-colors"
        >
          <Edit className="h-4 w-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-4">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === 'basic'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Basic Information
        </button>
        {user?.role === 'lecturer' && (
          <button
            onClick={() => setActiveTab('teaching')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              activeTab === 'teaching'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Teaching & Engagement
          </button>
        )}
        {user?.role === 'admin' && (
          <button
            onClick={() => setActiveTab('system')}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              activeTab === 'system'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            System & Security
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'basic' && renderBasicInfo()}
      {activeTab === 'teaching' && renderTeachingInfo()}
      {activeTab === 'system' && renderSystemInfo()}

      {/* Performance Stats */}
      {user?.role === 'student' && userData && (
        <div className="grid grid-cols-1 md:grid-cols-3 compact-grid">
          <StatCard
            title="Current GPA"
            value={userData.gpa.toFixed(2)}
            icon={TrendingUp}
            change={{ value: "0.15", type: "increase" }}
            color="green"
          />
          <StatCard
            title="Courses Enrolled"
            value={userData.courses.length}
            icon={BookOpen}
            color="blue"
          />
          <StatCard
            title="Current Level"
            value={userData.level}
            icon={Award}
            color="purple"
          />
        </div>
      )}

      {user?.role === 'lecturer' && userData && (
        <div className="grid grid-cols-1 md:grid-cols-3 compact-grid">
          <StatCard
            title="Teaching Rating"
            value={`${userData.rating}/5.0`}
            icon={Award}
            change={{ value: "0.2", type: "increase" }}
            color="yellow"
          />
          <StatCard
            title="Courses Teaching"
            value={userData.courses.length}
            icon={BookOpen}
            color="blue"
          />
          <StatCard
            title="Students"
            value={userData.studentsCount}
            icon={User}
            color="green"
          />
        </div>
      )}

      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 compact-grid">
          <StatCard
            title="Reports Created"
            value={profileData.reportsCreated || 0}
            icon={BookOpen}
            change={{ value: "5", type: "increase" }}
            color="blue"
          />
          <StatCard
            title="Users Managed"
            value={profileData.usersManaged || 0}
            icon={Users}
            color="green"
          />
          <StatCard
            title="System Uptime"
            value="99.9%"
            icon={TrendingUp}
            color="purple"
          />
        </div>
      )}

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid">
        {/* Bio */}
        <Card title="About">
          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.bio}</p>
          )}
        </Card>

        {/* Emergency Contact */}
        <Card title="Emergency Contact">
          <div className="tight-spacing">
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.emergencyContact.name}
                  onChange={(e) => setProfileData({
                    ...profileData, 
                    emergencyContact: {...profileData.emergencyContact, name: e.target.value}
                  })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white mt-1"
                />
              ) : (
                <p className="font-medium">{profileData.emergencyContact.name}</p>
              )}
            </div>
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Relationship:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.emergencyContact.relationship}
                  onChange={(e) => setProfileData({
                    ...profileData, 
                    emergencyContact: {...profileData.emergencyContact, relationship: e.target.value}
                  })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white mt-1"
                />
              ) : (
                <p className="font-medium">{profileData.emergencyContact.relationship}</p>
              )}
            </div>
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.emergencyContact.phone}
                  onChange={(e) => setProfileData({
                    ...profileData, 
                    emergencyContact: {...profileData.emergencyContact, phone: e.target.value}
                  })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white mt-1"
                />
              ) : (
                <p className="font-medium">{profileData.emergencyContact.phone}</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Interests */}
      <Card title="Interests & Skills">
        {isEditing ? (
          <div>
            <input
              type="text"
              placeholder="Add interests separated by commas"
              value={profileData.interests.join(', ')}
              onChange={(e) => setProfileData({
                ...profileData, 
                interests: e.target.value.split(',').map(i => i.trim())
              })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profileData.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 text-xs rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;