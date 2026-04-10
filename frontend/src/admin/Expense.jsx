


// import { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
// import API from "../config/api";

// export default function PremiumExpense() {
//   const [date, setDate] = useState("");
//   const [expenses, setExpenses] = useState([]);

//   const [amount, setAmount] = useState("");
//   const [reason, setReason] = useState("");
//   const [editIndex, setEditIndex] = useState(null);

//   /* ===== AUTO DATE ===== */
//   useEffect(() => {
//     setDate(new Date().toISOString().split("T")[0]);
//   }, []);

//   /* ===== FETCH ===== */
//   useEffect(() => {
//     if (!date) return;

//   const fetchData = async () => {
//   try {
//     const res = await fetch(`${API}/expense/${date}`);

//     if (!res.ok) {
//       throw new Error("API not found");
//     }

//     const data = await res.json();

//     setExpenses(data.expenses || []);
//   } catch (err) {
//     console.error("Fetch Error:", err);
//   }
// };

//     fetchData();
//   }, [date]);

//   /* ===== SYNC ===== */
//   const syncToDB = async (updated) => {
//     try {
//       await fetch(`${API}/expense`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ date, expenses: updated }),
//       });
//     } catch (err) {
//       console.error("Sync Error:", err);
//     }
//   };

//   /* ===== ADD ===== */
//   const handleAdd = async () => {
//     if (!amount || !reason) {
//       Swal.fire("Error", "Fill all fields", "warning");
//       return;
//     }

//     let updated;

//     if (editIndex !== null) {
//       updated = [...expenses];
//       updated[editIndex] = { amount: Number(amount), reason };
//       setEditIndex(null);
//     } else {
//       updated = [
//         ...expenses,
//         {
//           amount: Number(amount),
//           reason,
//           time: new Date().toLocaleTimeString(),
//         },
//       ];
//     }

//     setExpenses(updated);
//     await syncToDB(updated);

//     setAmount("");
//     setReason("");
//   };

//   /* ===== DELETE ===== */
//   const handleDelete = async (i) => {
//     const result = await Swal.fire({
//       title: "Delete?",
//       text: "This expense will be removed",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//     });

//     if (!result.isConfirmed) return;

//     const updated = [...expenses];
//     updated.splice(i, 1);
//     setExpenses(updated);
//     await syncToDB(updated);
//   };

//   /* ===== EDIT ===== */
//   const handleEdit = (i) => {
//     const e = expenses[i];
//     setAmount(e.amount);
//     setReason(e.reason);
//     setEditIndex(i);
//   };

//   /* ===== TOTAL ===== */
//   const totalExpense = expenses.reduce((s, e) => s + Number(e.amount), 0);

//   /* ===== CHART DATA ===== */
//   const chartData = expenses.map((e) => ({
//     name: e.reason,
//     value: e.amount,
//   }));

//   const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

//   /* ===== PDF ===== */
//   const downloadPDF = () => {
//     const doc = new jsPDF();

//     doc.text("Expense Report", 14, 20);
//     doc.text(`Date: ${date}`, 14, 30);
//     doc.text(`Total: Rs. ${totalExpense}`, 14, 40);

//     autoTable(doc, {
//       startY: 50,
//       head: [["Time", "Reason", "Amount"]],
//       body: expenses.map((e) => [e.time, e.reason, e.amount]),
//     });

//     doc.save(`Expense_${date}.pdf`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-6 text-white">
      
//       {/* TITLE */}
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold text-center text-red-400 mb-6"
//       >
//         💸 Premium Expense Manager
//       </motion.h2>

//       {/* GLASS CARD */}
//       <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl">
        
//         {/* DATE */}
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="p-2 bg-zinc-800 rounded mb-6"
//         />

//         {/* FORM */}
//         <div className="grid md:grid-cols-3 gap-4 mb-6">
//           <input
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="p-2 bg-zinc-900 rounded"
//           />
//           <input
//             placeholder="Reason"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="p-2 bg-zinc-900 rounded"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-red-500 hover:bg-red-600 rounded transition-all duration-200 hover:scale-105"
//           >
//             {editIndex !== null ? "Update" : "Add"}
//           </button>
//         </div>

//         {/* TOTAL */}
//         <div className="flex justify-between bg-black/40 p-3 rounded mb-6">
//           <span>Total Expense</span>
//           <span className="text-red-400 font-bold">₹ {totalExpense}</span>
//         </div>

