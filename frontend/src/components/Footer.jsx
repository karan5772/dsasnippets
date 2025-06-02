const Footer = () => {
  return (
    <footer className="w-full mt-16 bottom-0 relative z-10">
      <div className="container mx-auto px-4">
        <hr className="border-0 border-gray-600 mb-8" />
        <div className="border-t border-white/10 pt-8 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © 2025 DSASNIPPETS.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Built to Revolutionize DSA & Problem Solving</span>
              <span>•</span>
              <span>Built with passion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
