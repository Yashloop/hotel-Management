import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import { hotelsAPI } from '../../services/api';

const AddHotel = () => {
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		description: '',
		rating: '',
		imageUrl: '',
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
			await hotelsAPI.create(formData);
			setSuccess(true);
			setTimeout(() => {
				navigate('/admin');
			}, 1500);
		} catch (err) {
			setError('Failed to add hotel. Please try again.');
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
					<h2 className="text-2xl font-bold text-green-900 mb-4">Hotel Added Successfully!</h2>
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
						<h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
							Add New Hotel
						</h1>
						<p className="text-xl text-gray-600">Fill out the details to add a new hotel</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
								{error}
							</div>
						)}

						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
								Hotel Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
								placeholder="Grand Hyatt Dubai"
								value={formData.name}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
								Location
							</label>
							<input
								type="text"
								id="location"
								name="location"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
								placeholder="Dubai, UAE"
								value={formData.location}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								rows="4"
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-vertical"
								placeholder="Luxury hotel with ocean views..."
								value={formData.description}
								onChange={handleChange}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
									Rating (1-5)
								</label>
								<input
									type="number"
									id="rating"
									name="rating"
									min="1"
									max="5"
									step="0.1"
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
									placeholder="4.8"
									value={formData.rating}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
									Image URL
								</label>
								<input
									type="url"
									id="imageUrl"
									name="imageUrl"
									className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
									placeholder="https://example.com/hotel.jpg"
									value={formData.imageUrl}
									onChange={handleChange}
								/>
							</div>
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
								className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
							>
								{loading ? (
									<>
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
										<span>Adding...</span>
									</>
								) : (
									'Add Hotel'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddHotel;
