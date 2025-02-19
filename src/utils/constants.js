// export const Background_logo = "https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg"

export const Background_logo="https://assets.nflxext.com/ffe/siteui/vlv3/4690cab8-243a-4552-baef-1fb415632f74/web/IN-en-20241118-TRIFECTA-perspective_0b813abc-8365-4a43-a9d8-14c06e84c9f3_small.jpg"
export const Logo = "https://res.cloudinary.com/dstuhdad3/image/upload/v1701592292/Netflix_Logo_PMS_qcf2nn.png"
export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY
    }
  };

  export const MOVIES_URL = "https://image.tmdb.org/t/p/w500"
  export const SupportedLanguages = [
    {
      identifier:"en",
      name:"English"
    },
    {
      identifier:"hindi",
      name:"Hindi"
    },
    {
      identifier:"telugu",
      name:"Telugu"
    },
    {
      identifier:"tamil",
      name:"Tamil"
    },
    {
      identifier:"kannada",
      name:"Kannada"
    },{
      identifier:"malayalam",
      name:"Malayalam"
    },
    {
      identifier:"french",
      name:"French"
    },
    {
      identifier:"spanish",
      name:"Spanish"
    },
    {
      identifier:"japanese",
      name:"Japanese"
    }

  ] 
  export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY
export const TVSHOWS_URL = "https://api.themoviedb.org/3/tv/{series_id}"
 export const headerTabs = {
      movies: 'movies',
      tvShows: 'tvShows',
      gptSearch: 'gptSearch'
    }

 