function getTimeString(time) {
  const hour = parseInt(time / 3600);
  const remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  return `${hour} hour ${minute} minute ago`;
}

const removeBtnActiveColor = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const btn of buttons) {
    btn.style.cssText =
      "background-color: #ffffff; color:rgba(17, 17, 17, 0.7);";
  }
};

const loadCategories = () => {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeBtnActiveColor();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.style.cssText = "background-color: #f43f5e; color: white;";
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  // console.log(videoId)
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  // console.log(video);
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <img
  class="w-full object-cover"
  src=${video.thumbnail}
  />
  <p class="mt-4">${video.description}</p>
  `;

  document.getElementById("details_show_modal").showModal();
};
const displayCategories = (data) => {
  const categoryContainer = document.getElementById("category-container");
  data.forEach((item) => {
    // console.log(item);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    
    `;

    categoryContainer.appendChild(buttonContainer);
  });
};

const displayVideos = (data) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (data.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
  <div class="min-h-[300px] w-full flex flex-col justify-center items-center gap-5">
  <img
  src="./public/images/Icon.png"
  />
  <h2 class="text-xl font-bold text-center">No content here in this category</h2>
  </div>
  `;
  } else {
    videoContainer.classList.add("grid");
  }

  data.forEach((item) => {
    // console.log(item);
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
<div>
<button onclick="loadDetails('${
      item.video_id
    }')" class="btn btn-sm bg-rose-500 text-white font-semibold">Details</button>
</div>
   </div>
   </div>
        `;
    videoContainer.appendChild(card);
  });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  // console.log("search text", e.target.value);
  loadVideos(e.target.value);
});
loadCategories();
loadVideos();
