window.addEventListener('DOMContentLoaded', () => {
  const dayInput = document.getElementById('dd');
  const monthInput = document.getElementById('mm');
  const yearInput = document.getElementById('yy');
  const yearResult = document.getElementById('ddResult');
  const monthResult = document.getElementById('mmResult');
  const dayResult = document.getElementById('yyResult');
  const dayError = document.getElementById('dayError');
  const monthError = document.getElementById('monthError');
  const yearError = document.getElementById('yearError');

  const enforceTwoDigitInput = (input) => {
    input.value = input.value.slice(0, 2); // Limit input to two digits
  };

  const enforceFourDigitInput = (input) => {
    input.value = input.value.slice(0, 4); // Limit input to four digits
  };

  const calculateAge = () => {
    const today = new Date();
    const birthYear = parseInt(yearInput.value, 10);
    const birthMonth = parseInt(monthInput.value, 10);
    const birthDay = parseInt(dayInput.value, 10);

    let hasError = false;

    // Reset error messages
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';

    if (isNaN(birthYear) || yearInput.value.length !== 4 || birthYear >= today.getFullYear()) {
      if (yearInput.value === '') {
        yearError.textContent = 'This field is empty';
      } else {
        yearError.textContent = 'Must be in the past';
      }
      hasError = true;
    }

    if (isNaN(birthMonth) || birthMonth < 1 || birthMonth > 12) {
      if (monthInput.value === '') {
        monthError.textContent = 'This field is empty';
      } else {
        monthError.textContent = 'Must be a valid month';
      }
      hasError = true;
    }

    if (isNaN(birthDay) || birthDay < 1 || birthDay > 31) {
      if (dayInput.value === '') {
        dayError.textContent = 'This field is empty';
      } else {
        dayError.textContent = 'Must be a valid day';
      }
      hasError = true;
    } else {
      // Check for invalid dates (e.g., 31/04/1991)
      const lastDayOfMonth = new Date(birthYear, birthMonth, 0).getDate();
      if (birthDay > lastDayOfMonth) {
        dayError.textContent = 'Invalid date';
        hasError = true;
      }
    }

    if (hasError) {
      // Display "--" in the result fields
      yearResult.textContent = '--';
      monthResult.textContent = '--';
      dayResult.textContent = '--';
      return;
    }

    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    if (birthDate > today) {
      // Display "--" if the birth date is in the future
      yearResult.textContent = '--';
      monthResult.textContent = '--';
      dayResult.textContent = '--';
      return;
    }

    let yearDiff = today.getFullYear() - birthYear;
    let monthDiff = today.getMonth() - birthMonth;
    let dayDiff = today.getDate() - birthDay;

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

  dayInput.addEventListener('input', () => {
    enforceTwoDigitInput(dayInput);
    calculateAge();
  });

  monthInput.addEventListener('input', () => {
    enforceTwoDigitInput(monthInput);
    calculateAge();
  });

  yearInput.addEventListener('input', () => {
    enforceFourDigitInput(yearInput);
    calculateAge();
  });

  //calculateAge(); // Calculate age initially
});
