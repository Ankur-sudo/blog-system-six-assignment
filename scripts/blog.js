// tooltip
document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    const tooltipText = item.getAttribute('data-tooltip');

    // Create tooltip element
    const tooltipDiv = document.createElement('div');
    tooltipDiv.textContent = tooltipText;
    tooltipDiv.classList.add('tooltip');
    item.appendChild(tooltipDiv);

    // Set up event listeners
    item.addEventListener('mouseenter', function () {
      tooltipDiv.style.visibility = 'visible';
    });

    item.addEventListener('mouseleave', function () {
      tooltipDiv.style.visibility = 'hidden';
    });
  });
});

// discussion post --> all post api fetch


document.addEventListener('DOMContentLoaded', async function () {
  const postsContainer = document.getElementById('posts-container');


    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();

    // Check if data has 'posts' property and it is an array
    if (data.hasOwnProperty('posts') && Array.isArray(data.posts)) {
      // Iterate over each post
      data.posts.forEach(post => {

        // Determine the status image based on isActive property
        const statusImageSrc = post.isActive ? 'icons/Status (2).png' : 'icons/red-offline.png';
        // Extract the desired section from the post
        const desiredSection = `
            <div class="my-8 md:my-8 w-full md:w-[772px] h-[270px] border rounded-3xl bg-[#797DFC0D] flex gap-4 md:p-12">
              <div class="flex">
                <div class="relative">
                  <img src="icons/profile.png" alt="">
                </div>
                <div class="absolute md:ml-14">
                  <img src="${statusImageSrc}" alt="">
                </div>
              </div>
              <div class="">
                <div class="flex gap-4 mb-4 text-[#12132DCC] text-sm font-medium">
                  <div>
                    <h2># ${post.category}</h2>
                  </div>
                  <div>
                    <p>Author: ${post.author.name}</p>
                  </div>
                </div>
                <div>
                  <h2 class="text-[#12132D]  font-bold text-sm md:text-xl">${post.title}</h2>
                </div>
                <div class="my-4 text-[#12132D99] font-normal text-[16px]">
                  <p>${post.description}</p>
                </div>
                <div><img class="w-0 md:w-[700px]" src="images/Line 1.png" alt=""></div>
                <div class="flex gap-4 my-4">
                  <div><img src="icons/message.png" alt=""></div>
                  <div>
                    <p>${post.comment_count}</p>
                  </div>
                  <div><img src="icons/eye.png" alt=""></div>
                  <div>
                    <p>${post.view_count}</p>
                  </div>
                  <div><img src="icons/clock.png" alt=""></div>
                  <div>
                    <p>${post.posted_time}</p>
                  </div>
                  <div class="ml-52"><a href="" class="mail-icon"><img src="icons/mail.png" alt=""></a></div>
                </div>
              </div>
            </div>
          `;

        // Create elements for the desired section
        const sectionElement = document.createElement('div');
        sectionElement.innerHTML = desiredSection;

        // Append the section element to the container
        postsContainer.appendChild(sectionElement);

        // Add click event listener to the mail icon
        const mailIcon = sectionElement.querySelector('.mail-icon');
        mailIcon.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent the default action of the link
          // Create and append the new section
          const newSection = `
            <div class="w-[374px] mt-8 h-[465px] border rounded-3xl bg-[#797DFC0D] additional-section">
              <div class="flex justify-between p-4">
                <div>
                  <h2 class="font-bold text-xl text-[#12132D]">Title</h2>
                </div>
                <div class="text-[16px] text-[#12132D99] font-normal">Mark as read(<span>4</span>)</div>
              </div>
              <div class="w-[326px] p-2 h-[82px] ml-5 mt-4 border bg-[#FFFFFF] rounded-2xl">
                <div class="flex gap-12 ">
                  <div class="font-semibold text-[16px] text-[#12132D]">
                    10 Kids Unaware of Their <br> Halloween Costume
                  </div>
                  <div class="flex mt-6 ">
                    <div><img src="icons/eye.png" alt=""> </div>
                    <div><span>1,568</span></div>
                  </div>
                </div>
              </div>
            </div>
          `;
          postsContainer.appendChild(sectionElement);
        });
      });
    } else {
      console.error('Data Not expected structure:', data);
    }

});


// latest post

const loadLatestPost = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await res.json();
  const latestPost = data;
  // console.log(latestPost);
  displayLatestPost(latestPost);
}

const displayLatestPost = latestPost => {
  // console.log(latestPost);

  const newPostContainer = document.getElementById('newpost-container');

  latestPost.forEach(newPost => {
    console.log(newPost);
    //1. create a div
    const newPostCard = document.createElement('div');
    newPostCard.classList = `border mt-3 lg:w-full auto p-12 rounded-3xl`;
    newPostCard.innerHTML = `
    <div><img src="${newPost.cover_image}" alt=""></div>
                    <div class="flex gap-4 my-4">
                        <div><img src="images/bag.png" alt=""></div>
                        <div>
                            <h2>${newPost.author.posted_date ? newPost.author.posted_date : '1 Hour Ago'}</h2>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold mb-4">${newPost.title}</h2>
                    </div>
                    <div>
                        <p>${newPost.description}</p>
                    </div>
                    <div class="flex gap-4 mt-4">
                        <div><img class="rounded-full size-10" src="${newPost.profile_image}" alt=""></div>
                        <div>
                            <div>
                                <h2 class="text-xl font-bold">${newPost.author.name}</h2>
                            </div>
                            <div>
                                <h2>${newPost.author.designation ? newPost.author.designation : 'Unknown'}</h2>
                            </div>
                        </div>
                    </div>
    `;

    // append child
    newPostContainer.appendChild(newPostCard);

  })
}


loadLatestPost();











