const API_BASE_URL = "https://portfolio-backend-7au5.onrender.com";

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const website = document.getElementById("website").value.trim();

  resetStatus();

  if (!name || !email || !message) {
    showStatus("Please fill all fields", "error");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message, website })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      showStatus("Message sent successfully!", "success");
      form.reset();
    } else {
      showStatus(result.error || "Something went wrong", "error");
    }

  } catch (error) {
    showStatus("Cannot connect to server", "error");
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  submitBtn.textContent = isLoading ? "Sending..." : "Send Message";
  submitBtn.disabled = isLoading;
}

function showStatus(message, type) {
  statusText.textContent = message;
  statusText.className = `form-status ${type}`;
  statusText.style.display = "block";
  setTimeout(() => (statusText.style.display = "none"), 4000);
}

function resetStatus() {
  statusText.style.display = "none";
  statusText.className = "form-status";
}
