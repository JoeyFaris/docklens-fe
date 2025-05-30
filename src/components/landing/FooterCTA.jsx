export default function FooterCTA({ onConnectClick }) {
  return (
    <div className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 w-screen relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">

        <div className="animate-on-scroll opacity-0 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to optimize your Docker environment?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Connect now and start managing your containers better
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onConnectClick}
              className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl font-bold text-lg transition-all duration-300 text-white flex items-center justify-center group border border-green-400/50 hover:border-green-400"
            >
              Connect to Docker
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <footer className="mt-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">ContainerOps</h4>
              <p className="text-sm text-gray-300 mb-4">Making container management simple and efficient for developers and teams.</p>
              <div className="flex space-x-4">
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} DockLens. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}