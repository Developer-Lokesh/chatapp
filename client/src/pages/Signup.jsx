import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  // State variables for form fields and loading

  const [form, setForm] = useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const [isLoading, setIsLoading] = useState(false);

  // handle all inputs
  const inputHandler = (e) => {
    const eleName = e.target.name;
    const value = e.target.value;
    setForm({...form, [eleName]:value})
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Password Matching Validation
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return; 
    }

    const {confirmPassword, ...signupBody} = form
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/auth/signup`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(signupBody)
      });
      const data = await res.json();
      if(!data.success){
        alert(data.message || "Something went wrong while creating account!");
        // setForm({
        //   fullName:"",
        //   email:"",
        //   password:"",
        //   confirmPassword:""
        // });
        setIsLoading(false);
        return;
      } 

      navigate("/")
      

    } catch (error) {
      console.log(error)
     
    } finally {
      setIsLoading(false)
    }

   
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
              name = "fullName"
              value={form.fullName}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              onChange={inputHandler}
            />
          </div>

          {/* Email Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name = "email"
              value={form.email}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="name@company.com"
              onChange={inputHandler}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name = "password"
              value={form.password}
              required
              minLength={6} // Basic length validation
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              onChange={inputHandler}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name = "confirmPassword"
              value={form.confirmPassword}
              required
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                // Visual feedback if passwords don't match (when confirmPassword has value)
                form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
              onChange={inputHandler}
            />
            {/* Visual error message */}
            {form.confirmPassword && form.password !== form.confirmPassword && (
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