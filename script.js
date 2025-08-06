 const images = document.querySelectorAll('.animateImg');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-x-[-200px]');
        entry.target.classList.add('opacity-100', 'translate-x-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => observer.observe(img));


  
 document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const statusDiv = document.getElementById("formStatus");
    statusDiv.textContent = "Sending...";

    const formData = new FormData(this);
    formData.append("access_key", "af23bcc5-59ef-49a2-babd-fd73a0a8276c");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        statusDiv.textContent = "Form Submitted Successfully!";
        this.reset();
      } else {
        statusDiv.textContent = "Error: " + data.message;
        console.error("Submission failed:", data);
      }
    } catch (error) {
      statusDiv.textContent = "Network Error. Please try again.";
      console.error("Fetch error:", error);
    }
  });
});
