import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Bell, 
  Calendar, 
  Search,
  Moon,
  User,
  Plus,
  Clock,
  AlertTriangle,
  Info,
  Lock,
  Globe,
  Volume2,
  Menu,
  X,
  Smartphone,
  LogOut,
  Shield,
  Edit,
  Key,
  Save,
  CheckCircle2,
  Video,
  Sun,
  XCircle
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';
import 'react-day-picker/dist/style.css';
import { TranslationProvider, useTranslation } from './contexts/TranslationContext';

// Add a type for theme colors
type ThemeColors = {
  background: string;
  card: string;
  cardHover: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryHover: string;
};

// Theme configuration
const lightTheme: ThemeColors = {
  background: 'bg-gray-50',
  card: 'bg-white',
  cardHover: 'hover:bg-gray-50',
  text: 'text-gray-900',
  textSecondary: 'text-gray-600',
  border: 'border-gray-200',
  primary: 'bg-blue-600',
  primaryHover: 'hover:bg-blue-700'
};

const darkTheme: ThemeColors = {
  background: 'bg-gray-900',
  card: 'bg-gray-800',
  cardHover: 'hover:bg-gray-700',
  text: 'text-white',
  textSecondary: 'text-gray-400',
  border: 'border-gray-700',
  primary: 'bg-blue-600',
  primaryHover: 'hover:bg-blue-700'
};

// Add type for user profile
type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
};

