export var animate = function () {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
  
    const observer = new IntersectionObserver((enteries) => {
      enteries.forEach((entry) => {
        const animation = `anim-${entry.target.dataset.anim || "up"}`;
        const duration = entry.target.dataset.duration || "1s";
        const delay = entry.target.dataset.delay || "0s";
        if (entry.isIntersecting) {
          entry.target.style.animation = `${animation} ${duration} ${delay} forwards`;
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    const animElements = document.querySelectorAll(".anim");
    animElements.forEach((animElement) => {
      observer.observe(animElement);
    });
  
    const animAllElements = document.querySelectorAll(".anim-all");
    animAllElements.forEach((animAllElement) => {
      observer.observe(animAllElement);
    });
  };