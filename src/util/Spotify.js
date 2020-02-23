
let userAccessToken ='';
let expiresIn = null;
let url = window.location.href;
const clientId = '3022cf5a900d4b50a4d0f7549ce41730';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  
    getAccessToken() {
      if(userAccessToken){
        return userAccessToken;
      } else if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
  
          const urlParams = new URLSearchParams(url);
          userAccessToken = urlParams.get('access_token');
          expiresIn = urlParams.get('expires_in');

          window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
        
      } else {
        window.location.assign('https://accounts.spotify.com/authorize?client_id='+clientId+'&response_type=token&scope=playlist-modify-public&redirect_uri='+redirectURI)
      }
    },
      search(term){
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{ 
          headers: {
          Authorization: `Bearer ${userAccessToken}`
        }
      }).then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.track){
          return jsonResponse.track.map( track => {
            return {
              ID: track.id,
              Name: track.name,
              Artist: track.artists[0].name,
              Album: track.album.name,
              URI: track.uri

            }
          })
        }
      })
      },
      savePlaylist(name,uri){
        if (!(name && uri)) {
          return;
        }
        let access_token = userAccessToken;
        let headers = { Authorization: 'Bearer' + access_token};
        let userId = '';
        
        fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(responseJson => { return userId = responseJson.id});
        
      }

              };


export default Spotify;