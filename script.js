(() => {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    // Get elements for both desktop and mobile
    const facultyFilterDesktop = document.getElementById(
      "faculty-filter-desktop"
    );
    const deptFilterDesktop = document.getElementById(
      "department-filter-desktop"
    );
    const goButtonDesktop = document.getElementById("filter-go-button-desktop");
    const errorDesktop = document.getElementById("faculty-error-desktop");
    const deptErrorDesktop = document.getElementById(
      "department-error-desktop"
    );

    const facultyFilterMobile = document.getElementById(
      "faculty-filter-mobile"
    );
    const deptFilterMobile = document.getElementById(
      "department-filter-mobile"
    );
    const goButtonMobile = document.getElementById("filter-go-button-mobile");
    const errorMobile = document.getElementById("faculty-error-mobile");
    const deptErrorMobile = document.getElementById("department-error-mobile");

    const departmentsByFaculty = {
      "": [], // Placeholder value
      engineering: [
        "Computer Science & Engineering",
        "Electrical & Electronic Engineering",
        "Food Engineering",
      ],
      business: [
        "Bachelor of Business Administration",
        "Master of Business Administration",
      ],
      arts: ["Bachelor of English"],
    };

    // Reusable function to populate department dropdown
    function populateDepartments(faculty, deptFilterElement) {
      const departments = departmentsByFaculty[faculty] || [];
      deptFilterElement.innerHTML = ""; // Clear existing options

      // Add the placeholder option first
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = "Select Department";
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      placeholderOption.hidden = true; // Hide from dropdown list
      deptFilterElement.appendChild(placeholderOption);

      // Add other departments
      departments.forEach((dept) => {
        const option = document.createElement("option");
        option.value = dept
          .toLowerCase()
          .replace(/ & /g, " ")
          .replace(/ /g, "-");
        option.textContent = dept;
        deptFilterElement.appendChild(option);
      });

      // Enable or disable based on faculty selection
      deptFilterElement.disabled = !faculty || faculty === "";
    }

    // Reusable function to reset faculty error state
    function resetFacultyError(facultyFilter, errorElement) {
      errorElement.classList.add("hidden");
      facultyFilter.classList.remove("border-red-600", "focus:ring-red-600");
      facultyFilter.classList.add("border-gray-300", "focus:ring-[#054d94]");
    }

    // Reusable function to reset department error state
    function resetDeptError(deptFilter, errorElement) {
      errorElement.classList.add("hidden");
      deptFilter.classList.remove("border-red-600", "focus:ring-red-600");
      deptFilter.classList.add("border-gray-300", "focus:ring-[#054d94]");
    }

    // Reusable function to handle "Go" click logic
    function handleGoClick(facultyFilter, facultyError, deptFilter, deptError) {
      const selectedFaculty = facultyFilter.value;
      const selectedDept = deptFilter.value;

      // Reset both errors first
      resetFacultyError(facultyFilter, facultyError);
      resetDeptError(deptFilter, deptError);

      if (selectedFaculty === "") {
        // Show faculty error
        facultyError.classList.remove("hidden");
        facultyFilter.classList.remove(
          "border-gray-300",
          "focus:ring-[#054d94]"
        );
        facultyFilter.classList.add("border-red-600", "focus:ring-red-600");
        facultyFilter.focus();
      } else if (selectedDept === "") {
        // Show department error
        deptError.classList.remove("hidden");
        deptFilter.classList.remove("border-gray-300", "focus:ring-[#054d94]");
        deptFilter.classList.add("border-red-600", "focus:ring-red-600");
        deptFilter.focus();
      } else {
        // Proceed
        console.log("Proceeding with:", selectedFaculty, selectedDept);
        // You can add navigation logic here
        // Example: window.location.href = `/faculty/${selectedFaculty}/${selectedDept}`;
      }
    }

    // Null check for all elements
    if (
      !facultyFilterDesktop ||
      !deptFilterDesktop ||
      !goButtonDesktop ||
      !errorDesktop ||
      !deptErrorDesktop ||
      !facultyFilterMobile ||
      !deptFilterMobile ||
      !goButtonMobile ||
      !errorMobile ||
      !deptErrorMobile
    ) {
      console.error("Filter elements not found!");
      return;
    }

    // --- Desktop Listeners ---
    facultyFilterDesktop.addEventListener("change", () => {
      resetFacultyError(facultyFilterDesktop, errorDesktop);
      resetDeptError(deptFilterDesktop, deptErrorDesktop); // Also reset dept error
      const selectedFaculty = facultyFilterDesktop.value;
      populateDepartments(selectedFaculty, deptFilterDesktop);
    });

    deptFilterDesktop.addEventListener("change", () => {
      resetDeptError(deptFilterDesktop, deptErrorDesktop); // Reset only dept error
    });

    goButtonDesktop.addEventListener("click", () => {
      handleGoClick(
        facultyFilterDesktop,
        errorDesktop,
        deptFilterDesktop,
        deptErrorDesktop
      );
    });

    // --- Mobile Listeners ---
    facultyFilterMobile.addEventListener("change", () => {
      resetFacultyError(facultyFilterMobile, errorMobile);
      resetDeptError(deptFilterMobile, deptErrorMobile); // Also reset dept error
      const selectedFaculty = facultyFilterMobile.value;
      populateDepartments(selectedFaculty, deptFilterMobile);
    });

    deptFilterMobile.addEventListener("change", () => {
      resetDeptError(deptFilterMobile, deptErrorMobile); // Reset only dept error
    });

    goButtonMobile.addEventListener("click", () => {
      handleGoClick(
        facultyFilterMobile,
        errorMobile,
        deptFilterMobile,
        deptErrorMobile
      );
    });

    // --- Initial Population ---
    // Need to set initial state for department dropdowns
    populateDepartments("", deptFilterDesktop);
    populateDepartments("", deptFilterMobile);
  });
})();
