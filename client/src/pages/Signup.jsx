import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  // State variables for form fields and loading
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic Password Matching Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return; // Stop form submission
    }

    // Simulating an API call (like to your backend)
    setTimeout(() => {
      console.log("Signup Attempt:", { fullName, email, password });
      setIsLoading(false);
      alert("Account Created Successfully! (Demo)");
      
      // Optional: Clear form after success
      // setFullName(''); setEmail(''); setPassword(''); setConfirmPassword('');
    }, 2000); // 2-second delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Signup Card */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Join us today! It only takes a minute.</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              minLength={6} // Basic length validation
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              required
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                // Visual feedback if passwords don't match (when confirmPassword has value)
                confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* Visual error message */}
            {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-4 py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 ${
              isLoading 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700 shadow-lg active:scale-95'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Alternative Signups */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300"></span></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or sign up with</span></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {/* Google Signup */}
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5 w-5 mr-2" alt="Google" />
              <span className="text-sm font-medium">Google</span>
            </button>
            {/* Facebook Signup */}
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/331393/facebook.svg" className="h-5 w-5 mr-2" alt="FB" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </div>

        {/* Link to Login Page */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-bold text-purple-600 hover:text-purple-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup