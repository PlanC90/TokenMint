import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        {isOpen ? (
          <ChevronUp className="text-blue-600 flex-shrink-0" size={20} />
        ) : (
          <ChevronDown className="text-gray-600 flex-shrink-0" size={20} />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 animate-fadeIn">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is Electra Protocol?",
      answer: "Electra Protocol is a blockchain platform optimized for fast transactions and low fees. It provides a secure and efficient environment for creating and managing digital assets."
    },
    {
      question: "How long does it take to receive my token?",
      answer: "After submitting your request and paying the fee, your token will be delivered to your specified wallet address within 48 hours."
    },
    {
      question: "Can I customize the token properties?",
      answer: "Yes, you can specify the token name and maximum supply. Additional customization options may be available upon request."
    },
    {
      question: "What is the fee for creating a token?",
      answer: "The fee for token creation is 5,000,000 MEMEX, which is one of the lowest in the market for custom token creation."
    },
    {
      question: "Do I need technical knowledge to create a token?",
      answer: "No technical knowledge is required. Our simple form process handles all the technical aspects of token creation for you."
    },
    {
      question: "What can I use my token for?",
      answer: "Your token can be used for community building, rewards programs, fundraising, creating economic ecosystems, and more. The possibilities are limited only by your creativity."
    }
  ];

  return (
    <section id="faq" className="py-16 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Everything you need to know about creating tokens on Electra Protocol.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
