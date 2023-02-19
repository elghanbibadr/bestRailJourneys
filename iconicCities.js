
const slideshow_topics_url = 'https://vs.contentportal.link/items/slideshow_topics';
const slideshow_slides_url = 'https://vs.contentportal.link/items/slideshow_slides/';
const imagesUrl='https://vs.contentportal.link/assets/'
const slideOne = document.querySelector('.slide1');
const slidesContainer=document.querySelector('.slides')


// create a resuable function to fetch data
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


// fetch all the slideShow topic data
const getSlideShowTopic = async () => {
  return await fetchData(slideshow_topics_url)
}


// fetch all the slideShowSlides data
const getSlideShowSlides = async () => {
  return await fetchData(slideshow_slides_url)
}



// lets create the 10 romantic place slide show
const createSlideShow = async () => {
  // grab all the slides show topics
  const { data: slideShowsTopic } = await getSlideShowTopic()
  console.log(slideShowsTopic)
  // get theBEST RAIL JOURNEYS  slideshow data
  const BEST_RAIL_JOURNEYS = slideShowsTopic[1]
  console.log(BEST_RAIL_JOURNEYS )
  //
  const { data: slideShowSlides } = await getSlideShowSlides()
  const { slideshow_slides } = BEST_RAIL_JOURNEYS;

  // filter the list of slidesshow to get only the slides relevent to 10 romantic places data
const slideForTheCurrentSlidShow = slideShowSlides.filter(element => slideshow_slides.includes(element.id))
   slideForTheCurrentSlidShow.forEach((element,index) => { 
    if (index===0) {
        slideOne.style.display='none'
        slideOne.innerHTML=`
        <p >${element.content_text}</p>
      <img  src=${imagesUrl+element.image}>     
       `
       return
    }
    // iterat over the slideShowSlides and map their data to a slider section
    //   const currentSlide=document.getElementById(element.id)
    //   currentSlide.innerHTML=`
    //     <p >${element.content_text}</p>
    //   <img  src=${imagesUrl+element.image}>     
    //    `;
    const addedSlide=document.createElement('section');
    addedSlide.innerHTML=`
         <p >${element.content_text}</p>
       <img  src=${imagesUrl+element.image}>     
        `
        slidesContainer.append(addedSlide)
        addedSlide.classList.add('createdSlide')
        addedSlide.style.display = 'none'
    })

}




createSlideShow()