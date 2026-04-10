
// import { useEffect, useState, useMemo } from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import API from "../config/api";

// export default function Payments({ showTable = true }) {

//   const [data,setData] = useState([]);
//   const [fromDate,setFromDate] = useState("");
//   const [toDate,setToDate] = useState("");

//   useEffect(()=>{
//     fetchPayments();
//   },[]);

//   const fetchPayments = async ()=>{

//     try{

//       const res = await fetch(`${API}/daily/all`);

//       if(!res.ok){
//         throw new Error("API Error");
//       }

//       const result = await res.json();

//       setData(result);

//     }catch(err){

//       console.error("Fetch error:",err);

//     }

//   };


//   /* DATE FILTER */

//   const filteredData = useMemo(()=>{

//     if(!fromDate || !toDate) return data;

//     return data.filter(d => d.date >= fromDate && d.date <= toDate);

//   },[data,fromDate,toDate]);


//   /* TOTAL CALCULATION */

//   const totals = useMemo(()=>{

//     let cash = 0;
//     let upi = 0;

//     filteredData.forEach(day =>{

//       (day.clients || []).forEach(c=>{

//         if(c.paymentMode === "Cash"){
//           cash += Number(c.amount);
//         }

//         if(c.paymentMode === "UPI"){
//           upi += Number(c.amount);
//         }

//       });

//     });

//     return {
//       cash,
//       upi,
//       total: cash + upi
//     };

//   },[filteredData]);


//   /* PDF */

//   const downloadPDF = ()=>{

//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("VS Salon Payment Report",14,20);

//     doc.setFontSize(12);
//     doc.text(`Cash : Rs ${totals.cash}`,14,40);
//     doc.text(`UPI : Rs ${totals.upi}`,14,48);
//     doc.text(`Total : Rs ${totals.total}`,14,56);

//     const tableData = [];

//     filteredData.forEach(day =>{

//       (day.clients || []).forEach(c=>{

//         tableData.push([
//           day.date,
//           c.name,
//           c.paymentMode,
//           c.amount
//         ]);

//       });

//     });

//     autoTable(doc,{
//       startY:70,
//       head:[["Date","Client","Mode","Amount"]],
//       body:tableData
//     });

//     doc.save("Payment_Report.pdf");

//   };

//   return(

//     <div className="p-6 text-white">

//       <h2 className="text-2xl font-bold text-yellow-500 mb-6">
//         Monthly Payments
//       </h2>

//       {/* FILTER */}

//       <div className="flex flex-wrap gap-4 mb-6">

//         <input
//         type="date"
//         value={fromDate}
//         onChange={(e)=>setFromDate(e.target.value)}
//         className="bg-zinc-800 p-2 rounded"
//         />

//         <input
//         type="date"
//         value={toDate}
//         onChange={(e)=>setToDate(e.target.value)}
//         className="bg-zinc-800 p-2 rounded"
//         />

//         <button
//         onClick={downloadPDF}
//         className="bg-purple-500 px-4 py-2 rounded"
//         >
//         Download PDF
//         </button>

//       </div>


//       {/* SUMMARY */}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

//         <div className="bg-zinc-800 p-4 rounded text-green-400 font-semibold">
//           Cash : Rs {totals.cash}
//         </div>

//         <div className="bg-zinc-800 p-4 rounded text-blue-400 font-semibold">
//           UPI : Rs {totals.upi}
//         </div>

//         <div className="bg-zinc-800 p-4 rounded text-yellow-400 font-semibold">
//           Total : Rs {totals.total}
//         </div>

//       </div>


//       {/* TABLE */}

//       {showTable && (

//       <table className="w-full text-center border border-zinc-700">

//         <thead className="bg-zinc-800">

//           <tr>
//             <th className="p-2 border">Date</th>
//             <th className="p-2 border">Clients</th>
//             <th className="p-2 border">Cash</th>
//             <th className="p-2 border">UPI</th>
//             <th className="p-2 border">Total</th>
//           </tr>

//         </thead>

//         <tbody>

//         {filteredData.map((day,i)=>{

//           let cash = 0;
//           let upi = 0;

//           (day.clients || []).forEach(c=>{

//             if(c.paymentMode === "Cash"){
//               cash += Number(c.amount);
//             }

//             if(c.paymentMode === "UPI"){
//               upi += Number(c.amount);
//             }

