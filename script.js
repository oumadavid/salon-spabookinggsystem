document.addEventListener('DOMContentLoaded', () => {
  // Registration Handler
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password
          })
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message || 'Registered successfully!');
          window.location.href = data.redirect || '/dashboard.html';
        } else {
          alert(data.error || 'Registration failed');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong.');
      }
    });
  }

  // Login Handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const res = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
          })
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message || 'Login successful!');
          window.location.href = data.redirect || '/dashboard.html';
        } else {
          alert(data.error || 'Login failed');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong.');
      }
    });
  }

    // ======================
  // 2. DASHBOARD FUNCTIONALITY
  // ======================

  // Check authentication on dashboard
  if (window.location.pathname.includes('dashboard.html')) {
    const user = JSON.parse(localStorage.getItem('user'));
    const logoutBtn = document.getElementById('logout');
    
    // Redirect if not logged in
    if (!user) {
      window.location.href = '/login.html';
      return;
    }

    // Display user info
    const welcomeHeading = document.querySelector('header h1');
    if (welcomeHeading) {
      welcomeHeading.textContent += `, ${user.username}`;
    }

    // Logout functionality
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = '/login.html';
      });
    }

    // Booking form handler
    const bookingForm = document.querySelector('#book form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        try {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Booking...';

          const formData = {
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            userId: user.id
          };

          // Validate booking data
          if (!formData.date || !formData.time) {
            throw new Error('Please select date and time');
          }

          // Send booking request
          const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token || ''}`
            },
            body: JSON.stringify(formData)
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Booking failed');
          }

          alert(`Booking confirmed for ${formData.service} on ${formData.date} at ${formData.time}`);
          bookingForm.reset();

        } catch (error) {
          alert(error.message);
          console.error('Booking error:', error);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Book Now';
        }
      });
    }
  }

  // ======================
  // HELPER FUNCTIONS
  // ======================

  function createErrorElement(formElement) {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    formElement.appendChild(errorDiv);
    return errorDiv;
  }

  // Search functionality
  const searchForm = document.querySelector('.search');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchInput = searchForm.querySelector('input[type="text"]');
      const searchTerm = searchInput.value.trim();
      
      if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        // In a real app, you would fetch search results here
        searchInput.value = '';
      }
    });
  }
});
