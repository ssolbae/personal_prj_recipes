function objectifyForm(formArray) {//serialize data function

  returnArray = {};
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}

$(document).ready(function(){
  $("#addForm").submit(function(){
    var data = {"TableName": "RecipesList"};
    data.Item = $('#addForm').serializeArray();
    data.Item = objectifyForm(data.Item);
    $.ajax({
      url: 'https://3r7gikaz7d.execute-api.us-east-1.amazonaws.com/prod/RecipeList?TableName=RecipesList',
      type: 'POST',
      data: JSON.stringify(data),
      success: function(data) {
        alert("POSTed successfully");
          window.location = 'index.html';
        // showRecipe();
      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert("Error");
      }
    });
    return false;
  });

});



// var card = document.createElement("div");
// card.classList.remove("card-face-down");
// card.classList.add("card-face-up");
// card.classList.add("card");
// card.classList.add("col-sm-3");
// card.style.backgroundImage = "url('" + selectedCard + "')";
// card.addEventListener("click", flip);
// gameBox.appendChild(card);
