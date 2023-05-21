document
  .getElementById("pdf-file")
  .addEventListener("change", function (event) {
    alert(event.target.files[0].name);
    var file = event.target.files[0];
    // if (file) {
    //   var reader = new FileReader();
    //   reader.onload = function (e) {
    //     var pdfData = e;
    //     // Handle the PDF data, you can send it to your background script or perform further actions.
    //     alert("PDF data:", pdfData);
    //   };
    //   reader.readAsDataURL(file);
    // }
    let loadingTask = pdfjsLib.getDocument("links.pdf");
    loadingTask.promise.then(function (pdf) {
      // you can now use *pdf* here
      console.log(pdf);
      //   extract all the info from each page
      for (var i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(function (page) {
          page
            .getTextContent()
            .then(function (textContent) {
              return textContent.items;
            })
            .then(function (items) {
              console.log(items);
            });
        });
      }
    });
  });
