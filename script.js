document.addEventListener("DOMContentLoaded", () => {

  /* =================================
     Sticky Navbar
  ================================= */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 20);
  });

  /* =================================
     Fade Animation
  ================================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show-element");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".card,.fleet-box,.price-card,.booking-form,.stats div,.section-title")
    .forEach((item) => {
      item.classList.add("hidden-element");
      observer.observe(item);
    });

  /* =================================
     Smooth Navigation
  ================================= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* =================================
     الحجز عبر نافذة صامتة (Popup)
     رقم الواتساب: +218917021437
  ================================= */
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const inputs = bookingForm.querySelectorAll("input");
      const name = inputs[0].value.trim();
      const phone = inputs[1].value.trim();
      const from = inputs[2].value.trim();
      const to = inputs[3].value.trim();

      if (!name || !phone || !from || !to) {
        alert("يرجى تعبئة جميع الحقول المطلوبة.");
        return;
      }

      // رسالة واتساب منسقة
      const message = [
        "🚖 *حجز جديد*",
        "",
        "👤 الاسم: " + name,
        "📞 الهاتف: " + phone,
        "📍 الانطلاق: " + from,
        "🏁 الوجهة: " + to,
        "",
        "تم الإرسال عبر نهضة ليبيا"
      ].join("%0A"); // سطر جديد في رابط URL

      const whatsappNumber = "218917021437";
      const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      // فتح نافذة صغيرة مخفية
      const popup = window.open(waLink, "_blank", "width=400,height=600,left=100,top=100");

      // إظهار رسالة نجاح
      alert("✅ تم إرسال حجزك بنجاح! سنتواصل معك قريباً.");
      bookingForm.reset();

      // محاولة إغلاق النافذة بعد 1.5 ثانية
      if (popup) {
        setTimeout(() => {
          popup.close();
        }, 1500);
      }
    });
  }

  /* =================================
     Mouse Glow Effect
  ================================= */
  const glow = document.createElement("div");
  Object.assign(glow.style, {
    position: "fixed",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    pointerEvents: "none",
    filter: "blur(80px)",
    opacity: ".15",
    background: "radial-gradient(circle,#44d8ff,transparent 70%)",
    zIndex: "-1"
  });
  document.body.appendChild(glow);
  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX - 150 + "px";
    glow.style.top = e.clientY - 150 + "px";
  });

  /* =================================
     Counter Animation
  ================================= */
  const counters = document.querySelectorAll(".stats strong");
  function animateCounter(el) {
    const text = el.textContent;
    const number = parseInt(text.replace(/\D/g, ""));
    if (isNaN(number)) return;
    let current = 0;
    const step = Math.ceil(number / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= number) { current = number; clearInterval(timer); }
      if (text.includes("%")) el.textContent = current + "%";
      else if (text.includes("+")) el.textContent = "+" + current + "K";
      else el.textContent = current;
    }, 25);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { animateCounter(entry.target); statsObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => statsObserver.observe(c));

  /* =================================
     Animation Styles
  ================================= */
  const style = document.createElement("style");
  style.textContent = `
    .hidden-element { opacity:0; transform:translateY(60px); transition: opacity .8s ease, transform .8s ease; }
    .show-element { opacity:1; transform:none; }
    .navbar-scrolled { background:rgba(5,8,16,.82)!important; backdrop-filter:blur(26px); box-shadow:0 15px 60px rgba(0,0,0,.35); }
  `;
  document.head.appendChild(style);

  console.log("NHRDP.LY | جاهز ✓");
});
