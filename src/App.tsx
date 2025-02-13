import React, { useState } from 'react';
import { 
  Heart, 
  Bell, 
  Calendar, 
  Wifi, 
  Bluetooth,
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
  Video
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';
import 'react-day-picker/dist/style.css';

function DashboardView({ darkMode }: { darkMode: boolean }) {
  return (
    <>
      {/* Connection Status */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className={`flex items-center gap-2 px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} hover:bg-blue-600 hover:text-white transition-colors`}>
          <Wifi size={20} /> WiFi
        </button>
        <button className={`flex items-center gap-2 px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} hover:bg-blue-600 hover:text-white transition-colors`}>
          <Bluetooth size={20} /> Bluetooth
        </button>
      </div>

      {/* Pressure Monitoring */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Foot Pressures</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {['Heel', 'Middle', 'Toe'].map((zone, index) => (
            <div key={zone} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-4xl font-bold ${
                  index === 0 ? 'text-blue-500' : 
                  index === 1 ? 'text-yellow-500' : 
                  'text-green-500'
                }`}>
                  {index === 0 ? '117' : index === 1 ? '85' : '83'}
                </span>
                <span className="text-gray-400">mmHg</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-gray-700">
                <div 
                  className={`h-full ${
                    index === 0 ? 'bg-blue-500' : 
                    index === 1 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${index === 0 ? 58 : index === 1 ? 42 : 41}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>0</span>
                <span>200 mmHg</span>
              </div>
              <p className="mt-2 font-medium">{zone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Health Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Health Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
            <div className="flex items-center gap-4">
              <Heart className="text-red-500" size={24} />
              <div>
                <p className="text-3xl font-bold">91 <span className="text-sm text-gray-400">bpm</span></p>
                <p className="text-gray-400">Heart Rate</p>
              </div>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
            <div className="flex items-center gap-4">
              <div className="text-blue-500">🌡️</div>
              <div>
                <p className="text-3xl font-bold">36.2 <span className="text-sm text-gray-400">°C</span></p>
                <p className="text-gray-400">Temperature</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ulcer Monitoring */}
      <section>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
          <h2 className="text-2xl font-bold mb-2">Predictive Foot Ulcer Monitoring</h2>
          <p className="text-gray-400 text-sm">URS updated every 2 hours</p>
        </div>
      </section>
    </>
  );
}

function AppointmentView({ darkMode }: { darkMode: boolean }) {
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
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto justify-center"
        >
          <Plus size={20} /> Book Appointment
        </button>
      </div>

      {/* Appointment List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}
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
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </div>
                {appointment.status === 'pending' && (
                  <button
                    onClick={() => handleApproveAppointment(appointment.id)}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Approve
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
                    Join Meeting
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
              <div className={`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl`}>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6"
                >
                  Book Appointment
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  {/* Calendar */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Date</label>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: new Date() }}
                        className={darkMode ? 'dark' : ''}
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm rounded-lg ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white'
                              : darkMode
                              ? 'bg-gray-700 hover:bg-gray-600'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Doctor Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Healthcare Professional</label>
                    <div className="space-y-2">
                      {doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => setSelectedDoctor(doctor.name)}
                          className={`w-full p-3 text-left rounded-lg ${
                            selectedDoctor === doctor.name
                              ? 'bg-blue-600 text-white'
                              : darkMode
                              ? 'bg-gray-700 hover:bg-gray-600'
                              : 'bg-gray-100 hover:bg-gray-200'
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
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime || !selectedDoctor}
                    className={`px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Book Appointment
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

function NotificationsView({ darkMode }: { darkMode: boolean }) {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <div className="space-y-4">
        {[
          { icon: AlertTriangle, color: 'text-red-500', title: 'High Pressure Alert', message: 'Unusual pressure detected in heel area', time: '5 min ago' },
          { icon: Info, color: 'text-blue-500', title: 'Appointment Reminder', message: 'Checkup with Dr. Smith tomorrow at 9 AM', time: '1 hour ago' },
          { icon: Heart, color: 'text-green-500', title: 'Health Update', message: 'Weekly health report is available', time: '2 hours ago' }
        ].map((notification, index) => (
          <div key={index} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg flex flex-col sm:flex-row gap-4`}>
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

function ProfileView({ darkMode }: { darkMode: boolean }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [language, setLanguage] = useState('en');
  const [connectedDevices] = useState([
    { id: 1, name: 'Smart Insole #1', type: 'insole', status: 'connected', lastSync: '2 mins ago' },
    { id: 2, name: 'Smart Insole #2', type: 'insole', status: 'disconnected', lastSync: '1 day ago' }
  ]);

  const handleProfileUpdate = () => {
    setSuccessMessage('Profile updated successfully!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handlePasswordReset = () => {
    setSuccessMessage('Password reset link sent to your email!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    setSuccessMessage(twoFactorEnabled ? '2FA disabled successfully!' : '2FA enabled successfully!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setSuccessMessage('Language changed successfully!');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <CheckCircle2 size={20} />
          {successMessage}
        </div>
      )}

      {/* Profile Information */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="Moni Ray"
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="moni.ray@example.com"
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+1234567890"
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                defaultValue="New York, USA"
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              />
            </div>
          </div>
          <button
            onClick={handleProfileUpdate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Key className="text-blue-500" size={24} />
              <div>
                <h3 className="font-medium">Password Reset</h3>
                <p className="text-sm text-gray-400">Change your account password</p>
              </div>
            </div>
            <button
              onClick={handlePasswordReset}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Reset Password
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-500" size={24} />
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400">Add an extra layer of security</p>
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
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">Language Settings</h2>
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
                language === lang.code
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Connected Devices */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6">Connected Devices</h2>
        <div className="space-y-4">
          {connectedDevices.map((device) => (
            <div
              key={device.id}
              className={`${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              } p-4 rounded-lg flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${device.status === 'connected' ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                  <Smartphone className={device.status === 'connected' ? 'text-green-500' : 'text-gray-500'} size={24} />
                </div>
                <div>
                  <h3 className="font-medium">{device.name}</h3>
                  <p className="text-sm text-gray-400">Last synced: {device.lastSync}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  device.status === 'connected'
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-gray-500/20 text-gray-500'
                }`}
              >
                {device.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegisterInsoleView({ darkMode }: { darkMode: boolean }) {
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
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg max-w-2xl mx-auto`}>
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <CheckCircle2 size={20} />
          Insole registered successfully!
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Register New Insole</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Serial Number (SN)</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            placeholder="Enter insole serial number"
            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register Insole
        </button>
      </form>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView darkMode={darkMode} />;
      case 'appointment':
        return <AppointmentView darkMode={darkMode} />;
      case 'notifications':
        return <NotificationsView darkMode={darkMode} />;
      case 'profile':
        return <ProfileView darkMode={darkMode} />;
      case 'register-insole':
        return <RegisterInsoleView darkMode={darkMode} />;
      default:
        return <DashboardView darkMode={darkMode} />;
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  return (
    <div className={`min-h-screen flex flex-col sm:flex-row ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg max-w-sm w-full mx-4`}>
            <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className={`flex-1 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle logout logic here
                  setShowLogoutConfirm(false);
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <header className="sm:hidden flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">a</span>
          <span className="text-2xl font-bold">appo</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-700"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        ${darkMode ? 'bg-gray-800' : 'bg-white'}
        ${isMobileMenuOpen ? 'block' : 'hidden'}
        sm:block
        w-full sm:w-64 
        sm:fixed 
        h-full 
        p-6 
        flex 
        flex-col
        z-40
      `}>
        <div className="hidden sm:flex items-center gap-2 mb-8">
          <span className="text-3xl font-bold bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">a</span>
          <span className="text-2xl font-bold">appo</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => handleTabClick('dashboard')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <Heart size={20} /> Dashboard
          </button>
          <button 
            onClick={() => handleTabClick('appointment')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeTab === 'appointment' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <Calendar size={20} /> Appointment
          </button>
          <button 
            onClick={() => handleTabClick('notifications')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <Bell size={20} /> Notifications
          </button>
          <button 
            onClick={() => handleTabClick('profile')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <User size={20} /> Profile
          </button>
          <button 
            onClick={() => handleTabClick('register-insole')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeTab === 'register-insole' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
          >
            <Plus size={20} /> Register Insole
          </button>
        </nav>

        <div className="pt-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-500 hover:bg-gray-700"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:ml-64 p-4 sm:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative w-44">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search"
              className={`pl-8 pr-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} w-full text-sm`}
            />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 rounded-lg hover:bg-gray-700">
              <Moon size={18} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-gray-700 relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full text-xs flex items-center justify-center">6</span>
            </button>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <User size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Moni Ray</p>
                <p className="text-xs text-gray-400">User</p>
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;