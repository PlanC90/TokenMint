import React from 'react';
import { TrendingUp, Gift, Zap, DollarSign, BarChart2, CreditCard, Gamepad2, Briefcase } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 hover:scale-105">
      <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="text-blue-600" size={24} />,
      title: "Build Your Ecosystem",
      description: "Grow your community and maintain complete control over your token economy."
    },
    {
      icon: <Gift className="text-purple-600" size={24} />,
      title: "Airdrops & Promotions",
      description: "Use your token as a powerful marketing tool to engage and reward your audience."
    },
    {
      icon: <Zap className="text-yellow-600" size={24} />,
      title: "Fast & Low-Cost Transactions",
      description: "Benefit from Electra Protocol's lightning-fast speed and minimal transaction fees."
    },
    {
      icon: <DollarSign className="text-green-600" size={24} />,
      title: "Increase Brand Value",
      description: "Create a unique asset for your project and enhance your brand's recognition."
    },
    {
      icon: <BarChart2 className="text-teal-600" size={24} />,
      title: "Track Prepaid Sales",
      description: "Easily monitor and manage sales made using your token as a prepaid option."
    },
    {
      icon: <CreditCard className="text-orange-600" size={24} />,
      title: "Store Gift Options",
      description: "Offer your token as a flexible gift card or store credit option for customers."
    },
    { // New Feature: Game Token
      icon: <Gamepad2 className="text-red-600" size={24} />,
      title: "Game Token for Home Games",
      description: "Create a token for managing stakes and rewards in private home games."
    },
    { // New Feature: Business Token
      icon: <Briefcase className="text-indigo-600" size={24} />,
      title: "Your Own Business Token",
      description: "Launch a custom token to enhance customer loyalty, payments, or internal operations."
    }
  ];

  return (
    <section id="features" className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Create Your Own Token?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Launching your own token on the Electra Protocol opens up new possibilities for your project or business.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
