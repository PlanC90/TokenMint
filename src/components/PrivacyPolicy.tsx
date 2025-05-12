import React from 'react';

    const PrivacyPolicy: React.FC = () => {
      return (
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This privacy policy describes how MemeX Token Creator collects, uses, and shares information
            when you use our token creation service. We are committed to protecting your privacy and
            ensuring the security of your personal information.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Wallet Address:</strong> We collect your wallet address to deliver the created tokens.
            </li>
            <li>
              <strong>Token Details:</strong> We collect the token name, maximum supply, and logo URL to
              create the token according to your specifications.
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the collected information solely for the purpose of creating and delivering the token
            to your specified wallet address. We do not use your information for any other purpose.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement reasonable security measures to protect your information from unauthorized
            access, use, or disclosure. However, please note that no method of transmission over the
            internet or method of electronic storage is 100% secure.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Services</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use Supabase as our backend service to store token request data. Please refer to
            Supabase's privacy policy for more information on how they handle your data.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Changes to This Privacy Policy</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by
            posting the new privacy policy on this page.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h3>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this privacy policy, please contact us.
          </p>
        </div>
      );
    };

    export default PrivacyPolicy;
