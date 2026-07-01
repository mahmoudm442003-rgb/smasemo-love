// 1. نظام جزيئات الجو الرومانسي المتساقط (قلوب، نجوم، بتلات ورود)
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 70; // الكثافة المثالية لتجربة فائقة السلاسة

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// فئة الجسيمات
class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height; // توزيع عشوائي أولي
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 12 + 6; // أحجام مختلفة للتدرج العميق
    this.speedY = Math.random() * 1.5 + 0.6;
    this.speedX = Math.random() * 1.2 - 0.6;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.02 - 0.01;
    // نوع الجسيم: 0 = قلب، 1 = ورقة ورد متساقطة، 2 = نجمة مضيئة متلألئة
    this.type = Math.floor(Math.random() * 3);
    this.opacity = Math.random() * 0.5 + 0.4;
    // درجة تدرج اللون الوردي والأحمر والأبيض
    this.colorIndex = Math.floor(Math.random() * 3);
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y / 30) * 0.3; // حركة تمايل طبيعية ناعمة
    this.rotation += this.rotationSpeed;

    // إعادة تدوير الجزيئات بمجرد خروجها من الشاشة
    if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    let colors = [
      '#ff4b72', // وردي فاقع
      '#ff85a1', // وردي ناعم
      '#ff2d55'  // أحمر رومانسي
    ];
    ctx.fillStyle = colors[this.colorIndex];

    if (this.type === 0) {
      // رسم قلب رومانسي متناسق بمسارات بيزير
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, 0, 0, this.size);
      ctx.bezierCurveTo(this.size, 0, this.size / 2, -this.size / 2, 0, 0);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 1) {
      // رسم بتلة ورد طبيعية رقيقة
      ctx.fillStyle = '#ff6085';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.7, this.size * 0.4, Math.PI / 4, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      // تفاصيل خفيفة داخل البتلة لإعطاء لمسة فنية واقعية
      ctx.strokeStyle = '#ff3d6a';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-this.size * 0.5, 0);
      ctx.lineTo(this.size * 0.5, 0);
      ctx.stroke();
    } else {
      // رسم نجمة متلألئة مضيئة
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#fff';
      ctx.fillStyle = '#fff6ec';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size * 0.5,
                   Math.sin((18 + i * 72) * Math.PI / 180) * this.size * 0.5);
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * this.size * 0.25,
                   Math.sin((54 + i * 72) * Math.PI / 180) * this.size * 0.25);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }
}

// تهيئة الجسيمات
function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// تشغيل الرسوم بـ 60 إطار في الثانية
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
animate();


// نظام تشغيل الموسيقى التلقائي والاحتياطي
let isMusicPlaying = false;

function playRomanticSong() {
  const audio = document.getElementById('romantic-song');
  if (!audio || isMusicPlaying) return;

  audio.play().then(() => {
    isMusicPlaying = true;
    console.log("تم تشغيل الأغنية بنجاح تلقائياً");
  }).catch((err) => {
    console.log("المتصفح منع التشغيل التلقائي، سيتم المحاولة مع أول تفاعل للمستخدم:", err);

    const playOnInteraction = () => {
      if (isMusicPlaying) return;
      audio.play().then(() => {
        isMusicPlaying = true;
        removeInteractionListeners();
        console.log("تم تشغيل الأغنية بعد تفاعل المستخدم");
      }).catch(e => console.log("فشل التشغيل التلقائي حتى بعد تفاعل المستخدم:", e));
    };

    const removeInteractionListeners = () => {
      document.removeEventListener('click', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
      document.removeEventListener('keydown', playOnInteraction);
    };

    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
    document.addEventListener('keydown', playOnInteraction);
  });
}

// 2. معالجة نظام تسجيل الدخول الآمن والاهتزاز الفاخر عند كتابة كلمة مرور خاطئة
function handleLogin(event) {
  event.preventDefault();
  const passwordInput = document.getElementById('password-input');
  const loginCard = document.getElementById('login-card');
  const errorMessage = document.getElementById('error-message');
  
  // التحقق من صحة كلمة المرور المحددة
  if (passwordInput.value.trim() === 'Smasemo') {
    // تسجيل دخول ناجح
    errorMessage.style.opacity = '0';

    // تشغيل الأغنية مباشرة
    playRomanticSong();
    
    // إخفاء كارت الدخول بتلاشي فاخر وحركة ناعمة
    const loginContainer = document.getElementById('login-container');
    loginContainer.style.opacity = '0';
    loginContainer.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
      loginContainer.style.display = 'none';
      // إظهار محتوى الموقع المتكامل
      const mainContent = document.getElementById('main-content');
      mainContent.classList.add('active');
      // بدء العداد التنازلي المباشر للحب
      startLoveTimer();
    }, 1000);

  } else {
    // خطأ في كلمة المرور - إبراز رسالة خطأ مع مؤثر shake
    errorMessage.style.opacity = '1';
    loginCard.classList.add('error-shake');
    
    // إرجاع مدخل كلمة المرور فارغاً والتركيز عليه
    passwordInput.value = '';
    passwordInput.focus();
    
    // إزالة كلاس الاهتزاز بعد انتهاء الأنيميشن لإعادة استخدامه لاحقاً
    setTimeout(() => {
      loginCard.classList.remove('error-shake');
    }, 500);
  }
}


