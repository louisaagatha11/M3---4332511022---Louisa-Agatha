document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  function showError(input, message) {
    const wrapper = input.closest(".group");
    const errorEl = wrapper.querySelector(".error-msg");
    errorEl.textContent = message || "";
    errorEl.classList.toggle("show", !!message);
    wrapper.classList.toggle("has-error", !!message);
  }

  const rules = {
    username: (v) => {
      if (!v.trim()) return "Username tidak boleh kosong.";
      if (v.trim().length < 3) return "Username minimal 3 karakter.";
    },
    password: (v) => {
      if (!v) return "Password tidak boleh kosong.";
      if (v.length < 8) return "Password minimal 8 karakter.";
    },
    nama: (v) => {
      if (!v.trim()) return "Nama tidak boleh kosong.";
    },
    tanggal_lahir: (v) => {
      if (!v) return "Tanggal lahir tidak boleh kosong.";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(v + "T00:00:00") > today) {
        return "Tanggal lahir tidak boleh melebihi hari ini.";
      }
    },
    alamat: (v) => {
      if (!v.trim()) return "Alamat tidak boleh kosong.";
    },
    telpon: (v) => {
      if (!v.trim()) return "Nomor telpon tidak boleh kosong.";
      if (!v.trim().startsWith("62")) return "Nomor telpon harus berawalan dari 62.";
    },
  };

  function validateField(name) {
    const input = document.getElementById(name);
    const message = rules[name](input.value);
    showError(input, message);
    return !message;
  }

  Object.keys(rules).forEach((name) => {
    document.getElementById(name).addEventListener("blur", () => validateField(name));
  });

  form.addEventListener("submit", function (e) {
    const results = Object.keys(rules).map(validateField);
    if (results.includes(false)) e.preventDefault();
  });
});

  function validateAlamat() {
    const value = fields.alamat.value.trim();
    if (value === "") {
      showError(fields.alamat, "Alamat tidak boleh kosong.");
      return false;
    }
    showError(fields.alamat, "");
    return true;
  }

  function validateTelpon() {
    const value = fields.telpon.value.trim();
    if (value === "") {
      showError(fields.telpon, "Nomor telpon tidak boleh kosong.");
      return false;
    }
    if (!value.startsWith("62")) {
      showError(fields.telpon, "Nomor telpon harus berawalan dari 62.");
      return false;
    }
    showError(fields.telpon, "");
    return true;
  }

  // Validasi realtime saat user mengetik / keluar dari field
  fields.username.addEventListener("blur", validateUsername);
  fields.password.addEventListener("blur", validatePassword);
  fields.nama.addEventListener("blur", validateNama);
  fields.tanggal_lahir.addEventListener("blur", validateTanggalLahir);
  fields.alamat.addEventListener("blur", validateAlamat);
  fields.telpon.addEventListener("blur", validateTelpon);

  // Validasi saat submit
  form.addEventListener("submit", function (e) {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isNamaValid = validateNama();
    const isTanggalValid = validateTanggalLahir();
    const isAlamatValid = validateAlamat();
    const isTelponValid = validateTelpon();

    const isFormValid =
      isUsernameValid &&
      isPasswordValid &&
      isNamaValid &&
      isTanggalValid &&
      isAlamatValid &&
      isTelponValid;

    if (!isFormValid) {
      e.preventDefault();
    }
  });
});