//         {/* CHART FIXED */}
//         <div className="w-full h-[300px] mb-6 min-h-[250px]">
//           {chartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie data={chartData} dataKey="value" outerRadius={100}>
//                   {chartData.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-400">
//               No Data for Chart
//             </div>
//           )}
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-center border border-white/10">
//             <thead className="bg-white/10">
//               <tr>
//                 <th className="p-2 border">Time</th>
//                 <th className="p-2 border">Reason</th>
//                 <th className="p-2 border">Amount</th>
//                 <th className="p-2 border">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {expenses.map((e, i) => (
//                 <tr key={i} className="hover:bg-white/5">
//                   <td className="p-2 border">{e.time}</td>
//                   <td className="p-2 border">{e.reason}</td>
//                   <td className="p-2 border">₹ {e.amount}</td>
//                   <td className="p-2 border space-x-2">
//                     <button
//                       onClick={() => handleEdit(i)}
//                       className="bg-blue-500 px-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(i)}
//                       className="bg-red-500 px-2"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PDF */}
//         <div className="text-center mt-6">
//           <button
//             onClick={downloadPDF}
//             className="bg-purple-500 px-4 py-2 rounded"
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import API from "../config/api";

export default function PremiumExpense() {
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (!date) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/expense/${date}`);
        const data = await res.json();
        setExpenses(data.expenses || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [date]);

  const syncToDB = async (updated) => {
    try {
      await fetch(`${API}/api/expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, expenses: updated }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!amount || !reason) {
      Swal.fire("Error", "Fill all fields", "warning");
      return;
    }

    let updated;

    if (editIndex !== null) {
      updated = [...expenses];
      updated[editIndex] = { amount: Number(amount), reason };
      setEditIndex(null);
    } else {
      updated = [
        ...expenses,
        {
          amount: Number(amount),
          reason,
          time: new Date().toLocaleTimeString(),
        },
      ];
    }

    setExpenses(updated);
    await syncToDB(updated);
    setAmount("");
    setReason("");
  };

  const handleDelete = async (i) => {
    const result = await Swal.fire({
      title: "Delete?",
      text: "This expense will be removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    const updated = [...expenses];
    updated.splice(i, 1);
    setExpenses(updated);
    await syncToDB(updated);
  };

  const handleEdit = (i) => {
    const e = expenses[i];
    setAmount(e.amount);
    setReason(e.reason);
    setEditIndex(i);
  };

  const totalExpense = expenses.reduce((s, e) => s + Number(e.amount), 0);

  const chartData = expenses.map((e) => ({
    name: e.reason,
    value: e.amount,
  }));

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Expense Report", 14, 20);
    doc.text(`Date: ${date}`, 14, 30);
    doc.text(`Total: Rs. ${totalExpense}`, 14, 40);

    autoTable(doc, {
      startY: 50,
      head: [["Time", "Reason", "Amount"]],
      body: expenses.map((e) => [e.time, e.reason, e.amount]),
    });

    doc.save(`Expense_${date}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-3 sm:p-6 text-white">

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl sm:text-3xl font-bold text-center text-red-400 mb-4 sm:mb-6"
      >
        💸 Premium Expense Manager
      </motion.h2>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-3 sm:p-6 rounded-2xl shadow-xl">

        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 bg-zinc-800 rounded mb-4 w-full sm:w-auto"
        />

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-3 bg-zinc-900 rounded w-full"
          />
          <input
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="p-3 bg-zinc-900 rounded w-full"
          />
          <button
            onClick={handleAdd}
            className="bg-red-500 hover:bg-red-600 rounded p-3 w-full transition-all active:scale-95"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-center bg-black/40 p-3 rounded mb-6 text-sm sm:text-base">
          <span>Total Expense</span>
          <span className="text-red-400 font-bold">₹ {totalExpense}</span>
        </div>

        {/* CHART */}
        <div className="w-full h-[250px] sm:h-[300px] mb-6">
          {chartData.length > 0 ? (
            <ResponsiveContainer >
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={80}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Data
            </div>
          )}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-center border border-white/10">
            <thead className="bg-white/10">
              <tr>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((e, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="p-2 border">{e.time}</td>
                  <td className="p-2 border">{e.reason}</td>
                  <td className="p-2 border">₹ {e.amount}</td>
                  <td className="p-2 border flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(i)}
                      className="bg-blue-500 px-2 py-1 rounded w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="bg-red-500 px-2 py-1 rounded w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PDF */}
        <div className="text-center mt-6">
          <button
            onClick={downloadPDF}
            className="bg-purple-500 px-4 py-2 rounded w-full sm:w-auto"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}