// 3. عداد الحب التاريخي الفاخر
// يبدأ من: 23/06/2026 الساعة 11:14 مساءً
// التاريخ الفعلي في جافاسكريبت: شهر يونيو = 5 (الترتيب الصفرى)
const loveStartDate = new Date(2026, 5, 23, 23, 14, 0);

function updateLoveCounter() {
  const now = new Date();
  const diffMs = now - loveStartDate;

  // في حال تشغيل العداد وتاريخ اليوم يسبق تاريخ البداية (منع قراءة سالبة)
  if (diffMs < 0) {
    document.getElementById('days-val').innerText = '00';
    document.getElementById('hours-val').innerText = '00';
    document.getElementById('minutes-val').innerText = '00';
    document.getElementById('seconds-val').innerText = '00';
    return;
  }

  // حساب الفروق الزمنية بدقة تامة
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  // تنسيق الرقم المزدوج الفاخر (إضافة صفر على اليسار إذا لزم الأمر)
  document.getElementById('days-val').innerText = days.toString().padStart(2, '0');
  document.getElementById('hours-val').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minutes-val').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('seconds-val').innerText = seconds.toString().padStart(2, '0');
}

function startLoveTimer() {
  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);
}


// 4. نظام رسالة الحب السحرية (كتابة حرفاً بحرف مع مؤثرات الصوت البصرية)
const messageText = `أنا بحبك أوي يا سماسيمو ❤️
وجودك أجمل حاجة حصلت في حياتي.
كل لحظة معاكي نعمة.
وهفضل أحبك وأحافظ عليكي وأكون جنبك دايمًا.
بحبك جدًا ❤️`;

let charIndex = 0;
let typingInterval = null;
let isEnvelopeOpened = false;

function openEnvelope() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;

  const envelope = document.getElementById('envelope');
  envelope.classList.add('open');

  // انتظار انتهاء حركة صعود الورقة من الظرف لفتح الشاشة الضخمة وقراءة الرسالة
  setTimeout(() => {
    const modal = document.getElementById('letter-modal');
    modal.classList.add('active');
    startTypewriter();
  }, 1200);
}

function startTypewriter() {
  const letterTextBody = document.getElementById('letter-text-body');
  letterTextBody.innerHTML = '<span class="typewriter-cursor"></span>';
  charIndex = 0;
  
  if (typingInterval) clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    if (charIndex < messageText.length) {
      // أخذ الحرف الحالي وإضافته قبل مؤشر الماوس الوامض
      const char = messageText.charAt(charIndex);
      const cursorHtml = '<span class="typewriter-cursor"></span>';
      
      // في حال رصد كسر السطر يترجم لـ <br> متناسق
      if (char === '\n') {
        letterTextBody.innerHTML = letterTextBody.innerHTML.replace(cursorHtml, '') + '<br>' + cursorHtml;
      } else {
        letterTextBody.innerHTML = letterTextBody.innerHTML.replace(cursorHtml, '') + char + cursorHtml;
      }
      charIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 85); // سرعة الكتابة الرومانسية المريحة للعينين
}

function closeLetter() {
  const modal = document.getElementById('letter-modal');
  modal.classList.remove('active');
  
  // إرجاع الظرف لحالة مغلقة ناعمة لإمكانية إعادة التجربة الرائعة
  setTimeout(() => {
    const envelope = document.getElementById('envelope');
    envelope.classList.remove('open');
    isEnvelopeOpened = false;
  }, 400);

  if (typingInterval) clearInterval(typingInterval);
}


// 5. نظام معرض الصور وتكبير الصور (Lightbox Overlay)
function openLightbox(imageSrc, captionText) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');

  img.src = imageSrc;
  caption.innerText = captionText;
  modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-image');
  if (img) img.src = ''; // تنظيف الرابط لمنع الوميض
  modal.classList.remove('active');
}

// إخفاء الصورة البديلة للصور غير المرفوعة بعد والاحتفاظ بتناغم التصميم الإبداعي
if (typeof window.hidePlaceholder === 'undefined') {
  window.hidePlaceholder = function(imgElement) {
    const placeholder = imgElement.previousElementSibling;
    if (placeholder && placeholder.classList.contains('image-placeholder')) {
      placeholder.style.opacity = '0';
      setTimeout(() => {
        placeholder.style.display = 'none';
      }, 500);
    }
  };
}

// إغلاق أي نافذة مفتوحة بالضغط على مفتاح Escape لتجربة استخدام فائقة الجودة
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLetter();
    closeLightbox();
  }
});

// تصدير الوظائف للـ Global Scope ليتم التعرف عليها من كود الـ HTML بشكل مباشر ودون أي أخطاء
window.handleLogin = handleLogin;
window.openEnvelope = openEnvelope;
window.openLightbox = openLightbox;
window.closeLetter = closeLetter;
window.closeLightbox = closeLightbox;
