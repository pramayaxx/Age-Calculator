document.getElementById('dob-day').addEventListener('input', function() {
  if (this.value.length === 2) {
    const day = parseInt(this.value);
    if (day >= 1 && day <= 31) {
      document.getElementById('dob-month').focus();
    } else {
      showAlert("Please enter a valid day between 1 and 31.");
      this.value = '';
    }
  }
});

document.getElementById('dob-month').addEventListener('input', function() {
  if (this.value.length === 2) {
    const month = parseInt(this.value);
    if (month >= 1 && month <= 12) {
      document.getElementById('dob-year').focus();
    } else {
      showAlert("Please enter a valid month between 1 and 12.");
      this.value = '';
    }
  }
});

document.getElementById('dob-year').addEventListener('input', function() {
  if (this.value.length === 4) {
    const year = parseInt(this.value);
    const month = parseInt(document.getElementById('dob-month').value);
    const day = parseInt(document.getElementById('dob-day').value);

    if (isNaN(day) || isNaN(month) || !isValidDate(day, month, year)) {
      showAlert("Please enter a valid year.");
      this.value = '';
    }
  }
});

document.getElementById('age-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const day = parseInt(document.getElementById('dob-day').value);
  const month = parseInt(document.getElementById('dob-month').value);
  const year = parseInt(document.getElementById('dob-year').value);

  if (!isValidDate(day, month, year)) {
    showAlert("Please enter a valid date.");
    return;
  }

  const dob = new Date(year, month - 1, day);
  const today = new Date();

  if (dob > today) {
    showAlert("Date of birth cannot be in the future.");
    return;
  }

  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  const dayDifference = today.getDate() - dob.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  const months = monthDifference < 0 ? 12 + monthDifference : monthDifference;
  const days = dayDifference < 0 ? new Date(today.getFullYear(), today.getMonth(), 0).getDate() + dayDifference : dayDifference;

  const resultText = `You are ${age} years, ${months} months, and ${days} days old.`;

  document.getElementById('result').innerHTML = resultText;
  document.getElementById('result-popup').style.display = 'flex';
});

document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const popup = this.parentElement.parentElement;
    popup.classList.add('close-animation');
    setTimeout(() => {
      popup.style.display = 'none';
      popup.classList.remove('close-animation');
    }, 500);
  });
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', function(event) {
    if (event.target === this) {
      this.classList.add('close-animation');
      setTimeout(() => {
        this.style.display = 'none';
        this.classList.remove('close-animation');
      }, 500);
    }
  });
});

function showAlert(message) {
  const alertPopup = document.getElementById('alert-popup');
  document.getElementById('alert-message').innerText = message;
  alertPopup.style.display = 'flex';
  setTimeout(() => {
    alertPopup.classList.add('close-animation');
    setTimeout(() => {
      alertPopup.style.display = 'none';
      alertPopup.classList.remove('close-animation');
    }, 500);
  }, 3000);
}

function isValidDate(day, month, year) {
  const today = new Date();
  const dob = new Date(year, month - 1, day);

  if (dob > today) return false;

  const maxDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day > 0 && day <= maxDays[month - 1];
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}