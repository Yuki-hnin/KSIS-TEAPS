import React, { useState } from 'react';
import { PrincipalDashboard } from './components/principal/PrincipalDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { EvaluationForm } from './components/evaluation/EvaluationForm';
import { TeacherEvaluation } from './components/evaluation/TeacherEvaluation';
import { ReportScreen } from './components/reports/ReportScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { KPIInfo } from './components/kpi/KPIInfo';
import { KPICalculation } from './components/kpi/KPICalculation';
import { AttendanceSystem } from './components/attendance/AttendanceSystem';
import { ReEvaluationRequest } from './components/evaluation/ReEvaluationRequest';
import { TeacherList } from './components/teacher/TeacherList';
import { AddTeacher } from './components/teacher/AddTeacher';
import { Toaster } from './components/ui/sonner';
import { getViewAnimations } from 'framer-motion';


export type View = 'principal' | 'teacher' | 'admin' | 'evaluation-form' | 'reports' | 'login' | 
  'kpi-info' | 'kpi-calculation' | 'attendance' | 're-evaluation' | 'teacher-list' | 'teacher-evaluation' | 'add-teacher';

// Mock user credentials
const users = {
  principal: { username: 'principal', password: 'principal123', name: 'Mdm Fadhilahism' },
  teacher: { username: 'teacher', password: 'teacher123', name: 'Nadiah Arsat' },
  admin: { username: 'admin', password: 'admin123', name: 'HR Admin' },
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [userRole, setUserRole] = useState<'principal' | 'teacher' | 'admin' | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleLogin = (role: 'principal' | 'teacher' | 'admin', username: string, password: string): boolean => {
    const user = users[role];
    if (user.username === username && user.password === password) {
      setUserRole(role);
      setUserName(user.name);
      setCurrentView(role);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName('');
    setCurrentView('login');
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  if (currentView === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {currentView === 'principal' && (
        <PrincipalDashboard onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} />
      )}
      {currentView === 'teacher' && (
        <TeacherDashboard onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} />
      )}
      {currentView === 'admin' && (
        <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} />
      )}
      {currentView === 'evaluation-form' && (
        <EvaluationForm onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} />
      )}
      {currentView === 'reports' && (
        <ReportScreen onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} userRole={userRole ?? 'principal'} />
      )}
      {currentView === 'kpi-info' && userRole && (
        <KPIInfo onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} userRole={userRole} />
      )}
      {currentView === 'kpi-calculation' && userRole && (
        <KPICalculation onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} userRole={userRole} />
      )}
      {currentView === 'attendance' && userRole && (
        <AttendanceSystem onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} userRole={userRole} />
      )}
      {currentView === 're-evaluation' && userRole && (
        <ReEvaluationRequest onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} userRole={userRole} />
      )}
      {currentView === 'teacher-list' && userRole && (
        <TeacherList onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} userRole={userRole} />
      )}
      {currentView === 'add-teacher' && userRole && (
        <AddTeacher onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} userRole={userRole} />
      )}
      {currentView === 'teacher-evaluation' && userRole && (
        <TeacherEvaluation onNavigate={handleNavigate} onLogout={handleLogout} userName={userName} userRole={userRole as 'principal' | 'admin'} />
      )}
    </div>
  );
}