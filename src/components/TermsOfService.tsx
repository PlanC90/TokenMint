import React from 'react';

    const TermsOfService: React.FC = () => {
      return (
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By using the MemeX Token Creator service, you agree to the following terms and conditions.
            Please read these terms carefully before using our service.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Token Creation</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our service allows you to create tokens on the MemeX network. The tokens created
            through our service have no financial value. We will deliver the created tokens to the
            wallet address you provide.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">MemeX Network</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The tokens are minted on the MemeX network. Transfers of these tokens may require
            the use of XEP gas tokens. Currently, only OmniXEP wallets support these tokens.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsibility</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            You are solely responsible for the tokens you create using our service. We are not
            responsible for any losses or damages that may arise from the use of these tokens.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer of Financial Value</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The tokens created through our service have no inherent financial value. They are intended
            for community building, rewards programs, or other non-financial purposes.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Compliance with Laws</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree to comply with all applicable laws and regulations when using our service and
            creating tokens. You are responsible for ensuring that your use of the tokens does not
            violate any laws or regulations.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            In no event shall MemeX Token Creator be liable for any direct, indirect, incidental,
            special, or consequential damages arising out of or in any way connected with the use of
            our service or the tokens created through our service.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Changes to These Terms</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update these terms of service from time to time. We will notify you of any changes
            by posting the new terms on this page.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h3>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these terms of service, please contact us.
          </p>
        </div>
      );
    };

    export default TermsOfService;
