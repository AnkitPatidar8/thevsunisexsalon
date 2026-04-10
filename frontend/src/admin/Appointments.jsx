
// import { useEffect, useState, useMemo } from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import API from "../config/api";


// export default function Appointments() {

//   const [appointments,setAppointments] = useState([]);
//   const [searchMobile,setSearchMobile] = useState("");
//   const [selectedDate,setSelectedDate] = useState("");

//   useEffect(()=>{
//     fetch(`${API}/appointments`)
//       .then(res=>res.json())
//       .then(data=>{
//         setAppointments(data);
//       })
//       .catch(err=>{
//         console.log(err);
//       });
//   },[]);

//   /* FILTER */

//   const filtered = useMemo(()=>{

//     let data = appointments;

//     if(searchMobile){
//       data = data.filter(item =>
//         item.mobile && item.mobile.toString().includes(searchMobile)
//       );
//     }

//     if(selectedDate){
//       data = data.filter(item => item.date === selectedDate);
//     }

//     return data;

//   },[appointments,searchMobile,selectedDate]);


//   /* PDF */

//   const downloadPDF = ()=>{

//     const doc = new jsPDF();

//     doc.addImage("/images/lg.png","PNG",160,8,40,40);

//     doc.setFont("helvetica","bold");
//     doc.setFontSize(18);
//     doc.text("THE VS UNISEX SALON",105,12,{align:"center"});

//     doc.setFontSize(12);
//     doc.text(`Appointments Report`,14,35);
//     doc.text(`Date: ${selectedDate || "All"}`,14,42);

//     const tableData = filtered.map(item=>[
//       item.name,
//       item.mobile,
//       item.service,
//       item.stylist,
//       item.date,
//       item.time
//     ]);

//     autoTable(doc,{
//       startY:50,
//       head:[["Name","Mobile","Service","Stylist","Date","Time"]],
//       body:tableData
//     });

//     doc.save(`appointments-${selectedDate || "all"}.pdf`);

//   };


//   return(

//     <div className="p-6 text-white">

//       <h2 className="text-2xl font-bold text-yellow-500 mb-6">
//         Appointments
//       </h2>


//       {/* FILTERS */}

//       <div className="flex flex-col sm:flex-row gap-4 mb-6">

//         <input
//         type="text"
//         placeholder="Search Mobile"
//         value={searchMobile}
//         onChange={(e)=>setSearchMobile(e.target.value)}
//         className="bg-zinc-800 p-2 rounded border border-zinc-700 w-full sm:w-auto"
//         />

//         <input
//         type="date"
//         value={selectedDate}
//         onChange={(e)=>setSelectedDate(e.target.value)}
//         className="bg-zinc-800 p-2 rounded border border-zinc-700 w-full sm:w-auto"
//         />

//         <button
//         onClick={downloadPDF}
//         className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold"
//         >
//         Download PDF
//         </button>

//       </div>


//       {/* SUMMARY */}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

//         <div className="bg-zinc-800 p-4 rounded text-center">
//           Total Appointments
//           <p className="text-yellow-400 text-xl font-bold">
//             {filtered.length}
//           </p>
//         </div>

//         <div className="bg-zinc-800 p-4 rounded text-center">
//           Today
//           <p className="text-green-400 text-xl font-bold">
//             {
//               filtered.filter(
//                 a => a.date === new Date().toISOString().slice(0,10)
//               ).length
//             }
//           </p>
//         </div>

//         <div className="bg-zinc-800 p-4 rounded text-center">
//           Stylists
//           <p className="text-blue-400 text-xl font-bold">
//             {[...new Set(filtered.map(a=>a.stylist))].length}
//           </p>
//         </div>

//       </div>


//       {/* MOBILE CARDS */}

//       <div className="grid gap-4 md:hidden">

//         {filtered.map(item=>(
//           <div
//           key={item._id}
//           className="bg-zinc-800 p-4 rounded-lg border border-zinc-700"
//           >

//             <p className="font-bold text-lg">
//               {item.name}
//             </p>

//             <p className="text-gray-400 text-sm">
//               {item.mobile}
//             </p>

//             <p className="mt-2">
//               <span className="text-gray-400">Service:</span> {item.service}
//             </p>

//             <p>
//               <span className="text-gray-400">Stylist:</span> {item.stylist}
//             </p>

//             <p>
//               <span className="text-gray-400">Date:</span> {item.date}
//             </p>

//             <p>
//               <span className="text-gray-400">Time:</span> {item.time}
//             </p>

//           </div>
//         ))}

//       </div>


