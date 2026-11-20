// Reusable Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// View Match Details Function (from index.html)
function showMatch() {
    const matchSelect = document.getElementById("match");
    const display = document.getElementById("matchDetails");

    if (matchSelect && matchSelect.value) {
        display.textContent = "Selected: " + matchSelect.value;
        showToast("Viewing details for " + matchSelect.value);
    } else if (display) {
        display.textContent = "Please choose a match first.";
        showToast("Please select a match from the dropdown.");
    }
}

// Smooth Scroll from Match Schedule "Book" Button to Booking Form
function bookMatchFromSchedule(matchName) {
    const bookingSection = document.getElementById("booking");
    const matchDropdown = document.getElementById("match");

    if (matchDropdown && matchName) {
        matchDropdown.value = matchName;
    }

    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
    }

    showToast("Selected " + matchName + " — complete your booking below!");
}

// Initialize Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    const scheduleBookButtons = document.querySelectorAll(".schedule-book-btn");

    scheduleBookButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const matchName = button.getAttribute("data-match");
            bookMatchFromSchedule(matchName);
        });
    });

    const forms = document.querySelectorAll("#homeBookingForm, #bookingPageForm");
    forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            showToast("Tickets booked successfully! Confirmation sent.");
        });
    });
});