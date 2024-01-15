import React from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ( {videoId,width,height} ) => {

    let setwidth = width;
    let setheight = height;

    if(width<=500){
        setwidth=width;
    }
    else{
        setwidth=600;
    }

    if(!(height<=400)){
        setheight=400;
    }

    const opts = {
        height: `${setheight-15}`,
        width: `${setwidth-15}`,
        playerVars: {
        // autoplay: 1,
        // mute:1
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubeVideo;
