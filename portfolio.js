// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-btn");

  // 플립 카드 기능
  const profileCard = document.getElementById("profileCard");
  const flipButtons = document.querySelectorAll(".flip-btn");

  if (profileCard && flipButtons.length > 0) {
    flipButtons.forEach((button) => {
      button.addEventListener("click", () => {
        profileCard.classList.toggle("flipped");
      });
    });
  }

  // 타이핑 효과 시작
  startTypingEffect();

  // 네비게이션 버튼 클릭 이벤트
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      // 모든 버튼에서 active 클래스 제거
      navButtons.forEach((btn) => btn.classList.remove("active"));

      // 클릭된 버튼에 active 클래스 추가
      this.classList.add("active");

      // 해당 섹션으로 부드럽게 스크롤
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 스킬 바 초기화
  initSkillBars();

  // Skills 섹션이 화면에 보이면 애니메이션 실행
  const skillsSection = document.getElementById("skills");
  let hasAnimated = false; // 한 번만 실행되도록

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateSkillBars();
          hasAnimated = true;
        }
      });
    },
    { threshold: 0.3 }
  ); // 30% 보이면 실행

  skillObserver.observe(skillsSection);

  // 스크롤 시 현재 섹션에 따라 네비게이션 활성화
  window.addEventListener("scroll", updateActiveNav);
});

// 스킬 바 초기화
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-progress");
  bars.forEach((bar) => {
    bar.style.width = "0%";
  });
}

// 스킬 바 애니메이션
function animateSkillBars() {
  const bars = document.querySelectorAll(".skill-progress");
  bars.forEach((bar, index) => {
    setTimeout(() => {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = progress + "%";
    }, index * 200);
  });
}

// 스크롤 위치에 따라 네비게이션 버튼 활성화
function updateActiveNav() {
  const sections = document.querySelectorAll(".section");
  const navButtons = document.querySelectorAll(".nav-btn");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    // 현재 스크롤 위치가 섹션 범위 안에 있는지 확인
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  // 네비게이션 버튼 활성화 업데이트
  navButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.getAttribute("data-target") === currentSection) {
      button.classList.add("active");
    }
  });
}

// 프로젝트 카드 호버 효과
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.background = "rgba(74, 111, 165, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.background = "rgba(74, 111, 165, 0.05)";
    });
  });
});

// 반응형 네비게이션 처리
function handleResize() {
  const width = window.innerWidth;
  const nav = document.querySelector(".bottom-nav");

  if (width >= 769) {
    // 데스크톱: 사이드 네비게이션
    nav.style.flexDirection = "column";
  } else {
    // 모바일: 하단 네비게이션
    nav.style.flexDirection = "row";
  }
}

window.addEventListener("resize", handleResize);
handleResize(); // 초기 실행

// 스크롤 시 페이드인 애니메이션
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// 애니메이션 적용할 요소들
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".profile-card, .skill-item, .project-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      fadeInObserver.observe(el);
    });
});

// 타이핑 효과 함수
function startTypingEffect() {
  const words = [
    { text: "web", color: "#ff9999" },
    { text: "design", color: "#ccdd99" },
    { text: "code", color: "#cc99cc" },
  ];

  const typingText = document.querySelector(".typing-text");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // 글자 지우기
      typingText.textContent = currentWord.text.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
        return;
      }
    } else {
      // 글자 타이핑
      typingText.textContent = currentWord.text.substring(0, charIndex + 1);
      typingText.style.color = currentWord.color;
      charIndex++;

      if (charIndex === currentWord.text.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    }

    setTimeout(type, isDeleting ? 100 : 150);
  }

  // 1.5초 후 타이핑 시작
  setTimeout(() => {
    type();
  }, 1500);
}

// Contact Form은 FormSubmit이 자동으로 처리합니다
// https://formsubmit.co/ 사용중
