import React from 'react';
import TokenForm from './TokenForm';

const CreateSection: React.FC = () => {
  return (
    <section id="create" className="py-16 px-6 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Create Your Token on Electra Protocol</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to start your token creation process. Once submitted, we'll process your request and deliver your token within 48 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <TokenForm />
        </div>
      </div>
    </section>
  );
};

export default CreateSection;
