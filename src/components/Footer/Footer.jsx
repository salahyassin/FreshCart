import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center text-center md:text-left gap-4">
          <div className="flex space-x-4">
            {[
              { href: 'https://x.com/salahyassin22', icon: 'fab fa-twitter', color: 'text-blue-400' },
              { href: 'https://www.facebook.com/salah.yassin.5209', icon: 'fab fa-facebook', color: 'text-blue-600' },
              { href: 'https://github.com/salahyassin', icon: 'fab fa-github', color: 'text-gray-800' },
              { href: 'https://www.linkedin.com/in/salah-yassin/', icon: 'fab fa-linkedin', color: 'text-blue-500' },
            ].map(({ href, icon, color }, index) => (
              <a 
                key={index}
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`bg-white ${color} hover:opacity-80 shadow-md h-8 w-8 flex items-center justify-center rounded-full transition`}
                aria-label={icon}
              >
                <i className={`${icon} text-sm`}></i>
              </a>
            ))}
          </div>
          <div className="text-sm text-gray-700 space-x-6 hidden md:flex">
            <a href="#" className="hover:text-blue-500 transition">About</a>
            <a href="#" className="hover:text-blue-500 transition">Services</a>
            <a href="#" className="hover:text-blue-500 transition">Contact</a>
            <a href="#" className="hover:text-blue-500 transition">Blog</a>
          </div>
          <div className="text-sm text-gray-600">
            <p>✉️salahyassin142004@gmail.com</p>
            <p>📞 +20 1070805579</p>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 border-t border-gray-300 pt-3 mt-3">
          <p>Copyright © {new Date().getFullYear()} Salah Yassin. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ in Elseada</p>
        </div>
      </div>
    </footer>
  );
}
