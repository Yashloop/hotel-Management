import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import { roomsAPI } from '../../services/api';

const mockHotels = [
	{ id: 1, name: 'Grand Hyatt Dubai' },
	{ id: 2, name: 'Burj Al Arab' },
	{ id: 3, name: 'Atlantis The Palm' },
];

const AddRoom = () => {
	const [formData, setFormData] = useState({
		hotel_id: '',
		room_type: '',
		price: '',
		capacity: '',
		amenities: '',
		image_url: '',
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess(false);

		try {
			await roomsAPI.create(formData);
			setSuccess(true);
			setTimeout(() => {
				navigate('/admin');
			}, 1500);
		} catch (err) {
			setError('Failed to add room. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-green-50">
				<div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
					<div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
						<svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<h2 className="text-2xl font-bold text-green-900 mb-4">Room Added Successfully!</h2>
					<p className="text-gray-600 mb-8">Redirecting to dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white shadow-xl rounded-2xl p-8 sm:p-12">
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
							Add New Room
						</h1>
						<p className="text-xl text-gray-600">Add a new room to your hotel inventory</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
								{error}
							</div>
						)}

						<div>
							<label htmlFor="hotel_id" className="block text-sm font-medium text-gray-700 mb-2">
								Select Hotel *
							</label>
							<select
								id="hotel_id"
								name="hotel_id"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
								value={formData.hotel_id}
								onChange={handleChange}
							>
								<option value="">Choose hotel...</option>
								{mockHotels.map((hotel) => (
									<option key={hotel.id} value={hotel.id}>
										{hotel.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label htmlFor="room_type" className="block text-sm font-medium text-gray-700 mb-2">
								Room Type *
							</label>
							<select
								id="room_type"
								name="room_type"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
								value={formData.room_type}
								onChange={handleChange}
							>
								<option value="">Select room type...</option>
								<option value="standard">Standard</option>
								<option value="deluxe">Deluxe</option>
								<option value="suite">Suite</option>
								<option value="presidential">Presidential</option>
							</select>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
									Price per Night (USD) *
								</label>
								<input
									type="number"
									id="price"
									name="price"
									min="0"
									step="0.01"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
									placeholder="250.00"
									value={formData.price}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
									Capacity *
								</label>
								<input
									type="number"
									id="capacity"
									name="capacity"
									min="1"
									max="6"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
									placeholder="2"
									value={formData.capacity}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-2">
								Amenities (comma separated)
							</label>
							<input
								type="text"
								id="amenities"
								name="amenities"
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
								placeholder="WiFi, AC, TV, Minibar, Balcony"
								value={formData.amenities}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
								Image URL
							</label>
							<input
								type="url"
								id="image_url"
								name="image_url"
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
								placeholder="https://example.com/room.jpg"
								value={formData.image_url}
								onChange={handleChange}
							/>
						</div>

						<div className="flex gap-4 pt-4">
							<button
								type="button"
								onClick={() => navigate('/admin')}
								disabled={loading}
								className="flex-1 bg-gray-100 text-gray-900 py-3 px-4 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all font-medium"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={loading}
								className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
							>
								{loading ? (
									<>
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
										<span>Adding...</span>
									</>
								) : (
									'Add Room'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddRoom;
