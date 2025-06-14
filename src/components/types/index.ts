export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  schedule: {
    [key: string]: string[]; // day: ['09:00', '10:00', ...]
  };
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  insuranceNumber?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  medicoId: string; // usando medicoId como en el error original
  fecha: string; // usando fecha como en el error original
  hora: string; // usando hora como en el error original
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface AppointmentFormData {
  patientId: string;
  medicoId: string;
  fecha: string;
  hora: string;
  reason: string;
}