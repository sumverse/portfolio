// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-btn");

  // 이력서 모달
  const resumeBtn = document.getElementById("resumeBtn");
  const resumeModal = document.getElementById("resumeModal");
  const modalClose = document.getElementById("modalClose");

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener("click", () => {
      resumeModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    modalClose.addEventListener("click", () => {
      resumeModal.classList.remove("active");
      document.body.style.overflow = "";
    });

    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // 타이핑 효과 시작
  startTypingEffect();

  // 네비게이션 버튼 클릭 이벤트
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      navButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // 스킬 바 초기화
  initSkillBars();

  // Profile 섹션이 화면에 보이면 게이지 애니메이션
  const profileSection = document.getElementById("profile");
  let hasAnimated = false;

  if (profileSection) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateSkillBars();
            animateGauges();
            hasAnimated = true;
          }
        });
      },
      { threshold: 0.2 }
    );
    skillObserver.observe(profileSection);
  }

  // 스크롤 시 현재 섹션에 따라 네비게이션 활성화
  window.addEventListener("scroll", updateActiveNav);

  // 프로젝트 모달 초기화
  initProjectModal();
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

// 원형 게이지 애니메이션
function animateGauges() {
  const fills = document.querySelectorAll(".gauge-fill");
  const circumference = 314; // 2 * π * 50

  fills.forEach((fill, index) => {
    setTimeout(() => {
      const progress = parseInt(fill.getAttribute("data-progress"));
      const offset = circumference - (circumference * progress) / 100;
      fill.style.strokeDashoffset = offset;
    }, index * 200);
  });
}

// 프로젝트 모달 데이터
const projectData = {
  harmonyclass: {
    img: "harmonyclass.png",
    title: "Harmonyclass",
    sub: "음악 교사를 위한 뉴스레터 서비스",
    desc: "음악 교사들이 최신 음악 교육 뉴스를 한눈에 볼 수 있도록 기획한 뉴스레터 웹 서비스입니다.",
    stack: [
      "Next.js 기반 서버 사이드 렌더링으로 빠른 로딩 속도 구현",
      "네이버 뉴스 API 연동해 실시간 뉴스 제공",
      "Vercel 배포",
      "반응형 UI/UX 디자인 적용"
    ],
    link: "https://harmonyclass.vercel.app/"
  },
  orchenova: {
    img: "orchenova.png",
    title: "OrcheNova",
    sub: "오케스트라 소개 및 퀴즈",
    desc: "음악 수업용 인터랙티브 학습 사이트입니다. 오케스트라 악기별 상세 정보를 제공하고, 학습한 내용을 퀴즈로 확인할 수 있습니다.",
    stack: [
      "React Router를 활용한 페이지 라우팅 구현",
      "악기별 상세 정보 페이지 및 퀴즈 기능 구현",
      "Vite 빌드 환경 적용",
      "Netlify 배포"
    ],
    link: "https://fancy-figolla-b1e99a.netlify.app/"
  },
  angelinus: {
    img: "angelinus.png",
    title: "Angelinus 웹페이지 리뉴얼",
    sub: "카페 브랜드 웹사이트 리뉴얼",
    desc: "엔젤리너스 카페의 웹사이트를 리뉴얼한 프로젝트입니다. 사용자 경험을 고려한 인터랙션 디자인에 집중했습니다.",
    stack: [
      "반응형 레이아웃 설계",
      "JavaScript로 이미지 슬라이더 구현",
      "스크롤 애니메이션 및 모달 팝업 등 동적 UI 구현"
    ],
    link: "https://sumverse.github.io/angelinus/"
  },
  corgiisland: {
    img: "corgiisland.png",
    title: "코기섬",
    sub: "웰시코기 커뮤니티 사이트",
    desc: "웰시코기를 주제로 한 반려견 커뮤니티 사이트입니다. 서버 사이드 프로그래밍의 전반적인 흐름을 경험한 프로젝트입니다.",
    stack: [
      "PHP와 MySQL로 회원가입/로그인 시스템 구현",
      "세션 관리 및 보안 처리",
      "게시판 CRUD 기능 및 댓글 시스템 개발"
    ],
    link: "https://sumverse.dothome.co.kr/corgiisland/index.php"
  },
  touslesjours: {
    img: "touslesjours.png",
    title: "TOUS les JOURS",
    sub: "베이커리 브랜드 쇼핑몰 (팀 프로젝트)",
    desc: "뚜레쥬르 베이커리 브랜드를 주제로 팀 프로젝트로 제작한 쇼핑몰입니다.",
    stack: [
      "카카오/네이버 소셜 로그인 연동",
      "장바구니 시스템 구현",
      "모달 팝업을 활용한 상품 상세 정보 표시"
    ],
    link: "https://eunsum.dothome.co.kr/"
  }
};

// 프로젝트 모달 초기화
function initProjectModal() {
  const projectModal = document.getElementById("projectModal");
  const projectModalClose = document.getElementById("projectModalClose");

  document.querySelectorAll(".project-card[data-project]").forEach((card) => {
    card.addEventListener("click", function () {
      const key = this.getAttribute("data-project");
      const data = projectData[key];
      if (!data) return;

      document.getElementById("projectModalImg").src = data.img;
      document.getElementById("projectModalImg").alt = data.title;
      document.getElementById("projectModalTitle").textContent = data.title;
      document.getElementById("projectModalSub").textContent = data.sub;
      document.getElementById("projectModalDesc").textContent = data.desc;
      document.getElementById("projectModalLink").href = data.link;

      const stackEl = document.getElementById("projectModalStack");
      stackEl.innerHTML = data.stack.map(s => `<li>${s}</li>`).join("");

      projectModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  projectModalClose.addEventListener("click", () => {
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

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
