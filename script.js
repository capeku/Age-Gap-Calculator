window.addEventListener('DOMContentLoaded', () => {
  const dayInput = document.getElementById('dd');
  const monthInput = document.getElementById('mm');
  const yearInput = document.getElementById('yy');
  const yearResult = document.getElementById('ddResult');
  const monthResult = document.getElementById('mmResult');
  const dayResult = document.getElementById('yyResult');

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(`${monthInput.value}/${dayInput.value}/${yearInput.value}`);

    const yearDiff = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      yearDiff--;
    }

    if (monthDiff < 0) {
      monthDiff += 12;
    }

    if (dayDiff < 0) {
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      dayDiff += lastDayOfMonth;
      monthDiff--;
    }

    yearResult.textContent = yearDiff;
    monthResult.textContent = monthDiff;
    dayResult.textContent = dayDiff;
  };

  const form = document.getElementById('ageCalculatorForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateAge();
  });
});
