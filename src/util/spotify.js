const redirectUri = 'http://localhost:3000/';
let accessToken;

const spotify = {
  getAccessToken() {
    if(accessToken){
      return accessToken;
    }
    // Get access Token
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
     } else {
      const accessUrl =`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
     } 
  },

  search(term) {  
    const accessToken = spotify.getAccessToken();
     return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
       method: 'GET', 
       headers: {
         Authorization: `Bearer ${accessToken}`
       }
     }).then(response => {
       return response.json();
     }).then(jsonResponse => {
       if(!jsonResponse.tracks) {
         return [];
       }
       return jsonResponse.tracks.items.map(track => 
         {return {
           id: track.id,
           name: track.name,
           artist: track.artists[0].name,
           album: track.album.name,
           uri: track.uri
         };})       
     });

   },
   
    
}
export default spotify;