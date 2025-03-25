import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon } from '@heroicons/react/24/outline';
import AnalyzeImageModal from '../components/containers/AnalyzeImageModal';
import { containerService } from '../api';

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

  const handleAnalysisComplete = (results) => {
    // Log the raw results
    console.log('Dashboard - Raw Analysis Results:', results);

    const transformedData = {
      stats: [
        { 
          title: 'Total Containers', 
          value: results.containerCount || '0',
          change: '+0',
          changeType: 'neutral'
        },
        { 
          title: 'Running Containers',
          value: results.runningContainers || '0',
          change: '+0',
          changeType: 'neutral'
        },
        { 
          title: 'Total Images',
          value: results.imageCount || '0',
          change: '+0',
          changeType: 'neutral'
        },
        { 
          title: 'Optimization Score',
          value: `${results.optimizationScore || 0}%`,
          change: '+0%',
          changeType: 'neutral'
        },
      ],
      layerAnalysis: results.layers.map(layer => ({
        name: layer.name,
        size: layer.size,
        ratio: layer.percentage,
      })),
      securityIssues: results.securityScan.vulnerabilities.map(vuln => ({
        severity: vuln.severity,
        count: vuln.count,
        color: vuln.severity === 'High' ? '#ef4444' : 
               vuln.severity === 'Medium' ? '#f97316' : '#eab308',
      })),
      resourceUsage: results.containerStats || mockData.resourceUsage,
    };

    // Log the transformed data
    console.log('Dashboard - Transformed Data:', {
      stats: transformedData.stats,
      layerAnalysis: transformedData.layerAnalysis,
      securityIssues: transformedData.securityIssues,
      resourceUsage: transformedData.resourceUsage
    });

    setAnalysisData(transformedData);
  };

  return (
    <div className="min-h-screen bg-black text-white w-screen overflow-x-hidden">
      {/* Hero Section with Enhanced Background */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-black w-screen min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative w-full">
          <header className="flex items-center justify-between mb-16 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-xl shadow-glow transform hover:scale-105 transition-all duration-300 relative group">
                <div className="absolute inset-0 bg-emerald-700 rounded-xl opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <svg className="h-8 w-8 text-white filter drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9">
                    <animate attributeName="stroke-dasharray" from="0 100" to="100 100" dur="1.5s" fill="freeze" />
                  </path>
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white">DockLens</h1>
                <p className="text-zinc-400 text-sm font-medium tracking-wide">Container Analytics</p>
              </div>
            </div>
            <a
              href="/dashboard"
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 rounded-lg font-medium transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white flex items-center group"
            >
              Dashboard
              <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </header>

          <div className={`max-w-7xl mx-auto ${animatedElements.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500">
                Visualize your Docker environment like never before
              </h2>
            </div>
            <p className="text-xl text-zinc-300 mb-8 max-w-3xl">
              DockLens is the best way to analyze, monitor, and optimize your Docker containers with powerful visualizations and intelligent insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <button
                onClick={() => setShowAnalyzeModal(true)}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg font-medium text-lg transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10">Connect to Docker</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <svg className="ml-2 h-5 w-5 relative z-10 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-zinc-400 max-w-2xl">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>All data is processed locally. We don't store any information about your containers.</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Features with Enhanced Design */}
      <div className="py-24 bg-black w-screen relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          <div className="animate-on-scroll opacity-0 text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500">Everything you need in one place</h3>
            <p className="text-zinc-400 max-w-3xl mx-auto text-lg">DockLens provides comprehensive visibility into your Docker environment with zero setup required.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="animate-on-scroll opacity-0 bg-black/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-800 group">
              <div className="bg-emerald-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-white">Security Analysis</h4>
              <p className="text-zinc-300 text-lg">Identify vulnerabilities and security risks in your Docker containers in real-time.</p>
            </div>
            
            <div className="animate-on-scroll opacity-0 bg-black/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-800 group">
              <div className="bg-emerald-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-white">Powerful Analytics</h4>
              <p className="text-zinc-300 text-lg">Get detailed insights into container performance and resource usage.</p>
            </div>
            
            <div className="animate-on-scroll opacity-0 bg-black/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-800 group">
              <div className="bg-emerald-900/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-white">Optimization</h4>
              <p className="text-zinc-300 text-lg">Smart recommendations to improve container performance and reduce resource usage.</p>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mb-8"></div>
              <h3 className="text-3xl font-bold mb-8 text-white">Key capabilities</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              <div className="flex items-start group">
                <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 text-lg">Zero setup required</span>
              </div>
              <div className="flex items-start group">
                <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 text-lg">Unlimited containers with no user-based licensing</span>
              </div>
              <div className="flex items-start group">
                <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 text-lg">Embed analytics into applications</span>
              </div>
              <div className="flex items-start group">
                <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 text-lg">Schedule dashboard reports</span>
              </div>
              <div className="flex items-start group">
                <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 text-lg">Generate data visualizations from natural language</span>
              </div>
              <div className="flex items-start group">
                <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-zinc-300 text-lg">Real-time monitoring and alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Section with Enhanced Design */}
      <div className="py-24 bg-black w-screen relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          <div className="animate-on-scroll opacity-0 text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500">Simple, transparent pricing</h3>
            <p className="text-zinc-400 max-w-3xl mx-auto text-lg">Choose the plan that's right for you, with no hidden fees.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="animate-on-scroll opacity-0 bg-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-800 transition-all duration-300 hover:shadow-green h-full group">
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold mb-2 text-white">Free</h4>
                    <p className="text-4xl font-bold text-white">$0</p>
                  </div>
                  <span className="px-4 py-2 bg-emerald-900/40 text-emerald-400 text-sm rounded-full">
                    Available Now
                  </span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start group/item">
                    <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-zinc-300 text-lg">Basic container analytics</span>
                  </li>
                  <li className="flex items-start group/item">
                    <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-zinc-300 text-lg">Container status monitoring</span>
                  </li>
                  <li className="flex items-start group/item">
                    <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-zinc-300 text-lg">Image information</span>
                  </li>
                </ul>
                <button
                  onClick={() => setShowAnalyzeModal(true)}
                  className="w-full py-4 text-center bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg font-medium transition-all duration-300 text-white mt-auto group relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="animate-on-scroll opacity-0 bg-gradient-to-b from-emerald-900/20 to-black/50 backdrop-blur-sm rounded-2xl border border-emerald-800/50 overflow-hidden transition-all duration-300 hover:shadow-green-lg h-full group">
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold mb-2 text-white">Premium</h4>
                    <p className="text-4xl font-bold text-white">$19<span className="text-lg font-normal text-zinc-400">/month</span></p>
                  </div>
                  <span className="px-4 py-2 bg-emerald-900/40 text-emerald-400 text-sm rounded-full">
                    Coming Soon
                  </span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start group/item">
                    <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-zinc-300 text-lg">Advanced security scanning</span>
                  </li>
                  <li className="flex items-start group/item">
                    <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-zinc-300 text-lg">Performance optimization</span>
                  </li>
                  <li className="flex items-start group/item">
                    <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-zinc-300 text-lg">AI-powered recommendations</span>
                  </li>
                  <li className="flex items-start group/item">
                    <CheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-zinc-300 text-lg">Custom report generation</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <form onSubmit={handleNotificationSignup} className="flex flex-col space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early access"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-white placeholder-zinc-500 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group ${
                        isSubmitting ? 'bg-zinc-700 text-zinc-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800'
                      }`}
                    >
                      <span className="relative z-10">{isSubmitting ? 'Submitting...' : 'Notify Me'}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </button>
                  </form>
                  {submitSuccess && (
                    <div className="mt-4 text-emerald-400 text-sm animate-fade-in">
                      Thank you! We'll notify you when Premium is available.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer CTA with Enhanced Design */}
      <div className="py-24 bg-black w-screen relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          <div className="animate-on-scroll opacity-0 max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500">Ready to optimize your Docker environment?</h3>
            <button
              onClick={() => setShowAnalyzeModal(true)}
              className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg font-medium text-lg transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white relative overflow-hidden"
            >
              <span className="relative z-10">Connect to Docker</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
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
      <style>{`
        /* Shadow effects */
        .shadow-green {
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
        }
        .shadow-green-lg {
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        }
        
        /* Animation classes */
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animate-gradient {
          animation: gradient 15s linear infinite;
          background-size: 400% 400%;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.05);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Fix for horizontal scroll and full width */
        body {
          overflow-x: hidden;
          max-width: 100vw;
        }
      `}</style>
    </div>
  );
} 