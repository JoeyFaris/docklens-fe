import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import AnalyzeImageModal from '../components/containers/AnalyzeImageModal';
import { containerService } from '../api';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing';
import FooterCTA from '../components/landing/FooterCTA';
import { landingStyles } from '../components/landing/styles';

export default function Landing() {
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
  
  const handleNotificationSignup = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmail('');
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 w-screen overflow-x-hidden">
      <Hero onConnectClick={() => setShowAnalyzeModal(true)} animatedElements={animatedElements} />
      <Features />
      <Pricing 
        onConnectClick={() => setShowAnalyzeModal(true)}
        email={email}
        setEmail={setEmail}
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        handleNotificationSignup={handleNotificationSignup}
      />
      <FooterCTA onConnectClick={() => setShowAnalyzeModal(true)} />

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