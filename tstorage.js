// ---- USER + REMINDER STORAGE ----

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function getAllReminders() {
  try {
    return JSON.parse(localStorage.getItem('reminders')) || {};
  } catch {
    return {};
  }
}

function saveAllReminders(data) {
  localStorage.setItem('reminders', JSON.stringify(data));
}

function getUserReminders() {
  const user = getCurrentUser();
  if (!user) return [];
  const data = getAllReminders();
  return data[user] || [];
}

function saveUserReminder(reminder) {
  const user = getCurrentUser();
  if (!user || !reminder) return;

  const data = getAllReminders();
  data[user] = data[user] || [];
  data[user].push(reminder);
  saveAllReminders(data);
}

localStorage.setItem('currentUser', 'test@example.com');
