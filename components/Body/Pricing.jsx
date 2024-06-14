import React, { useEffect, useState } from 'react';

const Pricing = ({ successNotific, errorNotific }) => {
  const plans = [
    {
      name: 'Basic',
      price: '$10',
      features: [
        'Access to basic features',
        '10 trades per day',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      price: '$30',
      features: [
        'Access to all features',
        '50 trades per day',
        'Priority email support',
      ],
    },
    {
      name: 'Enterprise',
      price: '$100',
      features: [
        'Unlimited access',
        'Unlimited trades per day',
        'Phone and email support',
        'Dedicated account manager',
      ],
    },
  ];

  const [currentPlan, setCurrentPlan] = useState(null);
  const [membershipExpires, setMembershipExpires] = useState(null);

  useEffect(() => {
    const storedMembership = JSON.parse(localStorage.getItem('membershipDetails'));
    if (storedMembership) {
      setCurrentPlan(storedMembership.plan);
      setMembershipExpires(storedMembership.expires);
    }
  }, []);

  const handlePurchase = (plan) => {
    const cnfirmation = confirm(`Are you sure for the purchase of ${plan.name} plan?`)
    const newExpiryDate = new Date();
    newExpiryDate.setDate(newExpiryDate.getDate() + 30);

    const membershipDetails = {
      plan: plan.name,
      expires: newExpiryDate.toLocaleDateString(),
    };

    localStorage.setItem('membershipDetails', JSON.stringify(membershipDetails));
    setCurrentPlan(plan.name);
    localStorage.setItem("membership", true);
    setMembershipExpires(membershipDetails.expires);
    successNotific(`You have selected the ${plan.name} plan`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        {currentPlan ? `Your Current Plan: ${currentPlan}` : 'Membership Plans'}
      </h2>
      {currentPlan && (
        <div className="text-white mb-8">
          <p>Your plan expires on: {membershipExpires}</p>
        </div>
      )}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        {plans
          .filter(plan => plan.name !== currentPlan)
          .map((plan, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
              <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>
              <p className="text-2xl font-bold text-white mb-4">{plan.price}/month</p>
              <ul className="text-gray-400 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="mb-2">- {feature}</li>
                ))}
              </ul>
              <button
                onClick={() => handlePurchase(plan)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Buy Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pricing;
