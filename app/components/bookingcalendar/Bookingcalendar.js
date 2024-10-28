import React from "react";

const BookingCalendar = () => {
  const columns = ["Time", "00", "20", "40"];
  const rows = [
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];

  return (
    <div className="w-full overflow-x-auto h-screen ">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`border border-gray-300 p-4 bg-[#ececec] ${
                  index === 0 ? "w-[200px] " : ""
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td
                className={`border border-gray-300 p-2 bg-[#f8f8f8] text-center font-bold ${rowIndex === 0 ? "w-[200px]" : ""}`}
              >
                {row}
              </td>
              <td className="border border-gray-300 p-2">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-30">
                  <thead className="bg-[#f8f7f7]">
                    <tr>
                      <th className="px-4 py-2 text-xs font-bold text-gray-600 text-center uppercase tracking-wider">
                        AVIALABLE
                      </th>
                      <th className="px-4 py-2 text-xs font-bold text-gray-600  text-center uppercase tracking-wider">
                        BUSY
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white  divide-y divide-gray-200 border border-gray-30" >
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-center">
                          14
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-center">
                          0
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td className="border border-gray-300 p-2">
                <table className="min-w-full  divide-y divide-gray-200 border border-gray-30">
                  <thead className="bg-[#f8f7f7]">
                    <tr>
                      <th className="px-4 py-2 text-center text-xs font-bold text-gray-600  uppercase tracking-wider">
                        AVIALABLE
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-bold text-gray-600  uppercase tracking-wider">
                        BUSY
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 border border-gray-300">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-center">
                          14
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-center">
                          0
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td className="border border-gray-300  p-2">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                  <thead className="bg-[#f8f7f7]">
                    <tr>
                      <th className="px-4 py-2 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                        AVIALABLE
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                        BUSY
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 border border-gray-300">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-center">
                          14
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-center">
                          0
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default BookingCalendar;
