import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      {/* Banner */}
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8 flex items-center justify-center">
        <p className="text-blue-700 text-center">
          The transfer of the token you will create between wallets is only <b>0.000000188 USD</b> according to today's XEP rate.
        </p>
      </div>

      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Create Your Own Token?</h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-12">
          Creating your own token has never been easier. With MemeX, you can launch your token on the Electra Protocol blockchain in minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Token Creation</h3>
            <p className="text-gray-600">
              Create your token in a few simple steps. No coding required.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Low Transaction Fees</h3>
            <p className="text-gray-600">
              Enjoy low transaction fees on the Electra Protocol blockchain.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure and Decentralized</h3>
            <p className="text-gray-600">
              Your token is secured by the Electra Protocol blockchain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
