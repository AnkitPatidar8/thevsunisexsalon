import { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import API from "../config/api";


export default function Calculation() {
  const [date, setDate] = useState("");
  const [dayName, setDayName] = useState("");
  const [openingAmount, setOpeningAmount] = useState("");
  const [closingAmount, setClosingAmount] = useState("");
  const [clients, setClients] = useState([]);

  const [clientName, setClientName] = useState("");
  const [employee, setEmployee] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [amount, setAmount] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const employeesList = [
    "Yash",
    "Shubham",
    "Ankit",
    "Vishal",
    "Anjali",
    "Lokesh",
  ];

 useEffect(() => {
  if (!date) return;

  fetch(`${API}/api/expense/${date}`)
    .then(res => res.json())
    .then(data => {
      setExpenses(data || []);
    })
    .catch(err => console.error("Expense Fetch Error:", err));
}, [date]);
 
  /* Auto Today Date */
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  /* Update Day */
  useEffect(() => {
    if (!date) return;
    const selectedDate = new Date(date);
    const options = { weekday: "long" };
    const day = selectedDate.toLocaleDateString("en-US", options);
    setDayName(day);
  }, [date]);

  /* Fetch Data */
  useEffect(() => {
    if (!date) return;

    fetch(`${API}/api/daily/${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setOpeningAmount(data.openingAmount || "");
          setClosingAmount(data.closingAmount || "");
          setClients(data.clients || []);
        } else {
          setOpeningAmount("");
          setClosingAmount("");
          setClients([]);
        }
      });
  }, [date]);

  /* Sync DB */
  const syncToDB = async (updatedClients) => {
    await fetch(`${API}/daily`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        openingAmount: Number(openingAmount) || 0,
        closingAmount: Number(closingAmount) || 0,
        clients: updatedClients,
      }),
    });
  };

  /* Add / Edit */
  const addClient = async () => {
    if (!clientName || !employee || !amount) {
       Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill all fields!",
    });
      return;
      
    }

    let updated;

    if (editIndex !== null) {
      updated = [...clients];
      updated[editIndex] = {
        ...updated[editIndex],
        name: clientName,
        employee,
        paymentMode,
        amount: Number(amount),
      };
      setEditIndex(null);
    } else {
      const newClient = {
        name: clientName,
        employee,
        time: new Date().toLocaleTimeString(),
        paymentMode,
        amount: Number(amount),
      };
      updated = [...clients, newClient];
    }

    setClients(updated);
    await syncToDB(updated);

    setClientName("");
    setEmployee("");
    setAmount("");
  };

  const deleteClient = async (index) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This client will be permanently deleted!",
      theme: "dark",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
    });

    if (result.isConfirmed) {
      const updated = [...clients];
      updated.splice(index, 1);
      setClients(updated);

      await syncToDB(updated);

      Swal.fire({
        title: "Deleted!",
        text: "Client has been removed successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        theme: "dark",
      });
    }
  };

  

  const editClient = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to edit this client?",
      icon: "question",
      theme: "dark",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const c = clients[index];
        setClientName(c.name);
        setEmployee(c.employee);
        setPaymentMode(c.paymentMode);
        setAmount(c.amount);
        setEditIndex(index);

        Swal.fire({
          title: "Edit Mode Activated!",
          text: "Now you can update client details.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          theme: "dark",
        });
      }
    });
  };

  /* Employee Wise Data */
  const employeeData = useMemo(() => {
    return employeesList.map((emp) => {
      const empClients = clients
        .map((c, index) => ({ ...c, originalIndex: index }))
        .filter((c) => c.employee === emp);

      const totalAmount = empClients.reduce(
        (sum, c) => sum + Number(c.amount),
        0,
      );

      return {
        name: emp,
        clients: empClients,
        totalWork: empClients.length,
        totalAmount,
      };
    });
  }, [clients]);

  /* Totals */
  const totalAmountAll = clients.reduce((sum, c) => sum + Number(c.amount), 0);

  const totalCash = clients
    .filter((c) => c.paymentMode === "Cash")
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const totalUPI = clients
    .filter((c) => c.paymentMode === "UPI")
    .reduce((sum, c) => sum + Number(c.amount), 0);

  /* Top Performer */
  const topPerformer = employeeData.reduce(
    (top, emp) => (emp.totalAmount > (top?.totalAmount || 0) ? emp : top),
    null,
  );

  /* PDF Download */
  const downloadPDF = () => {
    const doc = new jsPDF({
    encryption: {
      userPassword: "1234",     // PDF open password
      ownerPassword: "admin123", // admin password
      userPermissions: ["print", "copy"]
    }
  });

    

    /* ===== COLORS ===== */
    const purple = [88, 80, 236];
    const green = [34, 197, 94];
    const blue = [59, 130, 246];
    const orange = [249, 115, 22];
    const gray = [107, 114, 128];

    /* ===== LOGO (TOP RIGHT) ===== */
    doc.addImage("/images/lg.png", "PNG", 160, 8, 40, 40);

    /* ===== TITLE (CENTER + BOLD) ===== */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...purple);
    doc.text("THE VS UNISEX SALON", 105, 18, { align: "center" });

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text("Daily Report", 105, 26, { align: "center" });

    /* ===== DATE & DAY ===== */
    doc.setFontSize(16);
    doc.setTextColor(...gray);
    doc.text(`Date: ${date}`, 14, 36);
    doc.text(`Day: ${dayName}`, 14, 42);

    /* ===== OPENING / CLOSING ===== */
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Opening Amount: Rs. ${openingAmount}`, 14, 52);
    doc.text(`Closing Amount: Rs. ${closingAmount}`, 14, 60);

    /* ===== SUMMARY BOXES ===== */
    doc.setFillColor(...green);
    doc.roundedRect(14, 68, 40, 14, 3, 3, "F");

    doc.setFillColor(...blue);
    doc.roundedRect(58, 68, 40, 14, 3, 3, "F");

    doc.setFillColor(...orange);
    doc.roundedRect(102, 68, 40, 14, 3, 3, "F");

    doc.setFillColor(234, 179, 8); // Yellow
    doc.roundedRect(146, 68, 40, 14, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`Cash`, 18, 75);
    doc.text(`Rs. ${totalCash}`, 18, 80);

    doc.text(`UPI`, 62, 75);
    doc.text(`Rs. ${totalUPI}`, 62, 80);

    doc.text(`Total Amt`, 106, 75);
    doc.text(`Rs. ${totalAmountAll}`, 106, 80);

    doc.text(`Clients`, 150, 75);
    doc.text(`${clients.length}`, 150, 80);

    /* ===== EMPLOYEE TABLE ===== */
    autoTable(doc, {
      startY: 90,
      head: [["Employee", "Total Work", "Total Amount"]],
      body: employeeData.map((e) => [
        e.name,
        e.totalWork,
        `Rs. ${e.totalAmount}`,
      ]),
      headStyles: {
        fillColor: purple,
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        halign: "center",
        fontSize: 11,
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
    });

    /* ===== FOOTER ===== */
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text(
      "Generated by VS Salon Management System",
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" },
    );

    doc.save(`Daily_Report_${date}.pdf`);
  };
  return (
    <div className="p-6 text-white max-w-7xl mx-auto relative">
      <div className="absolute top-6 right-6 text-yellow-400 font-bold text-lg">
        {dayName}
      </div>

      <h2 className="text-2xl font-bold text-yellow-500 mb-6">
        Daily Business
      </h2>

      {/* Date Section */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 bg-zinc-800 rounded"
        />
        <input
          type="number"
          placeholder="Opening Amount"
          value={openingAmount}
          onChange={(e) => setOpeningAmount(e.target.value)}
          className="p-2 bg-zinc-800 rounded"
        />
        <input
          type="number"
          placeholder="Closing Amount"
          value={closingAmount}
          onChange={(e) => setClosingAmount(e.target.value)}
          className="p-2 bg-zinc-800 rounded"
        />
      </div>

      <div><h1 className="text-center m-4 p-4 text-2xl  font-bold text-yellow-500 ">Daily Client Entry </h1></div>

      {/* Client Entry */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="p-2 bg-zinc-800 rounded"
        />

        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="p-2 bg-zinc-800 rounded"
        >
          <option value="">Select Employee</option>
          {employeesList.map((emp, i) => (
            <option key={i}>{emp}</option>
          ))}
        </select>

        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="p-2 bg-zinc-800 rounded"
        >
          <option>Cash</option>
          <option>UPI</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 bg-zinc-800 rounded"
        />

        <button
          onClick={addClient}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold rounded"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Overall Summary */}
      <div className="bg-zinc-800 p-4 rounded flex justify-between items-center mb-6">
        <div>Total Clients: {clients.length}</div>

        <div className="text-center">
          <div className="text-green-400 font-semibold">
            Total Cash: Rs. {totalCash}
          </div>
          <div className="text-blue-400 font-semibold">
            Total UPI: Rs. {totalUPI}
          </div>
        </div>

        <div>Total Busines: Rs. {totalAmountAll}</div>
      </div>

      {/* PDF Button */}
      <div className="text-center mb-10">
        <button
          onClick={downloadPDF}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded font-semibold"
        >
          Download PDF Report
        </button>
      </div>

      {/* Employee Tables */}
      {employeeData.map((emp, index) => (
        <div key={index} className="mb-10">
          <h3
            className={`text-xl font-bold mb-3 ${
              topPerformer?.name === emp.name
                ? "text-green-400 animate-pulse"
                : "text-yellow-400"
            }`}
          >
            {emp.name} Report
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border border-zinc-700 text-center">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="p-2 border">Client</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">Mode</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {emp.clients.map((c, i) => (
                  <tr key={i}>
                    <td className="border p-2">{c.name}</td>
                    <td className="border p-2">{c.time}</td>
                    <td className="border p-2">{c.paymentMode}</td>
                    <td className="border p-2">{c.amount}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => editClient(c.originalIndex)}
                        className="bg-blue-500 px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteClient(c.originalIndex)}
                        className="bg-red-500 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-800 p-3 mt-2 rounded flex justify-between">
            <div>Total Work: {emp.totalWork}</div>
            <div>Total Amount: Rs. {emp.totalAmount}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
