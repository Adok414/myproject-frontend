import React, { useState } from 'react';
import axios from 'axios';

function PurchaseForm({ onClose }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    const token = localStorage.getItem('token');
    if (!token) return alert("Жүйеге кіріңіз.");

    if (!name || !address || !phone) {
      return alert("Барлық өрістерді толтырыңыз");
    }

    try {
      setLoading(true);
      await axios.post("https://iphone-backend.onrender.com/purchase", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Сатып алу сәтті өтті!");
      onClose(); // модалды жабу

    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999] bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-[90%] max-h-[90vh] overflow-auto shadow-xl flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Сатып алу үшін мәліметтер</h2>

        <input
          type="text"
          placeholder="Атыңыз"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Мекенжай"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleBuy}
          disabled={loading}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Жүктелуде..." : "Растау және сатып алу"}
        </button>

        <button
          onClick={onClose}
          className="text-red-600 underline text-sm self-center"
        >
          Бас тарту
        </button>
      </div>
    </div>
  );
}

export default PurchaseForm;
