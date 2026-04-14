import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import { statsAPI } from '../../services/api';

const mockStats = {
	totalHotels: 25,
	totalRooms: 120,
	totalBookings: 450,
	pendingBookings: 12,
};

const AdminDashboard = () => {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await statsAPI.getDashboardStats();
				setStats(response.data);
			} catch (error) {
				console.log('Using mock stats');
				setStats(mockStats);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
				<p className="text-gray-600">Welcome to HMS Admin Panel</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
				<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Total Hotels</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalHotels}</p>
						</div>
						<div className="p-4 bg-blue-100 rounded-xl">
							<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						</div>
					</div>
				</div>
				<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Total Rooms</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalRooms}</p>
						</div>
						<div className="p-4 bg-green-100 rounded-xl">
							<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
						</div>
					</div>
				</div>
				<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Total Bookings</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalBookings}</p>
						</div>
						<div className="p-4 bg-purple-100 rounded-xl">
							<svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
						</div>
					</div>
				</div>
				<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">Pending Bookings</p>
							<p className="text-3xl font-bold text-orange-600 mt-1">{stats.pendingBookings}</p>
						</div>
						<div className="p-4 bg-orange-100 rounded-xl">
							<svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="bg-white p-8 rounded-xl shadow-lg">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Link
						to="/admin/add-hotel"
						className="block p-8 text-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
					>
						<svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
						</svg>
						<h3 className="text-xl font-bold mb-2">Add Hotel</h3>
						<p className="text-blue-100">Add new hotel listing</p>
					</Link>
					<Link
						to="/admin/add-room"
						className="block p-8 text-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
					>
						<svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
						</svg>
						<h3 className="text-xl font-bold mb-2">Add Room</h3>
						<p className="text-green-100">Add new room inventory</p>
					</Link>
					<Link
						to="/admin/manage-bookings"
						className="block p-8 text-center rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
					>
						<svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
						</svg>
						<h3 className="text-xl font-bold mb-2">Manage Bookings</h3>
						<p className="text-purple-100">View and manage bookings</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
