import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Search, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { name: 'Search', icon: <Search size={22} /> },
    { name: 'Analytics', icon: <BarChart3 size={22} /> },
    { name: 'Profile', icon: <User size={22} /> },
    { name: 'Notifications', icon: <Bell size={22} /> },
    { name: 'Settings', icon: <Settings size={22} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Container */}
      <div 
        className={`relative bg-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-purple-600 text-white rounded-full p-1 shadow-lg hover:bg-purple-700 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Logo Section */}
        <div className="p-6 flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-pink-500 p-2 rounded-lg shrink-0">
            <div className="w-6 h-6 border-2 border-white rounded-md"></div>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              BrandName
            </span>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                activeItem === item.name 
                  ? 'bg-purple-50 text-purple-600' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`${activeItem === item.name ? 'text-purple-600' : 'group-hover:text-purple-600'}`}>
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">{item.name}</span>
              )}
              
              {/* Tooltip for Collapsed State */}
              {isCollapsed && (
                <div className="absolute left-full ml-6 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {item.name}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-gray-100">
          <button className={`w-full flex items-center gap-4 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group`}>
            <LogOut size={22} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
          
          <div className={`mt-4 flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
            <img 
              src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-purple-100"
            />
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-800 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area Preview */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to {activeItem}
        </h1>
        <p className="text-gray-500 mt-2">Content goes here...</p>
      </div>
    </div>
  );
};

export default Sidebar;