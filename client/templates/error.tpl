<!doctype html>
<!--[if lt IE 7]>      <html lang="<%= language  %>" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="<%= language  %>" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="<%= language  %>" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="<%= language  %>" class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <base href="/">
    <title><%= _.compact([title, appName]).join('|')  %></title>
    <meta name="description" content="<%= description %>">
    <meta name="viewport" content="width=device-width">

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,400,300' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="styles/app.css">
    <script type="text/javascript" src="/scripts/modernizr.js"></script>
  </head>
  <body>

    <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!--[if lt IE 9]>
      <script src="/bower_components/es5-shim/es5-shim.js"></script>
      <script src="/bower_components/json3/lib/json3.min.js"></script>
    <![endif]-->

    <%= (helpers.topbar ? helpers.topbar(topbar) : '') %>

    <!-- Add your site or application content here -->
    <div class="container row">
      <h1>Error<%- (statusCode ? ': '+ statusCode : '') %></h1>
      <% if (message) { %>
      <div class="error description">
        <p><%= message %></p>
      </div>
      <% } %>
    </div>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
    <% if (googleAnalyticsUA) { %>
    <script>
       (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

       ga('create', 'UA-XXXXX-X');
       ga('send', 'pageview');
    </script>
    <% } %>

    
    <script data-main="/scripts/app.js" src="/scripts/require.js"></script>

    <% /*
    <script data-main="/scripts/app.js" src="/bower_components/requirejs/require.js"></script>

    <script src="/bower_components/requirejs/require.js"></script>
    <script>
    require(['/scripts/app.js'], function(App) {});
    </script>

    <script src="/scripts/build.js"></script>
    */ %>
  </body>
</html>
