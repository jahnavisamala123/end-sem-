let students = JSON.parse(
    localStorage.getItem("students")
) || [];

let editIndex = -1;

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const search = document.getElementById("search");

function displayStudents(data = students) {
    studentList.innerHTML = "";

    data.forEach((student) => {
        const index = students.indexOf(student);

        studentList.innerHTML += `
            <tr>
                <td>${escapeHTML(student.name)}</td>
                <td>${escapeHTML(student.roll)}</td>
                <td>${escapeHTML(student.email)}</td>
                <td>${escapeHTML(student.department)}</td>
                <td>
                    <button class="edit"
                    onclick="editStudent(${index})">
                    Edit</button>

                    <button class="delete"
                    onclick="deleteStudent(${index})">
                    Delete</button>
                </td>
            </tr>
        `;
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function saveData() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim()
    };

    if (students.some((s, i) =>
        s.roll.toLowerCase() === student.roll.toLowerCase()
        && i !== editIndex
    )) {
        alert("Roll number already exists!");
        return;
    }

    if (editIndex === -1) {
        students.push(student);
        alert("Student Added Successfully!");
    } else {
        students[editIndex] = student;
        alert("Student Updated Successfully!");
        editIndex = -1;
        document.getElementById("submitBtn").textContent = "Add Student";
    }

    saveData();
    displayStudents();
    form.reset();
});

function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("email").value = student.email;
    document.getElementById("department").value = student.department;

    editIndex = index;
    document.getElementById("submitBtn").textContent = "Update Student";
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete?")) {
        students.splice(index, 1);
        saveData();
        displayStudents();
        alert("Student Deleted Successfully!");
    }
}

search.addEventListener("input", function() {
    const value = search.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(value) ||
        student.roll.toLowerCase().includes(value)
    );

    displayStudents(filtered);
});

displayStudents();
