const Footer = () => {
  return (
    <footer className="bg-white/5 text-gray-300 text-center py-3 border-t border-white/10 mt-10 rounded-t-xl backdrop-blur-md">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Product AuthFlow. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
