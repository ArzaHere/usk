import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    id: null,
    name: '',
    description: '',
    logo_url: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clients');
      setClients(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCurrentClient({
      ...currentClient,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/clients/${currentClient.id}`,
          currentClient,
          config
        );
      } else {
        await axios.post('http://localhost:5000/api/clients', currentClient, config);
      }
      setShowModal(false);
      resetForm();
      fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Gagal menyimpan klien');
    }
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        await axios.delete(`http://localhost:5000/api/clients/${id}`, config);
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Gagal menghapus klien');
      }
    }
  };

  const resetForm = () => {
    setCurrentClient({
      id: null,
      name: '',
      description: '',
      logo_url: ''
    });
    setEditMode(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Klien</h1>
            <p className="text-gray-600 mt-2">Tambah, edit, atau hapus klien</p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/admin"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              ← Kembali
            </Link>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              + Tambah Klien
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {clients.map((client) => (
            <div key={client.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <div className="w-20 h-20 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                {client.logo_url ? (
                  <img src={client.logo_url} alt={client.name} className="w-16 h-16 object-contain rounded-full" />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">{client.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="text-center font-semibold text-sm mb-3">{client.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="flex-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="flex-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">Belum ada klien</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editMode ? 'Edit Klien' : 'Tambah Klien Baru'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Klien *</label>
                  <input
                    type="text"
                    name="name"
                    value={currentClient.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    name="description"
                    value={currentClient.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Logo</label>
                  <input
                    type="url"
                    name="logo_url"
                    value={currentClient.logo_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                  >
                    {editMode ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;