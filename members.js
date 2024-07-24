function addMember() {
    const name = document.getElementById('member-name').value;
    const role = document.getElementById('member-role').value;

    if (name === '' || role === '') {
        alert('Vui lòng nhập đầy đủ thông tin.');
        return;
    }

    const member = {
        name,
        role
    };

    saveMember(member);
    renderMembers();

    // Clear the input fields
    document.getElementById('member-name').value = '';
    document.getElementById('member-role').value = '';
}

function saveMember(member) {
    let members = JSON.parse(localStorage.getItem('members')) || [];
    members.push(member);
    localStorage.setItem('members', JSON.stringify(members));
}

function renderMembers() {
    const tableBody = document.querySelector('#members-table tbody');
    tableBody.innerHTML = '';

    const members = JSON.parse(localStorage.getItem('members')) || [];

    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.role}</td>
            <td><button onclick="removeMember(${index})">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function removeMember(index) {
    let members = JSON.parse(localStorage.getItem('members')) || [];
    members.splice(index, 1);
    localStorage.setItem('members', JSON.stringify(members));
    renderMembers();
}

// Initial render
renderMembers();
