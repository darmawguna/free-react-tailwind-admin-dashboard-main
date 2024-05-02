import React, { useState, useEffect } from 'react';

interface FormData {
  title_issues: string;
  description_issues: string;
  rating: number;
  id_division_target?: string;
  id_priority?: string;
}

interface Option {
  value: string;
  label: string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title_issues: '',
    description_issues: '',
    rating: 0,
  });

  const [departmentOptions, setDepartmentOptions] = useState<Option[]>([]);
  const [priorityOptions, setPriorityOptions] = useState<Option[]>([]);

  useEffect(() => {
    // Fetch department options from API
    fetch('https://simobile.singapoly.com/api/division-department')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.datas)) {
          setDepartmentOptions(
            data.datas.map((option: any) => ({
              value: option.id_division_target.toString(),
              label: option.division_department_name,
            })),
          );
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) =>
        console.error('Error fetching department options:', error),
      );

    // Fetch priority options from API
    fetch('https://simobile.singapoly.com/api/priority-issues')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.datas)) {
          setPriorityOptions(
            data.datas.map((option: any) => ({
              value: option.id_priority.toString(),
              label: option.priority_name,
            })),
          );
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) =>
        console.error('Error fetching priority options:', error),
      );
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        'https://simobile.singapoly.com/api/trpl/customer-service',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form data after successful submission
      setFormData({
        title_issues: '',
        description_issues: '',
        rating: 0,
      });

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="title_issues"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title Issues
          </label>
          <input
            type="text"
            name="title_issues"
            value={formData.title_issues}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description_issues"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description Issues
          </label>
          <textarea
            name="description_issues"
            value={formData.description_issues}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Rating
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            required
            min={1}
            max={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="id_division_target"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Department
          </label>
          <select
            name="id_division_target"
            value={formData.id_division_target || ''}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an option</option>
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="id_priority"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Priority
          </label>
          <select
            name="id_priority"
            value={formData.id_priority || ''}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an option</option>
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