//       {/* DESKTOP TABLE */}

//       <div className="hidden md:block overflow-x-auto">

//         <table className="w-full text-center border border-zinc-700">

//           <thead className="bg-zinc-800">

//             <tr>
//               <th className="p-3 border">Name</th>
//               <th className="p-3 border">Mobile</th>
//               <th className="p-3 border">Service</th>
//               <th className="p-3 border">Stylist</th>
//               <th className="p-3 border">Date</th>
//               <th className="p-3 border">Time</th>
//             </tr>

//           </thead>

//           <tbody>

//           {filtered.map(item=>(
//             <tr
//             key={item._id}
//             className="border-t border-zinc-700 hover:bg-zinc-800"
//             >

//               <td className="p-3 border">{item.name}</td>
//               <td className="p-3 border">{item.mobile}</td>
//               <td className="p-3 border">{item.service}</td>
//               <td className="p-3 border">{item.stylist}</td>
//               <td className="p-3 border">{item.date}</td>
//               <td className="p-3 border">{item.time}</td>

//             </tr>
//           ))}

//           </tbody>

//         </table>

//       </div>

//     </div>

//   );

// }


import { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import API from "../config/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchMobile, setSearchMobile] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // ✅ FETCH FIXED
  useEffect(() => {
    fetch(`${API}/api/appointments`)
      .then((res) => res.json())
      .then((result) => {
        console.log("APPOINTMENTS API 👉", result);

        // ✅ HANDLE BOTH ARRAY & OBJECT RESPONSE
        const data = Array.isArray(result) ? result : result.data || [];

        setAppointments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* ✅ SAFE FILTER */
  const filtered = useMemo(() => {
    let data = Array.isArray(appointments) ? appointments : [];

    if (searchMobile) {
      data = data.filter(
        (item) =>
          item.mobile &&
          item.mobile.toString().includes(searchMobile)
      );
    }

    if (selectedDate) {
      data = data.filter((item) => item.date === selectedDate);
    }

    return data;
  }, [appointments, searchMobile, selectedDate]);

  /* PDF */
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.addImage("/images/lg.png", "PNG", 160, 8, 40, 40);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("THE VS UNISEX SALON", 105, 12, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Appointments Report`, 14, 35);
    doc.text(`Date: ${selectedDate || "All"}`, 14, 42);

    const tableData = filtered.map((item) => [
      item.name,
      item.mobile,
      item.service,
      item.stylist,
      item.date,
      item.time,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["Name", "Mobile", "Service", "Stylist", "Date", "Time"]],
      body: tableData,
    });

    doc.save(`appointments-${selectedDate || "all"}.pdf`);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold text-yellow-500 mb-6">
        Appointments
      </h2>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Mobile"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
          className="bg-zinc-800 p-2 rounded border border-zinc-700 w-full sm:w-auto"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-zinc-800 p-2 rounded border border-zinc-700 w-full sm:w-auto"
        />

        <button
          onClick={downloadPDF}
          className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold"
        >
          Download PDF
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-800 p-4 rounded text-center">
          Total Appointments
          <p className="text-yellow-400 text-xl font-bold">
            {filtered.length}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded text-center">
          Today
          <p className="text-green-400 text-xl font-bold">
            {
              filtered.filter(
                (a) =>
                  a.date === new Date().toISOString().slice(0, 10)
              ).length
            }
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded text-center">
          Stylists
          <p className="text-blue-400 text-xl font-bold">
            {[...new Set(filtered.map((a) => a.stylist))].length}
          </p>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="grid gap-4 md:hidden">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="bg-zinc-800 p-4 rounded-lg border border-zinc-700"
          >
            <p className="font-bold text-lg">{item.name}</p>

            <p className="text-gray-400 text-sm">{item.mobile}</p>

            <p className="mt-2">
              <span className="text-gray-400">Service:</span>{" "}
              {item.service}
            </p>

            <p>
              <span className="text-gray-400">Stylist:</span>{" "}
              {item.stylist}
            </p>

            <p>
              <span className="text-gray-400">Date:</span> {item.date}
            </p>

            <p>
              <span className="text-gray-400">Time:</span> {item.time}
            </p>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-center border border-zinc-700">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Service</th>
              <th className="p-3 border">Stylist</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr
                key={item._id}
                className="border-t border-zinc-700 hover:bg-zinc-800"
              >
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.mobile}</td>
                <td className="p-3 border">{item.service}</td>
                <td className="p-3 border">{item.stylist}</td>
                <td className="p-3 border">{item.date}</td>
                <td className="p-3 border">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}