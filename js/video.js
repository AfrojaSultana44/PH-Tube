function getTimeString(time) {
  const hour = parseInt(time / 3600);
  const remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  return `${hour} hour ${minute} minute ago`;
}

const loadCategories = () => {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
};

const displayCategories = (data) => {
  const categoryContainer = document.getElementById("category-container");
  data.forEach((item) => {
    // console.log(item);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="loadCategoryVideos(${item.category_id})" class="btn">
    ${item.category}
    </button>
    
    `;

    categoryContainer.appendChild(buttonContainer);
  });
};

const displayVideos = (data) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  data.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
 <figure class="h-[200px] relative">
    <img
    class="h-full w-full object-cover"
      src= ${item.thumbnail}
      alt="Shoes" />
      ${
        item.others.posted_date?.length == 0
          ? ""
          : `
      <span class="absolute right-2 bottom-2 text-white text-xs bg-black p-1">${getTimeString(
        item.others.posted_date
      )}</span>
        
        `
      }
  </figure>
  <div class="px-0 py-2 flex gap-2 items-center">
   <div>
   <img
   class="w-10 h-10 rounded-full object-cover"
   src=${item.authors[0].profile_picture}
   />
   </div>
<div>  
   <h2 class="font-bold">${item.title}</h2>
   <div class="flex items-center gap-2">
   <p class="text-gray-400">${item.authors[0].profile_name}</p>
   ${
     item.authors[0].verified == true
       ? `<img
   class="w-5"
   src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"
   />`
       : ""
   }
   </div>
   <p></p>
   </div>
   </div>
        `;
    videoContainer.appendChild(card);
  });
};

loadCategories();
loadVideos();
