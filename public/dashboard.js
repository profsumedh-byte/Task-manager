const modal = document.getElementById("taskModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const addtask = document.getElementById("addtask");

addtask.onclick = ()=>{
    modal.style.display = "block";
};

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
};

// Close when clicking outside
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};



