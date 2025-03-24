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
  
  // Fetch container data if permission is granted
  const { data: containerResponse = { data: [] } } = useQuery({
    queryKey: ['landingContainers'],
    queryFn: () => containerService.getContainers(),
    enabled: hasPermission, // Only start fetching after permission is granted
  });
  
  // Extract containers from the response data property
  const containers = containerResponse.data || [];

  // Animation on scroll effect
  useEffect(() => {
    setAnimatedElements({
      hero: true,
      features: true,
      pricing: true
    });
    
    // Add intersection observer for scroll animations
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
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmail('');
      
      // Reset success message after 3 seconds
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
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-black w-screen">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUgMmg0djFoLTR2LTF6bTAgMmgxdjJoLTF2LTJ6bS03LTNoNHYxaC00di0xem0wIDJoMXY0aC0xdi00em0tNy0xaDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptMzYtMTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em01LTJoLTR2MWg0di0xem0wIDJoLTF2NGgxdi00em0tNy0xaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bS0zNi0yaC00djFoNHYtMXptMCAyaC0xdjRoMXYtNHptLTUtMmgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTctMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6bTUtMWgtNHYxaDR2LTF6bTAgMmgtMXY0aDF2LTR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] mix-blend-soft-light opacity-30"></div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative">
          <header className="flex items-center justify-between mb-16 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-xl shadow-glow transform hover:scale-105 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-emerald-700 rounded-xl opacity-20 animate-pulse"></div>
                <svg className="h-8 w-8 text-white filter drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9">
                    <animate attributeName="stroke-dasharray" from="0 100" to="100 100" dur="1.5s" fill="freeze" />
                  </path>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">DockLens</h1>
                <p className="text-zinc-400 text-sm font-medium tracking-wide">Container Analytics</p>
              </div>
            </div>
            <a
              href="/dashboard"
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 rounded-lg font-medium transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white flex items-center"
            >
              Dashboard
              <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </header>

          <div className={`max-w-7xl mx-auto ${animatedElements.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white max-w-4xl">
              Visualize your Docker environment like never before
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-3xl">
              DockLens is the best way to analyze, monitor, and optimize your Docker containers with powerful visualizations and intelligent insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <button
                onClick={() => setShowAnalyzeModal(true)}
                className="px-8 py-4 bg-emerald-800 hover:bg-emerald-900 rounded-lg font-medium text-lg transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white flex items-center justify-center"
              >
                Connect to Docker
                <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
      
      {/* Key Features */}
      <div className="py-16 bg-zinc-900 w-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="animate-on-scroll opacity-0 text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Everything you need in one place</h3>
            <p className="text-zinc-400 max-w-3xl mx-auto">DockLens provides comprehensive visibility into your Docker environment with zero setup required.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
            <div className="animate-on-scroll opacity-0 bg-black border border-zinc-800 rounded-xl p-6 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-800">
              <div className="bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">Security Analysis</h4>
              <p className="text-zinc-300">Identify vulnerabilities and security risks in your Docker containers in real-time.</p>
            </div>
            
            <div className="animate-on-scroll opacity-0 bg-black border border-zinc-800 rounded-xl p-6 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-800">
              <div className="bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">Powerful Analytics</h4>
              <p className="text-zinc-300">Get detailed insights into container performance and resource usage.</p>
            </div>
            
            <div className="animate-on-scroll opacity-0 bg-black border border-zinc-800 rounded-xl p-6 shadow-md hover:shadow-green transition-all duration-300 hover:border-emerald-800">
              <div className="bg-emerald-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">Optimization</h4>
              <p className="text-zinc-300">Smart recommendations to improve container performance and reduce resource usage.</p>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="h-0.5 w-16 bg-emerald-800 mb-6"></div>
              <h3 className="text-2xl font-bold mb-6 text-white">Key capabilities</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300">Zero setup required</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300">Unlimited containers with no user-based licensing</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300">Embed analytics into applications</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300">Schedule dashboard reports</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300">Generate data visualizations from natural language</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300">Real-time monitoring and alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="py-16 bg-zinc-900 w-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="animate-on-scroll opacity-0 text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Simple, transparent pricing</h3>
            <p className="text-zinc-400 max-w-3xl mx-auto">Choose the plan that's right for you, with no hidden fees.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="animate-on-scroll opacity-0 bg-black rounded-2xl overflow-hidden border border-zinc-800 hover:border-emerald-800 transition-all duration-300 hover:shadow-green h-full">
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white">Free</h4>
                    <p className="text-3xl font-bold text-white">$0</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-900/40 text-emerald-400 text-sm rounded-full">
                    Available Now
                  </span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Basic container analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Container status monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Image information</span>
                  </li>
                </ul>
                <button
                  onClick={() => setShowAnalyzeModal(true)}
                  className="w-full py-3 text-center bg-emerald-800 hover:bg-emerald-900 rounded-lg font-medium transition-colors text-white mt-auto"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="animate-on-scroll opacity-0 bg-gradient-to-b from-emerald-900/20 to-black rounded-2xl border border-emerald-800/50 overflow-hidden transition-all duration-300 hover:shadow-green-lg h-full">
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white">Premium</h4>
                    <p className="text-3xl font-bold text-white">$19<span className="text-lg font-normal text-zinc-400">/month</span></p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-900/40 text-emerald-400 text-sm rounded-full">
                    Coming Soon
                  </span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Advanced security scanning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Performance optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">AI-powered recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Custom report generation</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <form onSubmit={handleNotificationSignup} className="flex flex-col space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early access"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-white placeholder-zinc-500"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg font-medium ${
                        isSubmitting ? 'bg-zinc-700 text-zinc-400' : 'bg-emerald-800 text-white hover:bg-emerald-900'
                      } transition-colors`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Notify Me'}
                    </button>
                  </form>
                  {submitSuccess && (
                    <div className="mt-3 text-emerald-400 text-sm">
                      Thank you! We'll notify you when Premium is available.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="py-16 bg-gradient-to-b from-zinc-900 to-black w-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <div className="animate-on-scroll opacity-0 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Ready to optimize your Docker environment?</h3>
            <button
              onClick={() => setShowAnalyzeModal(true)}
              className="px-8 py-4 bg-emerald-800 hover:bg-emerald-900 rounded-lg font-medium text-lg transition-all duration-300 shadow-green hover:shadow-green-lg transform hover:translate-y-[-2px] text-white"
            >
              Connect to Docker
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
      
      {/* CSS for animations and fixes */}
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

        /* Fix for horizontal scroll and full width */
        body {
          overflow-x: hidden;
          max-width: 100vw;
        }
      `}</style>
    </div>
  );
} 