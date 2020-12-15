
    var shared_div = function() {
        $("#footer").css("height", "75%");
        $("#menu_options li").css("padding", ".5% 0");
        $("#footer_td").html("");
        var shareddivs = document.querySelectorAll('.shareddivs');
        if ($(window).width() < 550) {
            for (var i = 0; i < shareddivs.length; i++) {
                shareddivs[i].style.display = 'block';
            }
        } else {
            for (var i = 0; i < shareddivs.length; i++) {
                shareddivs[i].style.display = 'table-cell';
            }
        }

        var homedivs = document.querySelectorAll('.homedivs');
        for (var i = 0; i < homedivs.length; i++) {
            homedivs[i].style.display = 'none';
        }
        var aboutdivs = document.querySelectorAll('.aboutdivs');
        for (var i = 0; i < aboutdivs.length; i++) {
            aboutdivs[i].style.display = 'none';
        }
        var archivedivs = document.querySelectorAll('.archivedivs');
        for (var i = 0; i < archivedivs.length; i++) {
            archivedivs[i].style.display = 'none';
        }
    }

    var about_div = function() {
        $("#footer").css("height", "75%");
        $("#menu_options li").css("padding", ".5% 0");
        $("#footer_td").html("");
        var aboutdivs = document.querySelectorAll('.aboutdivs');
        if ($(window).width() < 550) {
            for (var i = 0; i < aboutdivs.length; i++) {
                aboutdivs[i].style.display = 'block';
            }
        } else {
            for (var i = 0; i < aboutdivs.length; i++) {
                aboutdivs[i].style.display = 'table-cell';
            }
        }

        var homedivs = document.querySelectorAll('.homedivs');
        for (var i = 0; i < homedivs.length; i++) {
            homedivs[i].style.display = 'none';
        }
        var shareddivs = document.querySelectorAll('.shareddivs');
        for (var i = 0; i < shareddivs.length; i++) {
            shareddivs[i].style.display = 'none';
        }
        var archivedivs = document.querySelectorAll('.archivedivs');
        for (var i = 0; i < archivedivs.length; i++) {
            archivedivs[i].style.display = 'none';
        }
    }

    var archive_div = function() {
        $("#footer").css("height", "85%");
        $("#menudivs").css("display", "none");
        $("#footer_td").html("");

        var archivedivs = document.querySelectorAll('.archivedivs');
        if ($(window).width() < 550) {
            for (var i = 0; i < archivedivs.length; i++) {
                archivedivs[i].style.display = 'block';
            }
        } else {
            for (var i = 0; i < archivedivs.length; i++) {
                archivedivs[i].style.display = 'table-cell';
            }
        }
        var homedivs = document.querySelectorAll('.homedivs');
        for (var i = 0; i < homedivs.length; i++) {
            homedivs[i].style.display = 'none';
        }
        var aboutdivs = document.querySelectorAll('.aboutdivs');
        for (var i = 0; i < aboutdivs.length; i++) {
            aboutdivs[i].style.display = 'none';
        }
        var shareddivs = document.querySelectorAll('.shareddivs');
        for (var i = 0; i < shareddivs.length; i++) {
            shareddivs[i].style.display = 'none';
        }
    }

    var home_div = function() {
        var homedivs = document.querySelectorAll('.homedivs');
        if ($(window).width() < 550) {
            $("#menudivs").css("display", "block");
            for (var i = 0; i < homedivs.length; i++) {
                homedivs[i].style.display = 'block';
            }
        } else {
            $("#menudivs").css("display", "table-row");
            for (var i = 0; i < homedivs.length; i++) {
                homedivs[i].style.display = 'table-cell';
            }
        }
        var aboutdivs = document.querySelectorAll('.aboutdivs');
        for (var i = 0; i < aboutdivs.length; i++) {
            aboutdivs[i].style.display = 'none';
        }
        var shareddivs = document.querySelectorAll('.shareddivs');
        for (var i = 0; i < shareddivs.length; i++) {
            shareddivs[i].style.display = 'none';
        }
        var archivedivs = document.querySelectorAll('.archivedivs');
        for (var i = 0; i < archivedivs.length; i++) {
            archivedivs[i].style.display = 'none';
        }
    }








    //are.na api
    var urls = ["archive-nslk_pgsefo"];
    var block_content = []
    for(let i=0;i<urls.length; i++) {
        fetch('https://api.are.na/v2/channels/' + urls[i])
            .then(response => {
              if(response.ok) return response.json();
              throw new Error(response.statusText)  // throw an error if there's something wrong with the response
            })
            .then(function handleData(data) {
                // your happy data goes here
                var block = {}
                for(var i=0;i < data.contents.length; i++) {
                    console.log(data.contents)
                    if (data.contents[i].class == "Text") {
                        content = data.contents[i].content_html
                        artist = data.contents[i].connected_by_username
                        description = data.contents[i].description
                        type = "text"
                        title = data.contents[i].generated_title
                        link = "https://www.are.na/block/"+data.contents[i].id
                    }
                    if (data.contents[i].class == "Image") {
                        var img = document.createElement('img'); 
                        img.src = data.contents[i].image.original.url
                        content = img
                        artist = data.contents[i].connected_by_username
                        description = data.contents[i].description
                        type = "img"
                        title = data.contents[i].generated_title
                        link = "https://www.are.na/block/"+data.contents[i].id
                    }
                    block_content.push({type, content, artist, description, title,link})
                }
                console.log(block_content)
            })
            .catch(function handleError(error) {
                // handle errors here
            }) 
    }

    // add blocks to arena_section
    setTimeout(
        function() 
        {
            var ul = document.getElementById("archive_list");
            var col = document.getElementsByClassName("col");
            arena_len = block_content.length

            for(var i=0;i < arena_len; i++) {
                var div = document.createElement("div");
                div.classList.add("archive_block")
                var span = document.createElement("span");
                span.innerHTML = block_content[i].artist
                var a_link = document.createElement("a");
                
                var a = 0
                while(a<(arena_len/2) && i<(arena_len/2)) {
                    if (block_content[i].type == "text" ) {
                        div.classList.add("format_text") 
                        // div.innerHTML = block_content[i].title
                        a_link.innerHTML = block_content[i].title
                        a_link.src = link
                        div.appendChild(a_link);
                        div.appendChild(span);
                    }
                    if (block_content[i].type == "img" ) {
                        div.classList.add("format_img")
                        div.appendChild(block_content[i].content);
                        div.appendChild(span);
                    }
                    col[0].appendChild(div);
                    a++;
                }
                var a = 0
                while(a<=(arena_len/2) && i>=(arena_len/2)) {
                    if (block_content[i].type == "text" ) {
                        div.classList.add("format_text") 
                        // div.innerHTML = block_content[i].title
                        a_link.innerHTML = block_content[i].title
                        a_link.src = link
                        console.log(a_link)
                        div.appendChild(a_link);
                        div.appendChild(span);
                    }
                    if (block_content[i].type == "img" ) {
                        div.classList.add("format_img")
                        div.appendChild(block_content[i].content);
                        div.appendChild(span);
                    }
                    col[1].appendChild(div);
                    a++;
                }

            }
        }, 1000);






