import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { detectDevice, walletUrls } from '../utils/deviceDetection';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onTermsClick }) => {
  const deviceType = detectDevice();
  const walletDownloadUrl = walletUrls[deviceType];

  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-6">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">MemeX</h3>
          <p className="text-sm">
            Simplifying token creation on the MemeX blockchain.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2">
              <a href="#create" className="hover:text-white transition duration-200">Create Token</a>
            </li>
            <li className="mb-2">
              <a href="#features" className="hover:text-white transition duration-200">Features</a>
            </li>
            <li className="mb-2">
              <a href="#faq" className="hover:text-white transition duration-200">FAQ</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
          <ul>
            <li className="mb-2">
              <button onClick={onPrivacyClick} className="hover:text-white transition duration-200 focus:outline-none">Privacy Policy</button>
            </li>
            <li className="mb-2">
              <button onClick={onTermsClick} className="hover:text-white transition duration-200 focus:outline-none">Terms of Service</button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="hover:text-white transition duration-200"><Facebook size={24} /></a>
            <a href="#" className="hover:text-white transition duration-200"><Twitter size={24} /></a>
            <a href="#" className="hover:text-white transition duration-200"><Linkedin size={24} /></a>
            <a href="#" className="hover:text-white transition duration-200"><Instagram size={24} /></a>
          </div>
          <a
            href={walletDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out"
          >
            Download OmniXEP Wallet
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MemeX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
