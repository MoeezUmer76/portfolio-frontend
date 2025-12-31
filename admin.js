const API_BASE_URL = "https://portfolio-backend-7au5.onrender.com";

/* ===== LOGIN PAGE ===== */
if (document.getElementById("loginForm")) {
  const loginForm = document.getElementById("loginForm");
  const statusText = document.getElementById("loginStatus");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("adminAuth", btoa(`${username}:${password}`));
    window.location.href = "admin.html";
  });
}

/* ===== ADMIN PANEL ===== */
if (document.getElementById("messagesTable")) {

  const auth = localStorage.getItem("adminAuth");
  if (!auth) {
    window.location.href = "admin-login.html";
  }

  const tableBody = document.querySelector("#messagesTable tbody");
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "admin-login.html";
  });

  async function loadMessages() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        headers: {
          "Authorization": `Basic ${auth}`
        }
      });

      if (!response.ok) throw new Error("Unauthorized");

      const messages = await response.json();
      tableBody.innerHTML = "";

      messages.forEach(msg => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.message}</td>
          <td>${new Date(msg.createdAt).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
      });

    } catch (err) {
      tableBody.innerHTML =
        `<tr><td colspan="4">Failed to load messages</td></tr>`;
    }
  }

  loadMessages();
}
