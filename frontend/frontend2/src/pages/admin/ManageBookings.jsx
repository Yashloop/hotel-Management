import { useState, useEffect } from 'react';
import Loader from '../../components/ui/Loader';
import SearchBar from '../../components/ui/SearchBar';
import { bookingsAPI } from '../../services/api';

const mockBookings = [
  {
    id: 1,
    userId: 'U001',
    roomId: 101,
    checkIn: '2024-04-15',
    checkOut: '2024-04-20',
    totalPrice: 750,
    status: 'pending',
  },
  {
    id: 2,
    userId: 'U002',
    roomId: 202,
    checkIn: '2024-04-10',
    checkOut: '2024-04-15',
    totalPrice: 1200,
    status: 'approved',
  },
  {
    id: 3,
    userId: 'U003',
    roomId: 303,
    checkIn: '2024-04-20',
    checkOut: '2024-04-25',
    totalPrice: 950,
    status: 'pending',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingsAPI.getHistory();
        setBookings(response.data || mockBookings);
      } catch (error) {
        console.log('Using mock bookings');
        setBookings(mockBookings);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = bookings.filter((booking) =>
        booking.id.toString().includes(searchQuery) ||
        booking.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  }, [searchQuery, bookings]);

  const handleAction = async (bookingId, action) => {
    if (confirm(`Are you sure you want to ${action} booking #${bookingId}?`)) {
      try {
        if (action === 'delete') {
          await bookingsAPI.delete(bookingId);
        } else {
          await bookingsAPI[action === 'approve' ? 'approve' : 'cancel'](bookingId);
        }
        setBookings(bookings.filter((b) => b.id !== bookingId));
      } catch (error) {
        alert('Action failed');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Bookings</h1>
          <p className="text-gray-600">{filteredBookings.length} bookings found</p>
        </div>
        <SearchBar onSearch={setSearchQuery} placeholder="Search by ID, user, status..." />
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.roomId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.checkIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.checkOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${booking.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status] || 'bg-gray-100 text-gray-800'}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAction(booking.id, 'approve')}
                            className="text-green-600 hover:text-green-900 px-2 py-1 rounded-md hover:bg-green-50 transition-colors"
                          >
                            Approve
                          </button>
                          <span>|</span>
                        </>
                      )}
                      <button
                        onClick={() => handleAction(booking.id, 'cancel')}
                        className="text-orange-600 hover:text-orange-900 px-2 py-1 rounded-md hover:bg-orange-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => handleAction(booking.id, 'delete')}
                        className="text-red-600 hover:text-red-900 px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;

