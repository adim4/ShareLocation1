window.addEventListener("DOMContentLoaded", function () {

    document.getElementById("find-me").addEventListener("click", geoFindMe);

    document.getElementById("shareBtn").addEventListener("click", share);

    const iframe = document.getElementById("iframe");

    //const position = "";

    let latitude = "";
    let longitude = "";

    function geoFindMe() {

        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#mapLink');

        mapLink.href = '';
        mapLink.textContent = '';



        iframe.src = "";
        iframe.classList.add("d-none");


        function success(position) {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            status.textContent = '';
            const linkToembed = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
            const linkToShare = `https://maps.google.com/?q=${latitude},${longitude}`;
            //הצגת מפה
            iframe.src = linkToembed;
            iframe.classList.remove("d-none");


            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
            mapLink.href = linkToShare;

        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }


    function share() {
        if (navigator.share) {
            navigator.share({
                title: 'My location',
                url: `https://maps.google.com/?q=${latitude},${longitude}`
            }).then(() => {
                console.log('Thanks for sharing!');
            })
                .catch(console.error);
        } else {
            alert("Not Supported");
        }

    }

});