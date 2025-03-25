export const landingStyles = `
  /* Shadow effects */
  .shadow-green {
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.1);
  }
  .shadow-green-lg {
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
  }
  .shadow-glow {
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
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
`; 