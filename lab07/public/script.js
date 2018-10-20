'use strict';
$( document ).ready(function() {
  $("button").button();
  $("button").click(
      function (event) {
        event.preventDefault();
        console.log('AJAX request issued...');
        // jQuery/AJAX deferred is similar to JavaScript promises, but we
        // cast it to a standard promise/A+ in this example.
        let jsPromise = Promise.resolve($.ajax({
            url: "/hello",
            //url: "/hell0",
            type: "GET",
            data: {
                name: "Lab07"
            }
        }));
        jsPromise.then(function (result) {
            console.log('AJAX request succeeded...');
            $("<em>", {html: result.message}).appendTo("body");
        }, function (xhr) {
            console.log('AJAX request failed...');
            $("<em>", {html: xhr.statusText}).appendTo("body");
        });
      }
  );
});
