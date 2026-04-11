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
    "summit",
  ];

 useEffect(() => {
  if (!date) return;

  fetch(`${API}/api/expense/${date}`)
    .then(res => res.json())
    .then(data => {
      setExpenses(data.expenses || []);
      console.log(data);
    })
    .catch(err => console.error("Expense Fetch Error:", err));
}, [date]);

   const totalExpense = expenses.reduce(
  (sum, e) => sum + Number(e.amount),
  0
);
 
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
    await fetch(`${API}/api/daily`, {
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
      userPassword: "1234",
      ownerPassword: "admin123",
      userPermissions: ["print", "copy"],
    },
  });

  /* ===== COLORS ===== */
  const purple = [88, 80, 236];
  const green = [34, 197, 94];
  const blue = [59, 130, 246];
  const orange = [249, 115, 22];
  const yellow = [234, 179, 8];
  const red = [239, 68, 68];
  const gray = [107, 114, 128];

  /* ===== LOGO ===== */
  doc.addImage("/images/lg.png", "PNG", 160, 8, 40, 40);

  /* ===== TITLE ===== */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...purple);
  doc.text("THE VS UNISEX SALON", 105, 18, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(0, 0, 0);
  doc.text("Daily Report", 105, 26, { align: "center" });

  /* ===== DATE ===== */
  doc.setFontSize(12);
  doc.setTextColor(...gray);
  doc.text(`Date: ${date}`, 14, 36);
  doc.text(`Day: ${dayName}`, 14, 42);

  /* ===== OPENING / CLOSING ===== */
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(`Opening Amount: Rs. ${openingAmount}`, 14, 52);
  doc.text(`Closing Amount: Rs. ${closingAmount}`, 14, 60);

  /* ===== SUMMARY BOXES ===== */
  const startX = 10;
  const boxWidth = 35;
  const gap = 5;
  const y = 68;

  const boxes = [
    { label: "Cash", value: totalCash, color: green },
    { label: "UPI", value: totalUPI, color: blue },
    { label: "Total", value: totalAmountAll, color: orange },
    { label: "Clients", value: clients.length, color: yellow },
    { label: "Expense", value: totalExpense, color: red },
  ];

  boxes.forEach((box, i) => {
    const x = startX + i * (boxWidth + gap);

    // box background
    doc.setFillColor(...box.color);
    doc.roundedRect(x, y, boxWidth, 14, 3, 3, "F");

    // text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);

    doc.text(box.label, x + boxWidth / 2, y + 5, {
      align: "center",
    });

    doc.text(`Rs. ${box.value}`, x + boxWidth / 2, y + 10, {
      align: "center",
    });
  });

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
    { align: "center" }
  );

  doc.save(`Daily_Report_${date}.pdf`);
};
  
  return (
  <div className="p-4 md:p-6 text-white max-w-7xl mx-auto">

    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl md:text-2xl font-bold text-yellow-400">
        Daily Business
      </h2>
      <span className="text-sm md:text-lg text-yellow-300 font-semibold">
        {dayName}
      </span>
    </div>

    {/* Date + Opening/Closing */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Opening Amount"
        value={openingAmount}
        onChange={(e) => setOpeningAmount(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Closing Amount"
        value={closingAmount}
        onChange={(e) => setClosingAmount(e.target.value)}
        className="input"
      />
    </div>

    {/* Client Entry */}
    <div className="bg-zinc-900 p-4 rounded-xl mb-6 shadow-lg">
      <h3 className="text-lg font-semibold text-yellow-400 mb-3">
        Add Client
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="input"
        />

        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="input"
        >
          <option value="">Select Employee</option>
          {employeesList.map((emp, i) => (
            <option key={i}>{emp}</option>
          ))}
        </select>

        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="input"
        >
          <option>Cash</option>
          <option>UPI</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />

        <button
          onClick={addClient}
          className="bg-green-500 hover:bg-green-600 rounded-lg font-semibold py-2"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div className="card bg-yellow-500 text-black">
        <p>Clients</p>
        <h2>{clients.length}</h2>
      </div>
      <div className="card bg-green-500">
        <p>Cash</p>
        <h2>₹ {totalCash}</h2>
      </div>
      <div className="card bg-blue-500">
        <p>UPI</p>
        <h2>₹ {totalUPI}</h2>
      </div>
       <div className="card bg-red-500">
    <p>Expense</p>
    <h2>₹ {totalExpense}</h2>
  </div>
      <div className="card bg-purple-500">
        <p>Total</p>
        <h2>₹ {totalAmountAll}</h2>
      </div>
    </div>

    {/* PDF Button */}
    <div className="text-center mb-8">
      <button
        onClick={downloadPDF}
        className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold"
      >
        Download Report
      </button>
    </div>

    {/* Employee Cards */}
    {employeeData.map((emp, index) => (
      <div key={index} className="mb-6">
        <h3
          className={`text-lg font-bold mb-2 ${
            topPerformer?.name === emp.name
              ? "text-green-400"
              : "text-yellow-400"
          }`}
        >
          {emp.name}
        </h3>

        {/* Mobile Card View */}
        <div className="space-y-3">
          {emp.clients.map((c, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-3 rounded-lg shadow flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{c.name}</span>
                <span className="text-sm text-gray-400">{c.time}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>{c.paymentMode}</span>
                <span className="font-bold">₹ {c.amount}</span>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => editClient(c.originalIndex)}
                  className="flex-1 bg-blue-500 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteClient(c.originalIndex)}
                  className="flex-1 bg-red-500 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="bg-zinc-800 p-3 mt-3 rounded flex justify-between text-sm">
          <span>Work: {emp.totalWork}</span>
          <span>₹ {emp.totalAmount}</span>
        </div>
      </div>
    ))}
  </div>
);
}
