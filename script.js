const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 21);

const pad = (value) => String(value).padStart(2, "0");

const setValue = (id, value) => {
  const element = document.getElementById(id);
  if (!element) return;

  if (element.textContent !== value) {
    element.classList.remove("flip");
    void element.offsetWidth;
    element.textContent = value;
    element.classList.add("flip");
  }
};

const renderCountdown = () => {
  const now = new Date();
  const delta = Math.max(0, launchDate.getTime() - now.getTime());

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((delta / (1000 * 60)) % 60);

  setValue("days", pad(days));
  setValue("hours", pad(hours));
  setValue("minutes", pad(minutes));
};

renderCountdown();
setInterval(renderCountdown, 1000);