function DashboardView({ darkMode, theme }: { darkMode: boolean; theme: ThemeColors }) {
  const { t } = useTranslation();
  const [pressureData, setPressureData] = useState({
    fsr1: 0,
    status1: 'No pressure',
    fsr2: 0,
    status2: 'No pressure',
    fsr3: 0,
    status3: 'No pressure',
    timestamp: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch pressure data from the API
  useEffect(() => {
    const fetchPressureData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/sensors/latest');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API data:', data);
        setPressureData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pressure data:', err);
        setError('Failed to load pressure data');
        setLoading(false);
      }
    };

    // Fetch data immediately
    fetchPressureData();

    // Set up interval to fetch data
    const intervalId = setInterval(fetchPressureData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <>
      {/* Pressure Monitoring */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t('dashboard.footPressures')}</h2>
        {loading ? (
          <div className={`${theme.card} p-6 rounded-lg text-center`}>
            <p>Loading pressure data...</p>
          </div>
        ) : error ? (
          <div className={`${theme.card} p-6 rounded-lg text-center text-red-500`}>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { zone: 'Heel', value: pressureData.fsr1, status: pressureData.status1, color: 'blue' },
                { zone: 'Middle', value: pressureData.fsr2, status: pressureData.status2, color: 'yellow' },
                { zone: 'Toe', value: pressureData.fsr3, status: pressureData.status3, color: 'green' }
              ].map((item, index) => (
                <div key={item.zone} className={`${theme.card} p-6 rounded-lg`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-4xl font-bold ${
                      item.color === 'blue' ? 'text-blue-500' : 
                      item.color === 'yellow' ? 'text-yellow-500' : 
                      'text-green-500'
                    }`}>
                      {item.value}
                    </span>
                    <span className="text-gray-400">mmHg</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-gray-700">
                    <div 
                      className={`h-full ${
                        item.color === 'blue' ? 'bg-blue-500' : 
                        item.color === 'yellow' ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(item.value / 2, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>0</span>
                    <span>200 mmHg</span>
                  </div>
                  <p className="mt-2 font-medium">{item.zone}</p>
                  <p className="text-sm text-gray-400">{item.status}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-gray-400">
                Last updated: {new Date(pressureData.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </>
        )}
      </section>

      {/* Health Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t('dashboard.healthStats')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className={`${theme.card} p-6 rounded-lg`}>
            <div className="flex items-center gap-4">
              <Heart className="text-red-500" size={24} />
              <div>
                <p className="text-3xl font-bold">91 <span className="text-sm text-gray-400">bpm</span></p>
                <p className="text-gray-400">{t('dashboard.heartRate')}</p>
              </div>
            </div>
          </div>
          <div className={`${theme.card} p-6 rounded-lg`}>
            <div className="flex items-center gap-4">
              <div className="text-blue-500">🌡️</div>
              <div>
                <p className="text-3xl font-bold">36.2 <span className="text-sm text-gray-400">°C</span></p>
                <p className="text-gray-400">{t('dashboard.temperature')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ulcer Monitoring */}
      <section>
        <div className={`${theme.card} p-6 rounded-lg`}>
          <h2 className="text-2xl font-bold mb-2">{t('dashboard.ulcerMonitoring')}</h2>
          <p className="text-gray-400 text-sm">{t('dashboard.ursUpdate')}</p>
        </div>
      </section>
    </>
  );
}

function AppointmentView({ darkMode, theme }: { darkMode: boolean; theme: ThemeColors }) {
  const { t } = useTranslation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedDoctor, setSelectedDoctor] = useState<string>();
  const [appointments, setAppointments] = useState<Array<{
    id: string;
    date: Date;
    time: string;
    doctor: string;
    status: 'pending' | 'approved' | 'rejected';
    meetUrl?: string;
  }>>([]);

  const doctors = [
    { id: '1', name: 'Dr. Sarah Smith', specialty: 'Podiatrist' },
    { id: '2', name: 'Dr. John Davis', specialty: 'Orthopedic Surgeon' },
    { id: '3', name: 'Dr. Emily Wilson', specialty: 'Physical Therapist' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && selectedDoctor) {
      const newAppointment = {
        id: Math.random().toString(36).substr(2, 9),
        date: selectedDate,
        time: selectedTime,
        doctor: selectedDoctor,
        status: 'pending' as const
      };
      setAppointments([...appointments, newAppointment]);
      setIsBookingOpen(false);
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setSelectedDoctor(undefined);
    }
  };

  const handleApproveAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id 
        ? { 
            ...apt, 
            status: 'approved', 
            meetUrl: 'https://meet.google.com/' + Math.random().toString(36).substr(2, 12)
          } 
        : apt
    ));
  };

  return (
    <div className={`${theme.card} p-6 rounded-lg`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">{t('appointments.title')}</h2>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto justify-center"
        >
          <Plus size={20} /> {t('appointments.bookAppointment')}
        </button>
      </div>

      {/* Appointment List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className={`${theme.card} p-4 rounded-lg`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  <span>{format(appointment.date, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-500" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-blue-500" />
                  <span>{appointment.doctor}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm
                  ${appointment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    appointment.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                    'bg-red-500/20 text-red-500'}`}
                >
                  {appointment.status === 'pending' ? <Clock size={14} className="animate-spin" /> :
                   appointment.status === 'approved' ? <CheckCircle2 size={14} /> :
                   <XCircle size={14} />}
                  {t(`appointments.${appointment.status}`)}
                </div>
                {appointment.status === 'pending' && (
                  <button
                    onClick={() => handleApproveAppointment(appointment.id)}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    {t('appointments.approved')}
                  </button>
                )}
                {appointment.status === 'approved' && appointment.meetUrl && (
                  <a
                    href={appointment.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
                  >
                    <Video size={14} />
                    {t('appointments.joinMeeting')}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      <Transition show={isBookingOpen} as={React.Fragment}>
        <Dialog 
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsBookingOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className={`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform ${theme.card} rounded-2xl`}>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6"
                >
                  {t('appointments.bookAppointment')}
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  {/* Calendar */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('appointments.selectDate')}</label>
                    <div className={`${theme.card} p-4 rounded-lg`}>
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: new Date() }}
                        className={theme.text}
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('appointments.selectTime')}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm rounded-lg ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white'
                              : theme.cardHover
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Doctor Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('appointments.selectDoctor')}</label>
                    <div className="space-y-2">
                      {doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => setSelectedDoctor(doctor.name)}
                          className={`w-full p-3 text-left rounded-lg ${
                            selectedDoctor === doctor.name
                              ? 'bg-blue-600 text-white'
                              : theme.cardHover
                          }`}
                        >
                          <div className="font-medium">{doctor.name}</div>
                          <div className="text-sm opacity-75">{doctor.specialty}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${theme.cardHover} ${theme.border}`}
                  >
                    {t('appointments.cancel')}
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime || !selectedDoctor}
                    className={`px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {t('appointments.book')}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function NotificationsView({ darkMode, theme }: { darkMode: boolean; theme: ThemeColors }) {
  const { t } = useTranslation();
  
  return (
    <div className={`${theme.card} p-6 rounded-lg`}>
      <h2 className="text-2xl font-bold mb-6">{t('notifications.title')}</h2>
      <div className="space-y-4">
        {[
          { icon: AlertTriangle, color: 'text-red-500', title: t('notifications.highPressure'), message: 'Unusual pressure detected in heel area', time: '5 min ago' },
          { icon: Info, color: 'text-blue-500', title: t('notifications.appointmentReminder'), message: 'Checkup with Dr. Smith tomorrow at 9 AM', time: '1 hour ago' },
          { icon: Heart, color: 'text-green-500', title: t('notifications.healthUpdate'), message: 'Weekly health report is available', time: '2 hours ago' }
        ].map((notification, index) => (
          <div key={index} className={`${theme.card} p-4 rounded-lg flex flex-col sm:flex-row gap-4`}>
            <notification.icon className={`${notification.color} shrink-0`} size={24} />
            <div className="flex-1">
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-gray-400">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView({ darkMode, theme, userProfile, onUpdateProfile, onLanguageChange, currentLanguage }: { 
  darkMode: boolean; 
  theme: ThemeColors;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onLanguageChange: (lang: string) => void;
  currentLanguage: string;
}) {
  const { t } = useTranslation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [connectedDevices] = useState([
    { id: 1, name: 'Smart Insole #1', type: 'insole', status: 'connected', lastSync: '2 mins ago' },
    { id: 2, name: 'Smart Insole #2', type: 'insole', status: 'disconnected', lastSync: '1 day ago' }
  ]);

  // Update formData when userProfile changes
  React.useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleProfileUpdate = () => {
    onUpdateProfile(formData);
    setSuccessMessage(t('profile.updateSuccess'));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordReset = () => {
    setSuccessMessage(t('profile.passwordResetSuccess'));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    setSuccessMessage(twoFactorEnabled ? t('profile.twoFactorDisabled') : t('profile.twoFactorEnabled'));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleLanguageChange = (lang: string) => {
    onLanguageChange(lang);
    setSuccessMessage(t('profile.languageChanged'));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out z-50">
          <CheckCircle2 size={20} />
          {successMessage}
        </div>
      )}

      {/* Profile Information */}
      <div className={`${theme.card} p-6 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">{t('profile.profileInfo')}</h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">{t('profile.fullName')}</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg ${theme.card} ${theme.border} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">{t('profile.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg ${theme.card} ${theme.border} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">{t('profile.phone')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg ${theme.card} ${theme.border} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">{t('profile.location')}</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg ${theme.card} ${theme.border} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
            </div>
          </div>
          <button
            onClick={handleProfileUpdate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {t('profile.updateProfile')}
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className={`${theme.card} p-6 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">{t('profile.security')}</h2>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Key className="text-blue-500" size={24} />
              <div>
                <h3 className="font-medium">{t('profile.passwordReset')}</h3>
                <p className="text-sm text-gray-400">{t('profile.changePassword')}</p>
              </div>
            </div>
            <button
              onClick={handlePasswordReset}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              {t('profile.resetPassword')}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-500" size={24} />
              <div>
                <h3 className="font-medium">{t('profile.twoFactor')}</h3>
                <p className="text-sm text-gray-400">{t('profile.twoFactorDesc')}</p>
              </div>
            </div>
            <button
              onClick={handleTwoFactorToggle}
              className={`px-6 py-2 rounded-lg transition-colors w-full sm:w-auto ${
                twoFactorEnabled
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {twoFactorEnabled ? t('profile.enabled') : t('profile.disabled')}
            </button>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className={`${theme.card} p-6 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">{t('profile.language')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
            { code: 'fr', name: 'French', flag: '🇫🇷' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`p-4 rounded-lg flex items-center gap-3 transition-colors ${
                currentLanguage === lang.code
                  ? 'bg-blue-600 text-white'
                  : theme.cardHover
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Connected Devices */}
      <div className={`${theme.card} p-6 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">{t('profile.devices')}</h2>
        <div className="space-y-4">
          {connectedDevices.map((device) => (
            <div
              key={device.id}
              className={`${theme.card} p-4 rounded-lg flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${device.status === 'connected' ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                  <Smartphone className={device.status === 'connected' ? 'text-green-500' : 'text-gray-500'} size={24} />
                </div>
                <div>
                  <h3 className="font-medium">{device.name}</h3>
                  <p className="text-sm text-gray-400">{t('profile.lastSync')}: {device.lastSync}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  device.status === 'connected'
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-gray-500/20 text-gray-500'
                }`}
              >
                {t(`profile.${device.status}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegisterInsoleView({ darkMode, theme }: { darkMode: boolean; theme: ThemeColors }) {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    serialNumber: '',
    email: '',
    phone: '',
    fullName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`${theme.card} p-6 rounded-lg max-w-2xl mx-auto`}>
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <CheckCircle2 size={20} />
          {t('registerInsole.success')}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">{t('registerInsole.title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">{t('registerInsole.serialNumber')}</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            placeholder={t('registerInsole.enterSerial')}
            className={`w-full p-3 rounded-lg ${theme.card} ${theme.border}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t('profile.email')}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={t('registerInsole.enterEmail')}
            className={`w-full p-3 rounded-lg ${theme.card} ${theme.border}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t('profile.phone')}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={t('registerInsole.enterPhone')}
            className={`w-full p-3 rounded-lg ${theme.card} ${theme.border}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t('profile.fullName')}</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder={t('registerInsole.enterName')}
            className={`w-full p-3 rounded-lg ${theme.card} ${theme.border}`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('registerInsole.register')}
        </button>
      </form>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { t, language, setLanguage } = useTranslation();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'Moni Ray',
    email: 'moni.ray@example.com',
    phone: '+1234567890',
    location: 'New York, USA'
  });

  const theme = darkMode ? darkTheme : lightTheme;

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    window.location.href = "https://www.google.com";
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView darkMode={darkMode} theme={theme} />;
      case 'appointment':
        return <AppointmentView darkMode={darkMode} theme={theme} />;
      case 'notifications':
        return <NotificationsView darkMode={darkMode} theme={theme} />;
      case 'profile':
        return <ProfileView 
          darkMode={darkMode} 
          theme={theme} 
          userProfile={userProfile} 
          onUpdateProfile={handleUpdateProfile}
          onLanguageChange={handleLanguageChange}
          currentLanguage={language}
        />;
      case 'register-insole':
        return <RegisterInsoleView darkMode={darkMode} theme={theme} />;
      default:
        return <DashboardView darkMode={darkMode} theme={theme} />;
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col sm:flex-row ${theme.background} ${theme.text}`}>
      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${theme.card} p-6 rounded-lg max-w-sm w-full mx-4 shadow-xl`}>
            <h3 className="text-xl font-bold mb-4">{t('common.confirmLogout')}</h3>
            <p className={`${theme.textSecondary} mb-6`}>{t('common.logoutMessage')}</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className={`flex-1 py-2 rounded-lg ${theme.card} ${theme.cardHover} border ${theme.border}`}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                {t('common.logout')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <header className={`sm:hidden flex items-center justify-between p-4 ${theme.card}`}>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">a</span>
          <span className="text-2xl font-bold">appo</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2 rounded-lg ${theme.cardHover}`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`${theme.card} ${isMobileMenuOpen ? 'block' : 'hidden'} sm:block w-full sm:w-64 sm:fixed h-full p-6 flex flex-col z-40 border-r ${theme.border}`}>
        <div className="hidden sm:flex items-center gap-2 mb-8">
          <span className="text-3xl font-bold bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">a</span>
          <span className="text-2xl font-bold">appo</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: Heart, label: t('dashboard.title') },
            { id: 'appointment', icon: Calendar, label: t('appointments.title') },
            { id: 'notifications', icon: Bell, label: t('notifications.title') },
            { id: 'profile', icon: User, label: t('profile.title') },
            { id: 'register-insole', icon: Plus, label: t('registerInsole.title') }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? `${theme.primary} text-white` 
                  : `${theme.cardHover}`
              }`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>

        <div className={`pt-6 border-t ${theme.border}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-red-500 ${theme.cardHover}`}
          >
            <LogOut size={20} /> {t('common.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:ml-64 p-4 sm:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative w-44">
            <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={16} />
            <input
              type="text"
              placeholder={t('common.search')}
              className={`pl-8 pr-3 py-1.5 rounded-lg ${theme.card} w-full text-sm border ${theme.border}`}
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 rounded-lg ${theme.cardHover} transition-colors`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Moon size={18} className={darkMode ? 'hidden' : 'block'} />
              <Sun size={18} className={darkMode ? 'block' : 'hidden'} />
            </button>
            <button className={`p-1.5 rounded-lg ${theme.cardHover} relative`}>
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">6</span>
            </button>
            <div className="flex items-center gap-2 ml-2">
              <div className={`w-8 h-8 rounded-full ${theme.card} border ${theme.border} flex items-center justify-center`}>
                <User size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">{userProfile.fullName}</p>
                <p className={`text-xs ${theme.textSecondary}`}>{t('common.user')}</p>
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

// Wrap the app with TranslationProvider
export default function AppWithTranslation() {
  return (
    <TranslationProvider>
      <App />
    </TranslationProvider>
  );
}