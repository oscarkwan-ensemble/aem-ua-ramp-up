export default function decorate(block) {
  const formConfig = {};
  const rows = [...block.children];

  // Parse block rows into config key-value pairs
  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length >= 2) {
      const key = cols[0].textContent.trim().toLowerCase();
      const value = cols[1].innerHTML.trim();
      formConfig[key] = value;
    }
  });

  const title = formConfig.title || 'Contact Us';
  const description = formConfig.description || 'Need to get in touch with us? Fill out this form with your inquiry.';
  const action = formConfig.action || '';
  const successMessage = formConfig['success message'] || 'Thank you! Your message has been sent.';

  // Build the form HTML
  const formHTML = `
    <div class="form-inner">
      <div class="form-header">
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
      <form id="contact-form">
        <fieldset class="form-section">
          <legend>Personal Information</legend>
          <div class="form-row">
            <div class="form-field">
              <label for="form-firstname">First Name *</label>
              <input type="text" id="form-firstname" name="firstName" required />
            </div>
            <div class="form-field">
              <label for="form-lastname">Last Name *</label>
              <input type="text" id="form-lastname" name="lastName" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label for="form-email">Email *</label>
              <input type="email" id="form-email" name="email" required />
            </div>
            <div class="form-field">
              <label for="form-company">Company *</label>
              <input type="text" id="form-company" name="company" required />
            </div>
          </div>
        </fieldset>
        <fieldset class="form-section">
          <legend>Inquiry</legend>
          <div class="form-field">
            <label for="form-interest">What are you interested in?</label>
            <select id="form-interest" name="interest">
              <option value="" disabled selected>Select Area of Interest</option>
              <option value="app-development">App Development</option>
              <option value="web-development">Web Development</option>
              <option value="digital-strategy">Digital Strategy</option>
              <option value="adobe-technologies">Adobe Technologies</option>
              <option value="content-creation">Content Creation</option>
              <option value="streaming-ott">Streaming OTT</option>
              <option value="joining-ensemble">Joining Ensemble</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-field">
            <label for="form-message">What can we help you with?</label>
            <textarea id="form-message" name="message" rows="6"></textarea>
          </div>
        </fieldset>
        <div class="form-actions">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
      <div class="form-success" aria-live="polite" hidden>
        <p>${successMessage}</p>
      </div>
    </div>
  `;

  block.innerHTML = formHTML;

  // Handle form submission
  const form = block.querySelector('#contact-form');
  const successEl = block.querySelector('.form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'SUBMITTING...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (action) {
      try {
        await fetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Form submission error:', error);
      }
    }

    form.hidden = true;
    successEl.hidden = false;

    submitBtn.disabled = false;
    submitBtn.textContent = 'SUBMIT';
  });
}
