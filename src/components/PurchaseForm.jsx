import React, { useState } from 'react';
import axios from "./axios";


// Бұл компонент қолданушының аты, мекенжайы және телефон нөмірін жинап, сатып алуды растайды


function PurchaseForm({ onClose }) {
  const [name, setName] = useState('');               // Аты
  const [address, setAddress] = useState('');         // Мекенжайы
  const [phone, setPhone] = useState('');             // Телефон нөмірі
  const [loading, setLoading] = useState(false);      // Жүктелу күйі (күту)


   //  Сатып алу кнопкасын басқанда орындалады
  async function handleBuy() {
    const token = localStorage.getItem('token');
    if (!token) return alert("Жүйеге кіріңіз.");

    // Егер бір де бір өріс бос болса — ескерту
    if (!name || !address || !phone) {
      return alert("Барлық өрістерді толтырыңыз");
    }

    try {
      setLoading(true);                  // кнопка "Жүктелуде..." деп өзгереді
      await axios.post("/purchase", {}, {                            //POST /purchase деген маршрутқа сұраныс жібереді,  Мәлімет бос ({}), бірақ сервер ішінде ол req.user.id арқылы user_id алып, дерекқорға тапсырысты жазады
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Сатып алу сәтті өтті!");
      onClose();                          // Модаль жабылады

    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {                                           //кнопка қалыпты күйге қайтады
      setLoading(false);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999] bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[400px] max-w-[90%] max-h-[90vh] overflow-auto shadow-xl flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Сатып алу үшін мәліметтер</h2>
         
         {/* Атыңыз */}
        <input
          type="text"
          placeholder="Атыңыз"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        
        {/* Мекенжай */}
        <input
          type="text"
          placeholder="Мекенжай"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />
        
        {/* Телефон */}
        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />
         
         {/* Растау батырмасы */}
        <button
          onClick={handleBuy}
          disabled={loading}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Жүктелуде..." : "Растау және сатып алу"}
        </button>
         

         {/* Бас тарту батырмасы */}
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
