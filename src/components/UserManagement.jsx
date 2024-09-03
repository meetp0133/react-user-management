import React, { useState } from 'react';

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    birthdate: '',
    gender: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserList([...userList, { ...formData, id: Date.now() }]);
    setFormData({ fullName: '', age: '', birthdate: '', gender: '', image: null });
  };

  const handleDelete = (id) => {
    setUserList(userList.filter((user) => user.id !== id));
  };

  const handleEdit = (id) => {
    const userToEdit = userList.find((user) => user.id === id);
    setFormData(userToEdit);
    setUserList(userList.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex">
        {/* Add User Form */}
        <div className="w-1/4 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Add User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full px-3 py-2 border rounded"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                className="w-full px-3 py-2 border rounded"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Birthdate</label>
              <input
                type="date"
                name="birthdate"
                className="w-full px-3 py-2 border rounded"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                className="w-full px-3 py-2 border rounded"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload Image</label>
              <input
                type="file"
                name="image"
                className="w-full text-sm text-gray-500"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
            >
              Add User
            </button>
          </form>
        </div>

        {/* User List */}
        <div className="w-3/4 p-4">
          <h2 className="text-2xl font-bold text-center mb-4">User List</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Birthdate
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-200">
                    <img
                      src={user.image}
                      alt={user.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {user.age}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {user.gender}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {user.birthdate}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    <button
                      className="bg-blue-500 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none hover:bg-blue-600 transition-colors duration-200 mr-2"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-200 focus:outline-none hover:bg-red-600 transition-colors duration-200"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
