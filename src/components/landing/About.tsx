import React from 'react';
import { Shield, Clock, Users, Award } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import PopIn from '../animations/PopIn';

const About: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <PopIn>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Sobre MedicalOptional
              </h2>
            </PopIn>
            
            <FadeIn direction="up" delay={0.2}>
              <p className="mt-4 text-lg text-gray-500">
                Con más de 15 años de experiencia en el sector de la salud, MedicalOptional se ha consolidado como un centro médico de referencia, ofreciendo servicios de alta calidad a miles de pacientes.
              </p>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3}>
              <p className="mt-4 text-lg text-gray-500">
                Nuestro compromiso es brindar atención médica personalizada, utilizando tecnología de vanguardia y contando con un equipo de profesionales altamente calificados.
              </p>
            </FadeIn>
            
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {[
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Calidad garantizada",
                  description: "Todos nuestros servicios cumplen con los más altos estándares de calidad y seguridad."
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: "Atención oportuna",
                  description: "Valoramos su tiempo y nos esforzamos por brindar atención rápida y eficiente."
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Equipo profesional",
                  description: "Contamos con médicos especialistas y personal capacitado para brindar la mejor atención."
                },
                {
                  icon: <Award className="h-6 w-6" />,
                  title: "Reconocimiento",
                  description: "Nuestro centro médico ha sido reconocido por su excelencia en la atención al paciente."
                }
              ].map((feature, index) => (
                <FadeIn key={index} direction="up" delay={0.1 * (index + 4)}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          
          <FadeIn direction="left" delay={0.4} className="mt-10 lg:mt-0 relative">
            <div className="relative h-full overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-cover"
                src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                alt="Equipo médico en consulta"
              />
              <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-10"></div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-6 px-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <PopIn delay={0.6}>
                    <div>
                      <p className="text-3xl font-bold text-white">15+</p>
                      <p className="text-sm text-white opacity-80">Años de experiencia</p>
                    </div>
                  </PopIn>
                  <PopIn delay={0.7}>
                    <div>
                      <p className="text-3xl font-bold text-white">50+</p>
                      <p className="text-sm text-white opacity-80">Especialistas</p>
                    </div>
                  </PopIn>
                  <PopIn delay={0.8}>
                    <div>
                      <p className="text-3xl font-bold text-white">10k+</p>
                      <p className="text-sm text-white opacity-80">Pacientes atendidos</p>
                    </div>
                  </PopIn>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;