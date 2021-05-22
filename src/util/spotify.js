const clientId = '3022cf5a900d4b50a4d0f7549ce41730';
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
      const accessUrl =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
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
   
   savePlaylist(playlistName, trackUris){
    if (!playlistName || !trackUris.length) { return; }
    let accessToken = spotify.getAccessToken();
    let headers = { Authorization: `Bearer ${accessToken}`};
    let userId;
    
    return fetch('https://api.spotify.com/v1/me',{ headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
       userId = jsonResponse.id;
       return fetch(`https://api.spotify.com/v1/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({playlistName: playlistName})} 
      ).then(response => response.json()
      ).then ( jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/${userId}/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({Uris: trackUris})
          });
      });
    });
  
}
    
}
export default spotify;