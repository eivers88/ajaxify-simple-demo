(function(window, jQuery){

        if(!Modernizr.history){
            alert("No HTML5 pushState support!");
        }

        var directory = 'content/'; //directory of the content we want to ajax in
        var state = History.getState();

        //for when they click on an ajax link
        $('.ajaxify').on('click', function(e){
            var $this = $(this);
            var href = $this.attr('href'); // use the href value to determine what content to ajax in
            $.ajax({
                url: directory + href + '.html', // create the necessary path for our ajax request
                dataType: 'html',
                success: function(data) {
                    $('p').css('display', 'block');
                    $('#content').html(data); // place our ajaxed content into our content area
                    History.pushState(null,href, href + '.html'); // change the url and add our ajax request to our history
                }
            });
            e.preventDefault(); // we don't want the anchor tag to perform its native function
        });

        //for when they hit the back button
        $(window).on('statechange', function(){
            state = History.getState(); // find out what we previously ajaxed in
            $.ajax({
                url: directory + state.title + '.html', //create our path
                dataType: 'html',
                success: function(data) {
                    $('#content').html(data);
                }
            });
        });

    /********************************************************************/
    /*******************************NOTE*********************************/
    /********************************************************************/

    // This is just an example to help demonstrate how to ajaxify a website
    // Ideally this would be used in combination with a server side language to reduce the redundant html files at the root level


}(window, $));
