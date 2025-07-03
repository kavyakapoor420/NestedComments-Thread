import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  CreditCard, 
  FileText,
  Download,
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const FounderooAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const stats = [
    { title: 'Total Users', value: '3', color: 'bg-blue-500' },
    { title: 'Total Payments', value: '2', color: 'bg-green-500' },
    { title: 'Pending Applications', value: '1', color: 'bg-yellow-500' },
  ];

  const users = [
    {
      id: 1,
      name: 'Aman Singh',
      email: 'aman.singh@founderoo.com',
      phone: '+91 98765 43210',
      applicationStatus: 'Approved',
      paymentStatus: 'Paid',
      joinDate: '2024-06-10',
      lastLogin: '2024-06-25'
    },
    {
      id: 2,
      name: 'Shashank Verma',
      email: 'shashank.verma@founderoo.com',
      phone: '+91 87654 32109',
      applicationStatus: 'Under Review',
      paymentStatus: 'Paid',
      joinDate: '2024-06-12',
      lastLogin: '2024-06-24'
    },
    {
      id: 3,
      name: 'Mridul Awasthi',
      email: 'mridul.awasthi@founderoo.com',
      phone: '+91 76543 21098',
      applicationStatus: 'Pending',
      paymentStatus: 'Pending',
      joinDate: '2024-06-15',
      lastLogin: '2024-06-23'
    }
  ];

  const payments = [
    {
      id: 1,
      user: 'Aman Singh',
      userId: 1,
      amount: '₹5,000',
      date: '2024-06-20',
      status: 'Completed',
      paymentMethod: 'UPI',
      transactionId: 'TXN001234567',
      receipt: 'Download'
    },
    {
      id: 2,
      user: 'Shashank Verma',
      userId: 2,
      amount: '₹7,500',
      date: '2024-06-22',
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN001234568',
      receipt: 'Download'
    },
    {
      id: 3,
      user: 'Mridul Awasthi',
      userId: 3,
      amount: '₹3,000',
      date: '2024-06-25',
      status: 'Processing',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN001234569',
      receipt: 'Pending'
    }
  ];

  const applications = [
    {
      id: 1,
      user: 'Aman Singh',
      userId: 1,
      applicationId: 'FND-001',
      status: 'Approved',
      date: '2024-06-15',
      businessName: 'TechStart Solutions',
      category: 'Technology',
      fundingAmount: '₹5,00,000',
      description: 'AI-based startup solutions'
    },
    {
      id: 2,
      user: 'Shashank Verma',
      userId: 2,
      applicationId: 'FND-002',
      status: 'Under Review',
      date: '2024-06-18',
      businessName: 'Green Energy Co',
      category: 'Clean Energy',
      fundingAmount: '₹7,50,000',
      description: 'Renewable energy solutions'
    },
    {
      id: 3,
      user: 'Mridul Awasthi',
      userId: 3,
      applicationId: 'FND-003',
      status: 'Pending',
      date: '2024-06-20',
      businessName: 'EduTech Platform',
      category: 'Education',
      fundingAmount: '₹3,00,000',
      description: 'Online learning platform'
    }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard' },
    { icon: Users, label: 'Users', key: 'users' },
    { icon: CreditCard, label: 'Payments', key: 'payments' },
    { icon: FileText, label: 'Applications', key: 'applications' },
  ];

  const getStatusColor = (status, type = 'application') => {
    if (type === 'application') {
      switch (status) {
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'Under Review': return 'bg-yellow-100 text-yellow-800';
        case 'Pending': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    } else if (type === 'payment') {
      switch (status) {
        case 'Paid': case 'Completed': return 'bg-green-100 text-green-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Pending': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const handleSidebarClick = (key) => {
    setActiveSection(key);
    setSidebarOpen(false);
  };

  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg shadow-sm p-6 text-white`}>
            <h3 className="text-sm sm:text-base font-medium mb-2">{stat.title}</h3>
            <p className="text-3xl sm:text-4xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Recent Users</h3>
          {users.slice(0, 3).map((user, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.applicationStatus)}`}>
                {user.applicationStatus}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">Recent Payments</h3>
          {payments.slice(0, 3).map((payment, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium">{payment.user}</p>
                <p className="text-sm text-gray-500">{payment.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{payment.amount}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status, 'payment')}`}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderUsers = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Users Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APPLICATION STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAYMENT STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JOIN DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.applicationStatus, 'application')}`}>
                      {user.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.paymentStatus, 'payment')}`}>
                      {user.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {users.map((user) => (
            <div key={user.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.applicationStatus, 'application')}`}>
                    App: {user.applicationStatus}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.paymentStatus, 'payment')}`}>
                    Pay: {user.paymentStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Joined: {user.joinDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Payments Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Status</option>
              <option>Completed</option>
              <option>Processing</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AMOUNT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">METHOD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TRANSACTION ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RECEIPT</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{payment.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status, 'payment')}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {payment.receipt === 'Download' ? (
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    ) : (
                      <span className="text-red-600">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {payments.map((payment) => (
            <div key={payment.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{payment.user}</h3>
                    <p className="text-lg font-semibold text-gray-900">{payment.amount}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status, 'payment')}`}>
                    {payment.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                  <div>Method: {payment.paymentMethod}</div>
                  <div>Date: {payment.date}</div>
                </div>
                <div className="text-xs font-mono text-gray-500">
                  ID: {payment.transactionId}
                </div>
                <div className="flex justify-end">
                  {payment.receipt === 'Download' ? (
                    <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download Receipt
                    </button>
                  ) : (
                    <span className="text-red-600 text-sm">Receipt Pending</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Applications Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Status</option>
              <option>Approved</option>
              <option>Under Review</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APPLICANT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APPLICATION ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BUSINESS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FUNDING</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{app.applicationId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.businessName}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{app.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{app.fundingAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status, 'application')}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {applications.map((app) => (
            <div key={app.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{app.user}</h3>
                    <p className="text-sm text-gray-500 font-mono">{app.applicationId}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{app.businessName}</h4>
                  <p className="text-sm text-gray-500">{app.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                  <div>Category: {app.category}</div>
                  <div>Date: {app.date}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{app.fundingAmount}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status, 'application')}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return renderUsers();
      case 'payments':
        return renderPayments();
      case 'applications':
        return renderApplications();
      default:
        return renderDashboard();
    }
  };

  const getPageTitle = () => {
    switch (activeSection) {
      case 'users':
        return 'Users Management';
      case 'payments':
        return 'Payments Management';
      case 'applications':
        return 'Applications Management';
      default:
        return 'Admin Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-purple-700 shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6">
          <h1 className="text-xl font-bold text-white">Founderoo Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-purple-600 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSidebarClick(item.key)}
              className={`w-full flex items-center px-4 py-3 mt-2 text-sm font-medium rounded-lg transition-colors text-left ${
                activeSection === item.key
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-200 hover:bg-purple-600 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-3"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-purple-700">{getPageTitle()}</h2>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default FounderooAdmin;