//           });

//           const total = cash + upi;

//           return(

//             <tr key={i}>

//               <td className="border p-2">{day.date}</td>

//               <td className="border p-2">
//                 {(day.clients || []).length}
//               </td>

//               <td className="border p-2 text-green-400">
//                 {cash}
//               </td>

//               <td className="border p-2 text-blue-400">
//                 {upi}
//               </td>

//               <td className="border p-2 text-yellow-400">
//                 {total}
//               </td>

//             </tr>

//           );

//         })}

//         </tbody>

//       </table>

//       )}

//     </div>

//   );

// }

import { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import API from "../config/api";

export default function Payments({ showTable = true }) {

  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {

      const res = await fetch(`${API}/api/daily/all`); // ✅ FIXED URL

      if (!res.ok) {
        throw new Error("API Error");
      }

      const result = await res.json();

      console.log("API RESPONSE 👉", result); // 🔍 DEBUG

      // ✅ FIX: handle object response
      setData(result.data || []);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  /* DATE FILTER */

  const filteredData = useMemo(() => {

    if (!fromDate || !toDate) return data;

    return data.filter(d => d.date >= fromDate && d.date <= toDate);

  }, [data, fromDate, toDate]);

  /* TOTAL CALCULATION */

  const totals = useMemo(() => {

    let cash = 0;
    let upi = 0;

    filteredData.forEach(day => {

      (day.clients || []).forEach(c => {

        if (c.paymentMode === "Cash") {
          cash += Number(c.amount || 0);
        }

        if (c.paymentMode === "UPI") {
          upi += Number(c.amount || 0);
        }

      });

    });

    return {
      cash,
      upi,
      total: cash + upi
    };

  }, [filteredData]);

  /* PDF */

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("VS Salon Payment Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Cash : Rs ${totals.cash}`, 14, 40);
    doc.text(`UPI : Rs ${totals.upi}`, 14, 48);
    doc.text(`Total : Rs ${totals.total}`, 14, 56);

    const tableData = [];

    filteredData.forEach(day => {

      (day.clients || []).forEach(c => {

        tableData.push([
          day.date,
          c.name,
          c.paymentMode,
          c.amount
        ]);

      });

    });

    autoTable(doc, {
      startY: 70,
      head: [["Date", "Client", "Mode", "Amount"]],
      body: tableData
    });

    doc.save("Payment_Report.pdf");
  };

  return (

    <div className="p-6 text-white">

      <h2 className="text-2xl font-bold text-yellow-500 mb-6">
        Monthly Payments
      </h2>

      {/* FILTER */}

      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="bg-zinc-800 p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="bg-zinc-800 p-2 rounded"
        />

        <button
          onClick={downloadPDF}
          className="bg-purple-500 px-4 py-2 rounded"
        >
          Download PDF
        </button>

      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        <div className="bg-zinc-800 p-4 rounded text-green-400 font-semibold">
          Cash : Rs {totals.cash}
        </div>

        <div className="bg-zinc-800 p-4 rounded text-blue-400 font-semibold">
          UPI : Rs {totals.upi}
        </div>

        <div className="bg-zinc-800 p-4 rounded text-yellow-400 font-semibold">
          Total : Rs {totals.total}
        </div>

      </div>

      {/* TABLE */}

      {showTable && (

        <table className="w-full text-center border border-zinc-700">

          <thead className="bg-zinc-800">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Clients</th>
              <th className="p-2 border">Cash</th>
              <th className="p-2 border">UPI</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>

          <tbody>

            {filteredData.map((day, i) => {

              let cash = 0;
              let upi = 0;

              (day.clients || []).forEach(c => {

                if (c.paymentMode === "Cash") {
                  cash += Number(c.amount || 0);
                }

                if (c.paymentMode === "UPI") {
                  upi += Number(c.amount || 0);
                }

              });

              const total = cash + upi;

              return (
                <tr key={i}>
                  <td className="border p-2">{day.date}</td>

                  <td className="border p-2">
                    {(day.clients || []).length}
                  </td>

                  <td className="border p-2 text-green-400">
                    {cash}
                  </td>

                  <td className="border p-2 text-blue-400">
                    {upi}
                  </td>

                  <td className="border p-2 text-yellow-400">
                    {total}
                  </td>
                </tr>
              );

            })}

          </tbody>

        </table>

      )}

    </div>

  );
}