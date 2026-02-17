
const monthYearElement = document.getElementById('monthYear');
const calendarDaysElement = document.getElementById('calendarDays');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentDate = new Date();

// ---- GET REMINDERS FOR SPECIFIC DATE ----
function getRemindersForDate(dateStr) {
  return getUserReminders().filter(r => r.date === dateStr);
}

// ---- RENDER CALENDAR ----
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYearElement.textContent = new Date(year, month).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  calendarDaysElement.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // Empty leading cells
  for (let i = 0; i < firstDay; i++) {
    calendarDaysElement.appendChild(document.createElement('div'));
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('calendar-day');
    dayDiv.textContent = day;

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Highlight today
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayDiv.classList.add('today');
    }

    // Check for reminders
    const reminders = getRemindersForDate(dateStr);
    if (reminders.length > 0) {
      dayDiv.classList.add('has-reminders');
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dayDiv.appendChild(dot);
    }

    // Click → show tasks for this date
    dayDiv.addEventListener('click', () => {
      window.dynamicList.innerHTML = '';
      const reminders = getRemindersForDate(dateStr);
      reminders.forEach(renderReminder);
    });

    calendarDaysElement.appendChild(dayDiv);
  }
}

// ---- NAVIGATION ----
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();
