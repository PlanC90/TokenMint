import React from 'react';
import { Coins, Zap, BarChart3 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Create Your Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Token</span> on MemeX
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Launch your custom token on the MemeX blockchain with the lowest fees. Get your token delivered within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#create"
                className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 text-center"
              >
                Create Token
              </a>
              <a
                href="#features"
                className="bg-white text-blue-600 border border-blue-600 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-50 transition duration-300 ease-in-out text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Coins className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">20,000,000 MEMEX</h3>
                  <p className="text-gray-500 text-sm">Token Creation Fee</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Zap className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">48 Hours</h3>
                  <p className="text-gray-500 text-sm">Delivery Time</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <BarChart3 className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Full Control</h3>
                  <p className="text-gray-500 text-sm">Your Token, Your Rules</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-blue-800 font-bold py-2 px-4 rounded-full shadow-lg transform rotate-12">
              Lowest Fee!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
