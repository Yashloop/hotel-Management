const ErrorPage = ({ message = 'Something went wrong', code = 500 }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div className="max-w-md w-full text-center">
      <div className="text-6xl font-bold text-gray-200 mb-4">{code}</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{code === 404 ? 'Page Not Found' : 'Error'}</h1>
      <p className="text-gray-600 mb-8">{message}</p>
      <a
        href="/admin"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Back to Dashboard
      </a>
    </div>
  </div>
);

export default ErrorPage;

