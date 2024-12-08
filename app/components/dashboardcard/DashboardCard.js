
export default function DashboardCard({ userName, status }) {
    return (
      <div className="bg-white p-20 rounded-lg">
        <h2 className="text-4xl font-bold mb-2">{userName}</h2>
        <p
          className={`${
            status === 'Available' ? 'text-green-500' : 'text-red-500'
          } font-medium`}
        >
          {status}
        </p>
      </div>
    );
  }