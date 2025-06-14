import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Check, 
  X, 
  Bell, 
  MessageSquare, 
  Settings, 
  Users,
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import Button from '../common/Button';

interface AppointmentRequestProps {
  id: string;
  patientName: string;
  patientId: string;
  serviceType: string;
  requestDate: string;
  status: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  notes?: string;
  fecha?: string;
  hora?: string;
  lugar?: string;
  onAccept: (id: string, scheduleData: any) => void;
  onReject: (id: string) => void;
}

const AppointmentRequest: React.FC<AppointmentRequestProps> = ({
  id,
  patientName,
  serviceType,
  requestDate,
  status,
  notes,
  fecha,
  hora,
  lugar,
  onAccept,
  onReject
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentLocation, setAppointmentLocation] = useState('');
  
  const handleAccept = () => {
    setShowScheduleForm(true);
  };
  
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scheduleData = {
      fecha: appointmentDate,
      hora: appointmentTime,
      lugar: appointmentLocation,
      estado: 'confirmada'
    };
    onAccept(id, scheduleData);
    setShowScheduleForm(false);
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'pendiente': return 'border-yellow-500';
      case 'confirmada': return 'border-green-500';
      case 'cancelada': return 'border-red-500';
      case 'completada': return 'border-blue-500';
      default: return 'border-gray-500';
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 ${getStatusColor()}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{patientName}</h3>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <FileText className="h-4 w-4 mr-1" />
            <span>{serviceType}</span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Solicitado el: {requestDate}</span>
          </div>
          
          {fecha && (
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Programado: {fecha} a las {hora} en {lugar}</span>
            </div>
          )}
        </div>
        
        <div className="flex">
          {status === 'pendiente' && (
            <>
              <Button
                variant="success"
                size="sm"
                leftIcon={<Check className="h-4 w-4" />}
                onClick={handleAccept}
                className="mr-2"
              >
                Aceptar
              </Button>
              <Button
                variant="danger"
                size="sm"
                leftIcon={<X className="h-4 w-4" />}
                onClick={() => onReject(id)}
              >
                Rechazar
              </Button>
            </>
          )}
          
          {status !== 'pendiente' && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === 'confirmada' ? 'bg-green-100 text-green-800' : 
              status === 'cancelada' ? 'bg-red-100 text-red-800' :
              status === 'completada' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {status === 'confirmada' ? 'Confirmada' : 
               status === 'cancelada' ? 'Cancelada' :
               status === 'completada' ? 'Completada' : 'Pendiente'}
            </span>
          )}
        </div>
      </div>
      
      {(notes || isExpanded) && (
        <div className={`mt-4 ${isExpanded ? 'block' : 'hidden'}`}>
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Notas del paciente:</h4>
            <p className="text-gray-600 text-sm">{notes || 'No hay notas disponibles.'}</p>
          </div>
        </div>
      )}
      
      {notes && (
        <button
          className="mt-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      )}
      
      {showScheduleForm && (
        <div className="mt-4 bg-blue-50 p-4 rounded">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Programar cita:</h4>
          <form onSubmit={handleScheduleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="date" className="block text-xs font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  id="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="time" className="block text-xs font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <input
                  type="time"
                  id="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-xs font-medium text-gray-700 mb-1">
                  Lugar
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Ej: Consultorio 203"
                  value={appointmentLocation}
                  onChange={(e) => setAppointmentLocation(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowScheduleForm(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="success"
                size="sm"
              >
                Confirmar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('solicitudes');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.getAppointments();
      if (response.success) {
        setAppointments(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptAppointment = async (id: string, scheduleData: any) => {
    try {
      await api.updateAppointment(id, { 
        ...scheduleData, 
        medicoId: user?.id 
      });
      fetchAppointments(); // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Error al aceptar la cita');
    }
  };

  const handleRejectAppointment = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea rechazar esta cita?')) {
      try {
        await api.updateAppointment(id, { estado: 'cancelada' });
        fetchAppointments(); // Refresh the list
      } catch (err: any) {
        setError(err.message || 'Error al rechazar la cita');
      }
    }
  };

  const pendingAppointments = appointments.filter(apt => apt.estado === 'pendiente');
  const confirmedAppointments = appointments.filter(apt => 
    apt.estado === 'confirmada' && apt.medicoId === user?.id
  );
  
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Bienvenido, Dr. {user?.nombre}</h1>
                <p className="mt-1 text-blue-100">Panel de médico</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-2">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                  leftIcon={<Bell className="h-5 w-5" />}
                  onClick={fetchAppointments}
                >
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {pendingAppointments.length}
                  </span>
                  Actualizar
                </Button>
                <Button
                  variant="success"
                  leftIcon={<Calendar className="h-5 w-5" />}
                >
                  Mi Agenda
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('solicitudes')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'solicitudes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Solicitudes
                  <span className="ml-2 bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {pendingAppointments.length}
                  </span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('agenda')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'agenda'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Mi Agenda
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('pacientes')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'pacientes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Pacientes
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('perfil')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'perfil'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Mi Perfil
                </div>
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'solicitudes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Solicitudes de citas</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={fetchAppointments}>
                      Actualizar
                    </Button>
                  </div>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Cargando solicitudes...</p>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((request) => (
                      <AppointmentRequest 
                        key={request._id} 
                        id={request._id}
                        patientName={request.pacienteId?.nombre ? `${request.pacienteId.nombre} ${request.pacienteId.apellido}` : 'Paciente'}
                        patientId={request.pacienteId?._id || request.pacienteId}
                        serviceType={request.tipo}
                        requestDate={new Date(request.createdAt).toLocaleDateString()}
                        status={request.estado}
                        notes={request.notas}
                        fecha={request.fecha ? new Date(request.fecha).toLocaleDateString() : undefined}
                        hora={request.hora}
                        lugar={request.lugar}
                        onAccept={handleAcceptAppointment}
                        onReject={handleRejectAppointment}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No hay solicitudes</h3>
                    <p className="mt-1 text-gray-500">Las nuevas solicitudes aparecerán aquí.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'agenda' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Mi Agenda</h2>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Próximas citas confirmadas</h3>
                  
                  {confirmedAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {confirmedAppointments.map((appointment) => (
                        <div key={appointment._id} className="bg-white p-4 rounded border border-gray-200">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {appointment.pacienteId?.nombre ? 
                                  `${appointment.pacienteId.nombre} ${appointment.pacienteId.apellido}` : 
                                  'Paciente'
                                }
                              </h4>
                              <p className="text-sm text-gray-600">{appointment.tipo}</p>
                            </div>
                            <div className="text-right">
                              {appointment.fecha && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(appointment.fecha).toLocaleDateString()}
                                </div>
                              )}
                              {appointment.hora && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {appointment.hora}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <span className="text-sm text-gray-600">{appointment.lugar}</span>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Ver detalles
                              </Button>
                              <a href={`https://wa.me/+573008973665?text=Hola%20${appointment.pacienteId?.nombre || 'paciente'},%20soy%20el%20Dr.%20${user?.nombre}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" leftIcon={<MessageSquare className="h-4 w-4" />}>
                                  Contactar
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No hay citas confirmadas.</p>
                  )}
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">Calendario</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-center text-gray-600 py-20">
                      Aquí se mostraría el calendario completo con todas las citas programadas.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'pacientes' && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Lista de pacientes</h3>
                <p className="mt-1 text-gray-500">Aquí podrá ver y gestionar sus pacientes.</p>
                <p className="text-gray-500">Funcionalidad en desarrollo.</p>
              </div>
            )}
            
            {activeTab === 'perfil' && (
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mi Perfil</h3>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nombre</p>
                      <p className="mt-1 text-gray-900">{user?.nombre}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Apellido</p>
                      <p className="mt-1 text-gray-900">{user?.apellido}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Cédula</p>
                      <p className="mt-1 text-gray-900">{user?.cedula}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-gray-900">{user?.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Teléfono</p>
                      <p className="mt-1 text-gray-900">{user?.telefono}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Especialidad</p>
                      <p className="mt-1 text-gray-900">{user?.especialidad || 'Medicina General'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <Button variant="outline">
                      Editar perfil
                    </Button>
                    <Button variant="outline">
                      Cambiar contraseña
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Horario de disponibilidad</h4>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Lunes</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Martes</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Miércoles</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Jueves</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Viernes</span>
                        <span>9:00 AM - 3:00 PM</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm">
                        Editar horario
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;