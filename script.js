window.addEventListener('DOMContentLoaded', () => {
  const dayInput = document.getElementById('dd');
  const monthInput = document.getElementById('mm');
  const yearInput = document.getElementById('yy');
  const yearResult = document.getElementById('ddResult');
  const monthResult = document.getElementById('mmResult');
  const dayResult = document.getElementById('yyResult');

  const enforceTwoDigitInput = (input) => {
    if (input.value.length > 2) {
      input.value = input.value.slice(0, 2);
    }
  };

  const enforceFourDigitInput = (input) => {
    if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
    }
  };

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(`${monthInput.value}/${dayInput.value}/${yearInput.value}`);

    if (isNaN(birthDate)) {
      // Display "--" if the birth date is invalid
      yearResult.textContent = '--';
      monthResult.textContent = '--';
      dayResult.textContent = '--';
      return;
    }

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

    // Display "--" if the age is 0
    yearResult.textContent = yearDiff === 0 ? '--' : yearDiff;
    monthResult.textContent = monthDiff === 0 ? '--' : monthDiff;
    dayResult.textContent = dayDiff === 0 ? '--' : dayDiff;
  };

  const form = document.getElementById('ageCalculatorForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateAge();
  });

  dayInput.addEventListener('input', () => {
    enforceTwoDigitInput(dayInput);
  });

  monthInput.addEventListener('input', () => {
    enforceTwoDigitInput(monthInput);
  });

  yearInput.addEventListener('input', () => {
    enforceFourDigitInput(yearInput);
  });

  calculateAge(); // Calculate age initially
});
