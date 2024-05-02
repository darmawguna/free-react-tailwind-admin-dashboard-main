import React, { useState, useEffect } from 'react';

interface Division {
  id: number;
  name: string;
}

interface Priority {
  id: number;
  name: string;
}

const CustomerServiceForm: React.FC = () => {
  const [titleIssues, setTitleIssues] = useState('');
  const [descriptionIssues, setDescriptionIssues] = useState('');
  const [rating, setRating] = useState<number | undefined>();
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<
    number | undefined
  >();
  const [selectedPriority, setSelectedPriority] = useState<
    number | undefined
  >();

  useEffect(() => {
    // Fetch divisions from API
    fetch('https://simobile.singapoly.com/api/division-department')
      .then((response) => response.json())
      .then((data) => setDivisions(data))
      .catch((error) => console.error('Error fetching divisions:', error));

    // Fetch priorities from API
    fetch('https://simobile.singapoly.com/api/priority-issues')
      .then((response) => response.json())
      .then((data) => setPriorities(data))
      .catch((error) => console.error('Error fetching priorities:', error));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title Issues:</label>
        <input
          type="text"
          value={titleIssues}
          onChange={(e) => setTitleIssues(e.target.value)}
        />
      </div>
      <div>
        <label>Description Issues:</label>
        <textarea
          value={descriptionIssues}
          onChange={(e) => setDescriptionIssues(e.target.value)}
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Division:</label>
        <select
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(parseInt(e.target.value))}
        >
          <option value={undefined}>Select Division</option>
          {divisions.map((division) => (
            <option key={division.id} value={division.id}>
              {division.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Priority:</label>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(parseInt(e.target.value))}
        >
          <option value={undefined}>Select Priority</option>
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerServiceForm;
