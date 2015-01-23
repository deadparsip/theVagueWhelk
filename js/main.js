$(function () {
    //colours for articles, because my eye holes get bored
    (function whelkColours() {
        var colour = [
            "rgb(92, 186, 255)",
            "rgb(252, 190, 92)",
            "rgb(255, 105, 105)",
            "rgb(152, 255, 132)",
            "rgb(191, 108, 255)",
            "rgb(139, 210, 255)",
            "rgb(254,255, 137)",
            "rgb(108, 255, 132)",
            "rgb(255, 251, 194)",
            "rgb(156, 182, 255)",
            "rgb(180, 179, 225)"];

        var cells = $('.cell'),
            randy = 0;
        if (cells.length) {
            $(cells).each(function (index) {
                randy = Math.floor(Math.random() * 11);
                $(cells[index]).css('background-color', colour[randy]);
            });
        }
    })();



console.log($(window).width());


 


    //facebooks
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=441624989266596";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=226905240831538";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));



    //mobile behaviours - to refactor
    if ($(window).width() < 400 && !window.localStorage.mobileDialog) {

        $(document).on("swiperight", function () {
            stuffs = window.location.href.split('/');
            j = stuffs[stuffs.length - 1];
            switch (j) {
                case 'about.html':
                    window.location.href = "index.html";
                    break;
                case 'poetry.html':
                    window.location.href = "about.html";
                    break;
                case 'stories.html':
                    window.location.href = "poetry.html";
                    break;
                case 'films.html':
                    window.location.href = "stories.html";
                    break;
                case 'pictures.html':
                    window.location.href = "films.html";
                    break;
                default:
                    break;
            }

        });
        $(document).on("swipeleft", function () {
            stuffs = window.location.href.split('/');
            j = stuffs[stuffs.length - 1];
            switch (j) {
                case 'index.html':
                    window.location.href = "about.html";
                    break;
                case 'about.html':
                    window.location.href = "poetry.html";
                    break;
                case 'poetry.html':
                    window.location.href = "stories.html";
                    break;
                case 'stories.html':
                    window.location.href = "films.html";
                    break;
                case 'films.html':
                    window.location.href = "pictures.html";
                    break;

                default:
                    break;
            }
        });
    }


    if (window.location.href.indexOf('poetry.html') < 0 && window.location.hash) {
        h = window.location.hash;
        window.location.href = "poetry.html" + h;
    } else if (window.location.hash) {
        $(window.location.hash).parent('article').addClass('shake');
    }


    //setTimeout(function () {
        //if (window.location.hash) {
           // $(window.location.hash).parent("article").addClass("tada");
        //}
    //}, 400);

});