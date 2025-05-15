import React, { useState, useRef, useEffect } from 'react';
import { Info, Copy, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode.react';
import { supabase } from '../supabaseClient';
import { detectDevice, walletUrls } from '../utils/deviceDetection';

interface FormData {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: string;
  tokenLogoUrl: string;
  walletAddress: string;
  transactionId: string; // New field for Transaction ID
  paymentConfirmed: boolean;
}

const TokenForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    tokenName: '',
    tokenSymbol: '',
    totalSupply: '',
    tokenLogoUrl: '',
    walletAddress: '',
    transactionId: '', // Initialize Transaction ID
    paymentConfirmed: false,
  });
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null); // State for logo validation error

  // Ref for the success message element
  const successMessageRef = useRef<HTMLHeadingElement>(null);

  // Updated payment address and fee
  const paymentAddress = 'xNLf3qAwErms2KsDC3cJ5trwwV6kX1ZXzX'; // This should be the actual payment address
  const tokenCreationFee = '5,000,000 MemeX'; // Updated fee

  // Effect to scroll to the success message when submission is successful
  useEffect(() => {
    if (submissionSuccessful && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Note: Programmatically moving the mouse cursor is not possible in web browsers.
      // The scrollIntoView ensures the message is visible to the user.
    }
  }, [submissionSuccessful]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
    if (name === 'tokenLogoUrl') {
      setLogoError(null); // Clear error when input changes
    }
  };

  // Simplified validation: only check if a URL is provided (optional field)
  const validateLogoUrl = (url: string): string | null => {
    // If a URL is provided, we assume it's valid for now.
    // More robust URL validation could be added here if needed,
    // but image specific validation (like size/format) is removed.
    return null; // No validation error
  };

  // Function to handle copying the payment address to clipboard
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(paymentAddress);
      alert('Payment address copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy address: ', err);
      alert('Failed to copy address.');
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Attempting to submit token request...');

    if (!formData.paymentConfirmed) {
      alert('Please confirm that you have sent the payment.');
      return;
    }

    // Validate logo URL before submission (now simplified)
    const logoValidationError = validateLogoUrl(formData.tokenLogoUrl);
    if (logoValidationError) {
      setLogoError(logoValidationError);
      return; // Stop submission if validation fails
    } else {
      setLogoError(null); // Clear any previous error
    }


    const { data: { user } } = await supabase.auth.getUser();

    const { tokenName, tokenSymbol, totalSupply, tokenLogoUrl, walletAddress, transactionId } = formData;

    const { data, error } = await supabase
      .from('requests')
      .insert([
        {
          user_id: user ? user.id : null,
          token_type: 'MEMEX', // Assuming MEMEX is the payment token type
          amount: parseInt(totalSupply, 10),
          token_name: tokenName,
          token_symbol: tokenSymbol,
          token_logo_url: tokenLogoUrl,
          wallet_address: walletAddress,
          transaction_id: transactionId, // Include transaction ID
          payment_confirmed: formData.paymentConfirmed,
          status: 'pending'
        },
      ]);

    if (error) {
      console.error('Error saving token request:', error);
      alert(`Failed to submit token request: ${error.message}`);
    } else {
      console.log('Token request submitted successfully:', data);
      setSubmittedData(formData); // Store submitted data
      setSubmissionSuccessful(true); // Set success state
      // Optionally clear form data if needed, but keeping it for summary display
      // setFormData({ ...initialFormData });
    }
  };

  const deviceType = detectDevice();
  const walletDownloadUrl = walletUrls[deviceType];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Token Details</h3>

      {submissionSuccessful && submittedData ? (
        <div className="text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          {/* Attach the ref to the success message heading */}
          <h4 ref={successMessageRef} className="text-xl font-semibold text-gray-800 mb-4">Token Request Submitted Successfully!</h4>
          <p className="text-gray-600 mb-6">
            Your request for token creation has been received. Your token will be delivered to your wallet within 48 hours.
          </p>
          <div className="text-left border-t border-gray-200 pt-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-3">Submitted Details:</h5>
            <p className="text-gray-700 mb-2"><strong>Token Name:</strong> {submittedData.tokenName}</p>
            <p className="text-gray-700 mb-2"><strong>Token Symbol:</strong> {submittedData.tokenSymbol}</p>
            <p className="text-gray-700 mb-2"><strong>Total Supply:</strong> {submittedData.totalSupply}</p>
            {submittedData.tokenLogoUrl && (
              <p className="text-gray-700 mb-2"><strong>Token Logo URL:</strong> <a href={submittedData.tokenLogoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{submittedData.tokenLogoUrl}</a></p>
            )}
            <p className="text-gray-700 mb-2"><strong>Wallet Address:</strong> {submittedData.walletAddress}</p>
            <p className="text-gray-700 mb-2"><strong>Transaction ID:</strong> {submittedData.transactionId}</p>
            <p className="text-gray-700 mb-2"><strong>Payment Confirmed:</strong> {submittedData.paymentConfirmed ? 'Yes' : 'No'}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <a
              href={walletDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2"><path d="M21 15v4a2 20 0 0 1-2 2H5a2 20 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download OmniXEP Wallet
            </a>
          </div>

          <div className="flex items-center bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
            <Info className="mr-3" size={20} />
            <div>
              <p className="font-bold">Token creation fee: {tokenCreationFee}</p>
              <p className="text-sm">Your token will be delivered to your wallet within 48 hours.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="tokenName" className="block text-gray-700 font-semibold mb-2">Token Name</label>
              <input
                type="text"
                id="tokenName"
                name="tokenName"
                value={formData.tokenName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter token name"
                title="Please enter a token name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tokenSymbol" className="block text-gray-700 font-semibold mb-2">Token Symbol (e.g., MEMEX)</label>
              <input
                type="text"
                id="tokenSymbol"
                name="tokenSymbol"
                value={formData.tokenSymbol}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter token symbol"
                title="Please enter a token symbol"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="totalSupply" className="block text-gray-700 font-semibold mb-2">Total Supply</label>
              <input
                type="number"
                id="totalSupply"
                name="totalSupply"
                value={formData.totalSupply}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter total supply"
                title="Please enter the total supply"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tokenLogoUrl" className="block text-gray-700 font-semibold mb-2">Token Logo URL (Optional) – Must be a 30x30 .png image.</label>
              <input
                type="url"
                id="tokenLogoUrl"
                name="tokenLogoUrl"
                value={formData.tokenLogoUrl}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${logoError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                placeholder="Enter logo URL (optional)"
              />
              {logoError && (
                <p className="mt-1 text-sm text-red-500">{logoError}</p>
              )}
              <div className="mt-1 text-sm text-gray-500">
                Enter a URL for your token logo (optional).
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="walletAddress" className="block text-gray-700 font-semibold mb-2">Your Electra Protocol Wallet Address (for receiving token)</label>
              <input
                type="text"
                id="walletAddress"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter wallet address"
                title="Please enter your wallet address"
              />
            </div>

            {/* New Transaction ID Field */}
            <div className="mb-6">
              <label htmlFor="transactionId" className="block text-gray-700 font-semibold mb-2">Transaction ID / Tx Hash</label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter transaction ID"
                title="Please enter the transaction ID"
              />
            </div>

            <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Payment Address</h4>
              <p className="text-gray-700 mb-2 break-all">{paymentAddress}</p>
              <button
                type="button"
                onClick={handleCopyAddress} // This now calls the defined function
                className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                <Copy size={16} className="mr-1" /> Copy Address
              </button>

              <div className="mt-4 flex justify-center">
                <QRCode value={paymentAddress} size={180} level="H" />
              </div>

              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="paymentConfirmed"
                    checked={formData.paymentConfirmed}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                    required
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    I confirm that I have sent the payment to the address above.
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Create Token
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default TokenForm;
