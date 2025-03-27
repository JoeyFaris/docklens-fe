export const landingStyles = `
  /* Shadow effects */
  .shadow-green {
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15), 0 2px 8px rgba(16, 185, 129, 0.1);
    border: 2px solid rgba(16, 185, 129, 0.2);
  }
  .shadow-green-lg {
    box-shadow: 0 15px 35px rgba(16, 185, 129, 0.25), 0 5px 15px rgba(16, 185, 129, 0.15);
    border: 3px solid rgba(16, 185, 129, 0.3);
  }
  .shadow-glow {
    box-shadow: 0 0 25px rgba(16, 185, 129, 0.4), 0 0 8px rgba(16, 185, 129, 0.2);
    border: 2px solid rgba(16, 185, 129, 0.3);
  }

  .shadow-prominent {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
    border: 2px solid rgba(0, 0, 0, 0.08);
  }
  
  .shadow-prominent-hover:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
  
  /* Animation classes */
  .animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float 6s ease-in-out infinite;
    animation-delay: 3s;
  }
  
  .animate-gradient {
    animation: gradient 12s linear infinite;
    background-size: 400% 400%;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
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
      transform: translateY(-40px) scale(1.05);
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

  /* Terminal styles */
  .terminal-window {
    background: #1E1E1E;
    border: 3px solid #2D2D2D;
    border-radius: 12px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .terminal-text {
    color: #E0E0E0;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }

  .terminal-prompt {
    color: #4ADE80;
    text-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
  }
`; 