import { useEffect, useState } from 'react';
import CustomerServiceForm from '../Forms/FormUts';


interface CustomerIssue {
  id_customer_service: number;
  nim: string;
  title_issues: string;
  description_issues: string | null;
  rating: number;
  image_url: string;
  division_department_name: string | null;
  priority_name: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  UTC8_CREATED_AT: string;
  UTC8_UPDATED_AT: string;
  UTC8_DELETED_AT: string | null;
}

const TableThree = () => {
  const [apiData, setApiData] = useState<CustomerIssue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    fetch('https://simobile.singapoly.com/api/trpl/customer-service')
      .then((response) => response.json())
      .then((data) => setApiData(data.datas))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddClick = () => {
    setShowForm(true); // Menampilkan form ketika tombol "Add" ditekan
  };



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(apiData.length / itemsPerPage);
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(startPage + 4, totalPages);
  const pageLinks = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Customer Issues
        </h4>
        <div className="p-2">
          <button
            className="hover:text-primary text-xl"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </div>

      {/* Tampilkan form jika showForm bernilai true */}
      {showForm && (
        <div>
          <h4>Add Customer Service</h4>
          <CustomerServiceForm/>
        </div>
      )}

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Id Customer Service
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Title Issue
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Rating
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {data.id_customer_service}
                  </h5>
                </td>
                <td>
                  <p className="text-sm">{data.title_issues}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data.rating}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      {/* Icon 1 */}
                    </button>
                    <button className="hover:text-primary">
                      {/* Icon 2 */}
                    </button>
                    <button className="hover:text-primary">
                      {/* Icon 3 */}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`mx-1 py-2 px-4 text-sm leading-5 ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primary hover:text-white hover:bg-primary-dark'
            }`}
            disabled={currentPage === 1}
          >
            &#8592; Back
          </button>
          {pageLinks.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 py-2 px-4 text-sm leading-5 ${
                currentPage === number
                  ? 'text-white bg-primary focus:outline-none focus:bg-primary-dark'
                  : 'text-primary hover:text-white hover:bg-primary-dark focus:outline-none'
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`mx-1 py-2 px-4 text-sm leading-5 ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primary hover:text-white hover:bg-primary-dark'
            }`}
            disabled={currentPage === totalPages}
          >
            Next &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableThree;
