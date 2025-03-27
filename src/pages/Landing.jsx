import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import emailjs from '@emailjs/browser';
import AnalyzeImageModal from '../components/containers/AnalyzeImageModal';
import { containerService } from '../api';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing';
import FooterCTA from '../components/landing/FooterCTA';
import Header from '../components/landing/Header';
import { landingStyles } from '../components/landing/styles';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function Landing() {
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [animatedElements, setAnimatedElements] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Fetch container data if permission is granted
  const { data: containerResponse = { data: [] } } = useQuery({
    queryKey: ['landingContainers'],
    queryFn: () => containerService.getContainers(),
    enabled: hasPermission,
  });
  
  const containers = containerResponse.data || [];

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation on scroll effect
  useEffect(() => {
    setAnimatedElements({
      hero: true,
      features: true,
      pricing: true
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handlePermissionGranted = () => {
    setHasPermission(true);
  };
  
  const handleNotificationSignup = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await emailjs.send(
        serviceId, // Your Gmail service ID
        templateId, // You'll need to create a template and add its ID here
        {
          to_email: 'joeyfaris12@gmail.com',
          from_email: email,
        }
      );

      setSubmitSuccess(true);
      setEmail('');
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitError('Failed to send email. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 w-screen overflow-x-hidden">
      <Header />
      <div className="pt-16">
        <Hero onConnectClick={() => setShowAnalyzeModal(true)} animatedElements={animatedElements} />
        <Features />
        <Pricing 
          onConnectClick={() => setShowAnalyzeModal(true)}
          email={email}
          setEmail={setEmail}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          submitError={submitError}
          handleNotificationSignup={handleNotificationSignup}
        />
        <FooterCTA onConnectClick={() => setShowAnalyzeModal(true)} />
      </div>

      {/* Modal */}
      <AnalyzeImageModal
        isOpen={showAnalyzeModal}
        onClose={() => setShowAnalyzeModal(false)}
        onAnalysisComplete={(results) => {
          console.log('Analysis Results:', results);
          window.location.href = '/dashboard';
        }}
        onPermissionGranted={handlePermissionGranted}
      />
      
      {/* Enhanced CSS for animations and effects */}
      <style>{landingStyles}</style>
    </div>
  );
} 