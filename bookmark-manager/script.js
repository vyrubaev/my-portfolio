const mainSect=document.getElementById("main-section");
const formSect=document.getElementById("form-section");
const bookmarkSect= document.getElementById("bookmark-list-section");
const catList=document.getElementById("category-list");
const addBookmarkBtn=document.getElementById("add-bookmark-button");
const viewCatBtn=document.getElementById("view-category-button");
const addBookmarkFormBtn=document.getElementById("add-bookmark-button-form");
const closeBtn=document.getElementById("close-form-button");
const deleteBtn=document.getElementById("delete-bookmark-button");
const closeListBtn=document.getElementById("close-list-button");
const select=document.getElementById("category-dropdown");
const categoryName=document.querySelector(".category-name");
const secondCategoryName = document.querySelector("#bookmark-list-section .category-name");

const getBookmarks = () => {
  try {
    const data = localStorage.getItem("bookmarks");
    if (!data) {
      return [];
    }
    const dataParse = JSON.parse(data);
    if (Array.isArray(dataParse) && dataParse.every(item => item.name && item.category && item.url)) {
      return dataParse;
    } else return [];
  }
  catch (error) {
    return [];
  }
};

const displayOrCloseForm = () => {
  formSect.classList.toggle("hidden");
  mainSect.classList.toggle("hidden");
};

const displayOrHideCategory = () => {
  mainSect.classList.toggle("hidden");
  bookmarkSect.classList.toggle("hidden");
};

const renderBookmarks = (category) => {
  catList.innerHTML = "";
  const data=getBookmarks();
  const bookmarksCat = data.filter((item) => item.category===category);
  bookmarksCat.forEach((item) => {
    catList.innerHTML += `
    <input id="${item.name}" type="radio" value="${item.name}" name="radio-btn"><label for="${item.name}"><a href="${item.url}" target="_blank">${item.name}</a></label>`});
};

addBookmarkBtn.addEventListener("click", () => {
  categoryName.innerText = select.selectedOptions[0].textContent;
  displayOrCloseForm();
});

viewCatBtn.addEventListener("click", () => {
  secondCategoryName.innerText = select.selectedOptions[0].textContent;
  const data=getBookmarks();
  const dataCat= data.filter((item) => item.category===select.value);
  if (dataCat.length===0) {
    catList.innerHTML = `<p>No Bookmarks Found</p>`;
  } else renderBookmarks(select.value);
  displayOrHideCategory();
});

deleteBtn.addEventListener("click", () => {
    const nameSelect=document.querySelector(`input[name="radio-btn"]:checked`);
    if (nameSelect) {
      console.log(nameSelect.value);
      const data=getBookmarks();
      const indexForDel = data.findIndex((item) => item.name===nameSelect.value && item.category===select.value);
      if (indexForDel !== -1) {
        data.splice(indexForDel, 1);
        localStorage.setItem("bookmarks", JSON.stringify(data));
        const bookmarksCat = data.filter((item) => item.category===select.value);
        if (bookmarksCat.length===0) {
          catList.innerHTML = `<p>No Bookmarks Found</p>`;
        } else {
          renderBookmarks(select.value);
        }  
      }  
    } else { alert("Need make choice for delete")}
 })

addBookmarkFormBtn.addEventListener("click", () => {
  const obj={
    name: document.getElementById("name").value,
    category: select.value,
    url: document.getElementById("url").value
  };
  if (!obj.name || !obj.url) {
    alert("Input valid data");
    return;
  }
  const data=getBookmarks();
  data.push(obj);
  localStorage.setItem("bookmarks", JSON.stringify(data))
  document.getElementById("name").value = "";
  document.getElementById("url").value = "";
  displayOrCloseForm();
})

closeListBtn.addEventListener("click", () => {
  displayOrHideCategory();
})

closeBtn.addEventListener("click", () => {
  displayOrCloseForm();
});