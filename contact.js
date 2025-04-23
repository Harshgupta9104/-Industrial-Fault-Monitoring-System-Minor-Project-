function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById("themeIcon");
    const lightSheet = document.getElementById("themeStylesheet");
    const darkSheet = document.getElementById("darkThemeStylesheet");
  
    const isDark = body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme", !isDark);
  
    lightSheet.disabled = isDark;
    darkSheet.disabled = !isDark;
  
    icon?.classList.toggle("fa-sun", !isDark);
    icon?.classList.toggle("fa-moon", isDark);
  
    localStorage.setItem("theme", isDark ? "dark" : "light");
  
    document.querySelector(".theme-toggle").classList.add("spin");
    setTimeout(() => {
      document.querySelector(".theme-toggle").classList.remove("spin");
    }, 500);
  }
  
  // 🌓 Load theme on page load
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const icon = document.getElementById("themeIcon");
    const lightSheet = document.getElementById("themeStylesheet");
    const darkSheet = document.getElementById("darkThemeStylesheet");
  
    const isDark = savedTheme === "dark";
    document.body.classList.toggle("dark-theme", isDark);
    document.body.classList.toggle("light-theme", !isDark);
    lightSheet.disabled = isDark;
    darkSheet.disabled = !isDark;
  
    icon?.classList.toggle("fa-sun", !isDark);
    icon?.classList.toggle("fa-moon", isDark);
  });
  