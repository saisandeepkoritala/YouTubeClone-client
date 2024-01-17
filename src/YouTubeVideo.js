import React from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ( {videoId,width,height} ) => {

    let setwidth = width;
    let setheight = height;

    if(width<=700){
        setwidth=width-10;
    }
    else{
        setwidth=600;
    }

    if(height<=500){
        setheight=height-100;
    }
    else{
        setheight = 300;
    }

    const opts = {
        height: `${setheight-15}`,
        width: `${setwidth-15}`,
        playerVars: {
        // autoplay: 1,
        // mute:1
        },
    };

    return <YouTube videoId={videoId} opts={opts} className='video'/>;
};

export default YouTubeVideo;
